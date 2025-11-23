// Rota: /api/tags/[id]
// CRUD para tags (com autenticação admin e usando tabela pivô)

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
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar tag' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/tags/[id]
 * Atualizar uma tag (autenticação admin preservada)
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

    // Autenticação admin (mantida exatamente como antes)
    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Token de admin necessário.' },
        { status: 401 }
      );
    }

    const tagExistente = await prisma.tag.findUnique({
      where: { id_tag },
    });

    if (!tagExistente) {
      return NextResponse.json(
        { error: 'Tag não encontrada' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const allowedFields = ['nome'];
    const updateData: any = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (updateData.nome) {
      const nome = updateData.nome.trim();

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
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar tag' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tags/[id]
 * Deletar tag (autenticação + pivot mantidos)
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
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 401 }
      );
    }

    const tagExistente = await prisma.tag.findUnique({
      where: { id_tag }
    });

    if (!tagExistente) {
      return NextResponse.json(
        { error: 'Tag não encontrada' },
        { status: 404 }
      );
    }

    const produtosComTag = await prisma.produtoTag.count({
      where: { id_tag }
    });

    if (produtosComTag > 0) {
      return NextResponse.json(
        {
          error: `Não é possível deletar. Esta tag está sendo usada por ${produtosComTag} produto(s).`
        },
        { status: 409 }
      );
    }

    await prisma.tag.delete({
      where: { id_tag }
    });

    return NextResponse.json(
      { message: 'Tag deletada com sucesso' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar tag' },
      { status: 500 }
    );
  }
}

