// Rota: /api/admin/categorias-artigos/[id]
// CRUD para categorias individuais

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/categorias-artigos/[id]
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
      where: { id_categoria }
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
 * PATCH /api/admin/categorias-artigos/[id]
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

    const body = await request.json();
    const { nome, descricao } = body;

    const updateData: any = {};

    // Validar e processar nome
    if (nome !== undefined) {
      if (typeof nome !== 'string') {
        return NextResponse.json(
          { error: 'Nome inválido' },
          { status: 400 }
        );
      }

      const nomeTrimmed = nome.trim();
      if (nomeTrimmed.length < 2) {
        return NextResponse.json(
          { error: 'Nome deve ter pelo menos 2 caracteres' },
          { status: 400 }
        );
      }

      if (nomeTrimmed.length > 100) {
        return NextResponse.json(
          { error: 'Nome não pode ter mais de 100 caracteres' },
          { status: 400 }
        );
      }

      // Verificar se já existe outra categoria com mesmo nome
      const duplicada = await prisma.categoria.findFirst({
        where: {
          nome: nomeTrimmed,
          NOT: { id_categoria }
        }
      });

      if (duplicada) {
        return NextResponse.json(
          { error: 'Já existe uma categoria com este nome' },
          { status: 409 }
        );
      }

      updateData.nome = nomeTrimmed;
    }

    // Processar descrição
    if (descricao !== undefined) {
      updateData.descricao = descricao?.trim() || null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Nenhum campo válido fornecido para atualização' },
        { status: 400 }
      );
    }

    // Atualizar categoria
    const categoriaAtualizada = await prisma.categoria.update({
      where: { id_categoria },
      data: updateData,
    });

    return NextResponse.json({
      message: 'Categoria atualizada com sucesso',
      categoria: categoriaAtualizada,
    });
  } catch (error: any) {
    console.error('Erro ao atualizar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar categoria' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/categorias-artigos/[id]
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
        { status: 409 }
      );
    }

    // Verificar se existem artigos usando esta categoria
    const artigosComCategoria = await prisma.artigo.count({
      where: { id_categoria },
    });

    if (artigosComCategoria > 0) {
      return NextResponse.json(
        {
          error: `Não é possível deletar esta categoria. Existem ${artigosComCategoria} artigo(s) usando esta categoria.`,
        },
        { status: 409 }
      );
    }

    // Deletar categoria
    await prisma.categoria.delete({
      where: { id_categoria },
    });

    return NextResponse.json({
      message: 'Categoria deletada com sucesso'
    });
  } catch (error: any) {
    console.error('Erro ao deletar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar categoria' },
      { status: 500 }
    );
  }
}