// src/app/api/admin/artigos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { protectAdminRoute } from "@/lib/verify-admin-token";

// GET - Buscar artigo específico com tags
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Verifica autenticação admin
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    // Se id for só dígitos, trata como number; caso contrário, trata como slug/string
    const isNumeric = /^\d+$/.test(id);
    const artigo = isNumeric
      ? await prisma.artigo.findUnique({
          where: { id: Number(id) },
          include: {
            ArtigoTag: {
              include: {
                Tag: true
              }
            }
          }
        })
      : await prisma.artigo.findUnique({
          where: { slug: id },
          include: {
            ArtigoTag: {
              include: {
                Tag: true
              }
            }
          }
        });

    if (!artigo) {
      return NextResponse.json({ message: "Artigo não encontrado" }, { status: 404 });
    }

    // Formatar resposta com tags
    const resultado = {
      ...artigo,
      tags: artigo.ArtigoTag.map(at => at.Tag.nome)
    };

    return NextResponse.json(resultado);
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// PUT - Atualizar artigo com tags
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verifica autenticação admin
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;
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
      themeDark  // ← ADICIONADO
    } = body;

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

    // Atualiza o artigo e suas tags em uma transação
    const artigoAtualizado = await prisma.$transaction(async (tx) => {
      // Atualiza o artigo
      const artigo = await tx.artigo.update({
        where: { id: parseInt(id) },
        data: {
          titulo,
          slug,
          conteudo,
          resumo,
          imagemHeader,
          status,
          dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : null,
          themeDark: themeDark || false  // ← ADICIONADO
        }
      });

      // Se tagIds foi fornecido, atualiza as tags
      if (Array.isArray(tagIds)) {
        // Remove todas as tags antigas
        await tx.artigoTag.deleteMany({
          where: { artigoId: parseInt(id) }
        });

        // Adiciona as novas tags
        if (tagIds.length > 0) {
          await tx.artigoTag.createMany({
            data: tagIds.map((tagId: number) => ({
              artigoId: parseInt(id),
              tagId: tagId
            }))
          });
        }
      }

      // Busca o artigo atualizado com tags
      return await tx.artigo.findUnique({
        where: { id: parseInt(id) },
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
      ...artigoAtualizado,
      tags: artigoAtualizado?.ArtigoTag.map(at => at.Tag.nome) || []
    };

    return NextResponse.json(resultado);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar artigo' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir artigo (e relacionamentos em cascata)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verifica autenticação admin
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    
    // O Prisma remove automaticamente os relacionamentos ArtigoTag
    // se você configurou onDelete: Cascade no schema
    await prisma.artigo.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Artigo excluído com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao excluir artigo' },
      { status: 500 }
    );
  }
}