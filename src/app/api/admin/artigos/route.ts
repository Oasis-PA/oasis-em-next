// src/app/api/admin/artigos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar artigos
export async function GET() {
  try {
    const artigos = await prisma.artigo.findMany({
      orderBy: {
        criadoEm: 'desc'
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
    const { titulo, slug, conteudo } = body;

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

    // Cria o artigo
    const novoArtigo = await prisma.artigo.create({
      data: {
        titulo,
        slug,
        conteudo,
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