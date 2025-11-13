// src/app/api/admin/artigos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar todos os artigos com tags
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status ? { status } : {};

    const artigos = await prisma.artigo.findMany({
      where,
      include: {
        ArtigoTag: {
          include: {
            Tag: true
          }
        }
      },
      orderBy: {
        criadoEm: 'desc'
      }
    });

    // Formatar resposta para incluir apenas os nomes das tags
    const artigosFormatados = artigos.map(artigo => ({
      ...artigo,
      tags: artigo.ArtigoTag.map(at => at.Tag.nome),
      createdAt: artigo.criadoEm // Compatibilidade com o frontend
    }));

    return NextResponse.json(artigosFormatados);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar artigos' },
      { status: 500 }
    );
  }
}

// POST - Criar novo artigo com tags
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      titulo, 
      slug, 
      conteudo, 
      resumo, 
      imagemHeader, 
      status, 
      dataPublicacao,
      tagIds,
      themeDark 
    } = body;

    // Verifica se o slug já existe
    const slugExiste = await prisma.artigo.findUnique({
      where: { slug }
    });

    if (slugExiste) {
      return NextResponse.json(
        { error: 'Este slug já está sendo usado' },
        { status: 409 }
      );
    }

    // Cria o artigo com tags em uma transação
    const novoArtigo = await prisma.$transaction(async (tx) => {
      // Cria o artigo
      const artigo = await tx.artigo.create({
        data: {
          titulo,
          slug,
          conteudo,
          resumo,
          imagemHeader,
          status: status || 'rascunho',
          dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : null,
          themeDark: themeDark || false 
        }
      });

      // Adiciona as tags se fornecidas
      if (Array.isArray(tagIds) && tagIds.length > 0) {
        await tx.artigoTag.createMany({
          data: tagIds.map((tagId: number) => ({
            artigoId: artigo.id,
            tagId: tagId
          }))
        });
      }

      // Busca o artigo criado com tags
      return await tx.artigo.findUnique({
        where: { id: artigo.id },
        include: {
          ArtigoTag: {
            include: {
              Tag: true
            }
          }
        }
      });
    });

    // Formatar resposta
    const resultado = {
      ...novoArtigo,
      tags: novoArtigo?.ArtigoTag.map(at => at.Tag.nome) || []
    };

    return NextResponse.json(resultado, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar artigo' },
      { status: 500 }
    );
  }
}