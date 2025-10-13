// src/app/api/admin/artigos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Buscar artigo específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const artigo = await prisma.artigo.findUnique({
      where: { id: parseInt(id) }
    });

    if (!artigo) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(artigo);
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigo' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar artigo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { titulo, slug, conteudo } = body;

    // Verifica se o artigo existe
    const artigoExiste = await prisma.artigo.findUnique({
      where: { id: parseInt(id) }
    });

    if (!artigoExiste) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Verifica se o slug já está em uso por outro artigo
    if (slug !== artigoExiste.slug) {
      const slugEmUso = await prisma.artigo.findUnique({
        where: { slug }
      });

      if (slugEmUso) {
        return NextResponse.json(
          { error: 'Este slug já está sendo usado por outro artigo' },
          { status: 409 }
        );
      }
    }

    // Atualiza o artigo
    const artigoAtualizado = await prisma.artigo.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        slug,
        conteudo,
      }
    });

    return NextResponse.json(artigoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar artigo' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir artigo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.artigo.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Artigo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir artigo' },
      { status: 500 }
    );
  }
}