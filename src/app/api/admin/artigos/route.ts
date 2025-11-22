// Rota: /api/admin/artigos
// CRUD para artigos com suporte a categorias

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/artigos
 * Listar todos os artigos
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'todos') {
      where.status = status;
    }

    // buscar artigos (removido include.categoria que não existe no client)
    const artigos = await prisma.artigo.findMany({
      where,
      orderBy: { criadoEm: 'desc' },
      select: {
        id: true,
        titulo: true,
        slug: true,
        status: true,
        dataPublicacao: true,
        criadoEm: true,
        id_categoria: true
      }
    });

    // buscar categorias em lote para anexar (evita N+1)
    const categoriaIds = Array.from(new Set(artigos.map(a => a.id_categoria).filter(Boolean) as number[]));
    let categoriasMap: Record<number, { id_categoria: number; nome: string; slug?: string }> = {};
    if (categoriaIds.length) {
      const categorias = await prisma.categoriaArtigo.findMany({
        where: { id_categoria: { in: categoriaIds } },
        select: { id_categoria: true, nome: true, slug: true }
      });
      categoriasMap = Object.fromEntries(categorias.map(c => [c.id_categoria, c]));
    }

    const artigosFormatados = artigos.map(artigo => ({
      id: artigo.id,
      titulo: artigo.titulo,
      slug: artigo.slug,
      status: artigo.status,
      dataPublicacao: artigo.dataPublicacao,
      categoria: artigo.id_categoria ? categoriasMap[artigo.id_categoria] ?? null : null,
      createdAt: artigo.criadoEm
    }));

    return NextResponse.json(artigosFormatados);
  } catch (error: any) {
    console.error('Erro ao buscar artigos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigos' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/artigos
 * Criar novo artigo (requer autenticação admin)
 */
export async function POST(request: NextRequest) {
  try {
    // Validar autenticação admin
    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Token de admin necessário.' },
        { status: 401 }
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

    // Validações básicas
    if (!titulo || !slug || !conteudo) {
      return NextResponse.json(
        { error: 'Título, slug e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se slug já existe
    const slugExistente = await prisma.artigo.findUnique({
      where: { slug }
    });

    if (slugExistente) {
      return NextResponse.json(
        { error: 'Já existe um artigo com este slug' },
        { status: 409 }
      );
    }

    // Verificar se categoria existe (se fornecida)
    let categoriaObj = null;
    if (id_categoria) {
      const parsedId = parseInt(id_categoria as any, 10);
      const categoriaExiste = await prisma.categoriaArtigo.findUnique({
        where: { id_categoria: parsedId }
      });

      if (!categoriaExiste) {
        return NextResponse.json(
          { error: 'Categoria não encontrada' },
          { status: 400 }
        );
      }
      categoriaObj = categoriaExiste;
    }

    // Criar artigo (sem include.categoria)
    const novoArtigo = await prisma.artigo.create({
      data: {
        titulo,
        slug,
        conteudo,
        resumo: resumo || null,
        imagemHeader: imagemHeader || null,
        status: status || 'rascunho',
        dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : null,
        id_categoria: id_categoria ? parseInt(id_categoria as any, 10) : null,
        themeDark: themeDark || false
      }
    });

    // anexar info de categoria ao retorno se existir
    const artigoRetorno = {
      ...novoArtigo,
      categoria: categoriaObj ? { id_categoria: categoriaObj.id_categoria, nome: categoriaObj.nome } : null
    };

    return NextResponse.json(
      {
        message: 'Artigo criado com sucesso',
        artigo: artigoRetorno
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao criar artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao criar artigo' },
      { status: 500 }
    );
  }
}