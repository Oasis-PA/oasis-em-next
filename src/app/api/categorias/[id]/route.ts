// Rota: /api/categorias/[id]
// CRUD para categorias (requer autenticação admin)

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { categoriaUpdateSchema } from '@/lib/validations/categoria';

/**
 * GET /api/categorias/[id]
 * Buscar uma categoria específica
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_categoria = parseInt(id);

    if (isNaN(id_categoria)) {
      return NextResponse.json(
        { error: 'ID de categoria inválido' },
        { status: 400 }
      );
    }

    const categoria = await prisma.categoria.findUnique({
      where: { id_categoria },
    });

    if (!categoria) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(categoria);
  } catch (error: any) {
    console.error('Erro ao buscar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar categoria' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/categorias/[id]
 * Atualizar uma categoria (requer autenticação admin)
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_categoria = parseInt(id);

    if (isNaN(id_categoria)) {
      return NextResponse.json(
        { error: 'ID de categoria inválido' },
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

    // Verificar se categoria existe
    const categoriaExistente = await prisma.categoria.findUnique({
      where: { id_categoria },
    });

    if (!categoriaExistente) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    // Processar dados de atualização
    const body = await request.json();

    // Validar dados (opcional, se tiver schema Zod)
    // const validacao = categoriaUpdateSchema.safeParse(body);
    // if (!validacao.success) {
    //   return NextResponse.json(
    //     { error: 'Dados inválidos', details: validacao.error },
    //     { status: 400 }
    //   );
    // }

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
          { error: 'Nome da categoria não pode ser vazio' },
          { status: 400 }
        );
      }
      if (nome.length < 3) {
        return NextResponse.json(
          { error: 'Nome deve ter pelo menos 3 caracteres' },
          { status: 400 }
        );
      }
      if (nome.length > 100) {
        return NextResponse.json(
          { error: 'Nome não pode ter mais de 100 caracteres' },
          { status: 400 }
        );
      }
      updateData.nome = nome;
    }

    // Atualizar categoria
    const categoriaAtualizada = await prisma.categoria.update({
      where: { id_categoria },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: 'Categoria atualizada com sucesso',
        categoria: categoriaAtualizada,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao atualizar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar categoria' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/categorias/[id]
 * Deletar uma categoria (requer autenticação admin)
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_categoria = parseInt(id);

    if (isNaN(id_categoria)) {
      return NextResponse.json(
        { error: 'ID de categoria inválido' },
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

    // Verificar se categoria existe
    const categoriaExistente = await prisma.categoria.findUnique({
      where: { id_categoria },
    });

    if (!categoriaExistente) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se existem produtos usando esta categoria
    const produtosComCategoria = await prisma.produto.count({
      where: { id_categoria },
    });

    if (produtosComCategoria > 0) {
      return NextResponse.json(
        {
          error: `Não é possível deletar esta categoria. Existem ${produtosComCategoria} produto(s) usando esta categoria.`,
        },
        { status: 409 } // Conflict
      );
    }

    // Deletar categoria
    await prisma.categoria.delete({
      where: { id_categoria },
    });

    return NextResponse.json(
      { message: 'Categoria deletada com sucesso' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao deletar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar categoria' },
      { status: 500 }
    );
  }
}
