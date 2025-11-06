// Rota: /api/tags/[id]
// CRUD para tags (requer autenticação admin)

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/tags/[id]
 * Buscar uma tag específica
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_tag = parseInt(id);

    if (isNaN(id_tag)) {
      return NextResponse.json(
        { error: 'ID de tag inválido' },
        { status: 400 }
      );
    }

    const tag = await prisma.tag.findUnique({
      where: { id_tag },
    });

    if (!tag) {
      return NextResponse.json(
        { error: 'Tag não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(tag);
  } catch (error: any) {
    console.error('Erro ao buscar tag:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar tag' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/tags/[id]
 * Atualizar uma tag (requer autenticação admin)
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_tag = parseInt(id);

    if (isNaN(id_tag)) {
      return NextResponse.json(
        { error: 'ID de tag inválido' },
        { status: 400 }
      );
    }

    // Validar autenticação admin
    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Token de admin necessário.' },
        { status: 401 }
      );
    }

    // Verificar se tag existe
    const tagExistente = await prisma.tag.findUnique({
      where: { id_tag },
    });

    if (!tagExistente) {
      return NextResponse.json(
        { error: 'Tag não encontrada' },
        { status: 404 }
      );
    }

    // Processar dados de atualização
    const body = await request.json();

    // Campos permitidos para atualização
    const allowedFields = ['nome'];

    // Filtrar apenas campos permitidos
    const updateData: any = {};
    for (const field of allowedFields) {
      if (field in body && body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Nenhum campo válido fornecido para atualização' },
        { status: 400 }
      );
    }

    // Validar nome não vazio
    if (updateData.nome && typeof updateData.nome === 'string') {
      const nome = updateData.nome.trim();
      if (nome.length === 0) {
        return NextResponse.json(
          { error: 'Nome da tag não pode ser vazio' },
          { status: 400 }
        );
      }
      if (nome.length < 2) {
        return NextResponse.json(
          { error: 'Nome deve ter pelo menos 2 caracteres' },
          { status: 400 }
        );
      }
      if (nome.length > 50) {
        return NextResponse.json(
          { error: 'Nome não pode ter mais de 50 caracteres' },
          { status: 400 }
        );
      }
      updateData.nome = nome;
    }

    // Atualizar tag
    const tagAtualizada = await prisma.tag.update({
      where: { id_tag },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: 'Tag atualizada com sucesso',
        tag: tagAtualizada,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao atualizar tag:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar tag' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tags/[id]
 * Deletar uma tag (requer autenticação admin)
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_tag = parseInt(id);

    if (isNaN(id_tag)) {
      return NextResponse.json(
        { error: 'ID de tag inválido' },
        { status: 400 }
      );
    }

    // Validar autenticação admin
    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Token de admin necessário.' },
        { status: 401 }
      );
    }

    // Verificar se tag existe
    const tagExistente = await prisma.tag.findUnique({
      where: { id_tag },
    });

    if (!tagExistente) {
      return NextResponse.json(
        { error: 'Tag não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se existem produtos usando esta tag
    const produtosComTag = await prisma.produto.count({
      where: { id_tag },
    });

    if (produtosComTag > 0) {
      return NextResponse.json(
        {
          error: `Não é possível deletar esta tag. Existem ${produtosComTag} produto(s) usando esta tag.`,
        },
        { status: 409 } // Conflict
      );
    }

    // Deletar tag
    await prisma.tag.delete({
      where: { id_tag },
    });

    return NextResponse.json(
      { message: 'Tag deletada com sucesso' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao deletar tag:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar tag' },
      { status: 500 }
    );
  }
}
