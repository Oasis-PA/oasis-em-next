// Rota: /api/admin/artigos/[id]
// CRUD para artigos individuais com suporte a categorias

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/artigos/[id]
 * Buscar um artigo específico
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const artigoId = parseInt(id);

    if (isNaN(artigoId)) {
      return NextResponse.json(
        { error: 'ID de artigo inválido' },
        { status: 400 }
      );
    }

    const artigo = await prisma.artigo.findUnique({
      where: { id: artigoId },
      // removido include.categoria (não existe no client)
    });

    if (!artigo) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // buscar categoria separadamente se houver id_categoria
    let categoria = null;
    if (artigo.id_categoria) {
      categoria = await prisma.categoriaArtigo.findUnique({
        where: { id_categoria: artigo.id_categoria },
        select: { id_categoria: true, nome: true }
      });
    }

    return NextResponse.json({ ...artigo, categoria });
  } catch (error: any) {
    console.error('Erro ao buscar artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigo' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/artigos/[id]
 * Atualizar um artigo (requer autenticação admin)
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const artigoId = parseInt(id);

    if (isNaN(artigoId)) {
      return NextResponse.json(
        { error: 'ID de artigo inválido' },
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

    // Verificar se artigo existe
    const artigoExistente = await prisma.artigo.findUnique({
      where: { id: artigoId }
    });

    if (!artigoExistente) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      titulo,
      slug,
      conteudo,
      resumo,
      imagemHeader,
      status,
      dataPublicacao,
      id_categoria,
      themeDark
    } = body;

    // Verificar se slug já existe em outro artigo
    if (slug && slug !== artigoExistente.slug) {
      const slugExistente = await prisma.artigo.findFirst({
        where: {
          slug,
          NOT: { id: artigoId }
        }
      });

      if (slugExistente) {
        return NextResponse.json(
          { error: 'Já existe outro artigo com este slug' },
          { status: 409 }
        );
      }
    }

    // Verificar se categoria existe (se fornecida)
    if (id_categoria) {
      const categoriaExiste = await prisma.categoria.findUnique({
        where: { id_categoria: parseInt(id_categoria) }
      });

      if (!categoriaExiste) {
        return NextResponse.json(
          { error: 'Categoria não encontrada' },
          { status: 400 }
        );
      }
    }

    // Atualizar artigo
    const artigoAtualizado = await prisma.artigo.update({
      where: { id: artigoId },
      data: {
        titulo: titulo || artigoExistente.titulo,
        slug: slug || artigoExistente.slug,
        conteudo: conteudo || artigoExistente.conteudo,
        resumo: resumo !== undefined ? resumo : artigoExistente.resumo,
        imagemHeader: imagemHeader !== undefined ? imagemHeader : artigoExistente.imagemHeader,
        status: status || artigoExistente.status,
        dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : null,
        id_categoria: id_categoria !== undefined ? (id_categoria ? parseInt(id_categoria as any, 10) : null) : artigoExistente.id_categoria,
        themeDark: themeDark !== undefined ? themeDark : artigoExistente.themeDark
      }
    });

    // buscar categoria separadamente e anexar ao retorno
    let categoriaAtualizada = null;
    if (artigoAtualizado.id_categoria) {
      categoriaAtualizada = await prisma.categoriaArtigo.findUnique({
        where: { id_categoria: artigoAtualizado.id_categoria },
        select: { id_categoria: true, nome: true }
      });
    }

    return NextResponse.json({
      message: 'Artigo atualizado com sucesso',
      artigo: { ...artigoAtualizado, categoria: categoriaAtualizada }
    });
  } catch (error: any) {
    console.error('Erro ao atualizar artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar artigo' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/artigos/[id]
 * Deletar um artigo (requer autenticação admin)
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const artigoId = parseInt(id);

    if (isNaN(artigoId)) {
      return NextResponse.json(
        { error: 'ID de artigo inválido' },
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

    // Verificar se artigo existe
    const artigoExistente = await prisma.artigo.findUnique({
      where: { id: artigoId }
    });

    if (!artigoExistente) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Deletar artigo
    await prisma.artigo.delete({
      where: { id: artigoId }
    });

    return NextResponse.json({
      message: 'Artigo deletado com sucesso'
    });
  } catch (error: any) {
    console.error('Erro ao deletar artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar artigo' },
      { status: 500 }
    );
  }
}