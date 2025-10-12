// src/app/api/admin/artigos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar artigos (com filtro opcional por status)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'todos') {
      where.status = status;
    }

    const artigos = await prisma.artigo.findMany({
      where,
      select: {
        id: true,
        titulo: true,
        slug: true,
        status: true,
        dataPublicacao: true,
        tags: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(artigos);
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigos' },
      { status: 500 }
    );
  }
}

// POST - Criar novo artigo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      titulo, 
      slug, 
      conteudo, 
      resumo,
      status,
      dataPublicacao,
      tags 
    } = body;

    // Validações
    if (!titulo || !slug || !conteudo) {
      return NextResponse.json(
        { error: 'Título, slug e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    // Verifica se o slug já existe
    const slugExiste = await prisma.artigo.findUnique({
      where: { slug }
    });

    if (slugExiste) {
      return NextResponse.json(
        { error: 'Já existe um artigo com este slug' },
        { status: 409 }
      );
    }

    // Se agendado, valida data
    if (status === 'agendado' && !dataPublicacao) {
      return NextResponse.json(
        { error: 'Data de publicação é obrigatória para artigos agendados' },
        { status: 400 }
      );
    }

    // Cria o artigo
    const novoArtigo = await prisma.artigo.create({
      data: {
        titulo,
        slug,
        conteudo,
        resumo: resumo || null,
        status: status || 'rascunho',
        dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : null,
        tags: tags || [],
      }
    });

    return NextResponse.json(novoArtigo, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao criar artigo' },
      { status: 500 }
    );
  }
}