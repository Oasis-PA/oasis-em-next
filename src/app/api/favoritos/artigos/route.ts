import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const { id_artigo } = await req.json();

    if (!id_artigo) {
      return NextResponse.json(
        { error: "id_artigo é obrigatório" },
        { status: 400 }
      );
    }

    // Converte para número se vier como string
    const artigoId = typeof id_artigo === 'string' ? parseInt(id_artigo) : id_artigo;

    // Verifica se o artigo existe
    const artigo = await prisma.artigo.findUnique({
      where: { id: artigoId },
    });

    if (!artigo) {
      return NextResponse.json(
        { error: "Artigo não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se já está favoritado
    const existente = await prisma.favoritoArtigo.findUnique({
      where: {
        id_usuario_id_artigo: {
          id_usuario: decoded.id,
          id_artigo: artigoId,
        },
      },
    });

    if (existente) {
      return NextResponse.json(
        { 
          message: "Artigo já está nos favoritos",
          favorito: existente 
        },
        { status: 200 }
      );
    }

    // Cria o favorito
    const favorito = await prisma.favoritoArtigo.create({
      data: {
        id_usuario: decoded.id,
        id_artigo: artigoId,
      },
      include: {
        Artigo: {
          select: {
            id: true,
            titulo: true,
            slug: true,
            imagemHeader: true,
          },
        },
      },
    });

    return NextResponse.json(
      { 
        message: "Artigo adicionado aos favoritos", 
        favorito 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const { searchParams } = new URL(req.url);
    const id_artigo = searchParams.get("id_artigo");

    if (!id_artigo) {
      return NextResponse.json(
        { error: "id_artigo é obrigatório" },
        { status: 400 }
      );
    }

    const artigoId = parseInt(id_artigo);

    // Remove o favorito
    await prisma.favoritoArtigo.delete({
      where: {
        id_usuario_id_artigo: {
          id_usuario: decoded.id,
          id_artigo: artigoId,
        },
      },
    });

    return NextResponse.json(
      { message: "Artigo removido dos favoritos" },
      { status: 200 }
    );
  } catch (error: any) {
    // Se o favorito não existir
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Favorito não encontrado" },
        { status: 404 }
      );
    }
    
    console.error("Erro ao remover favorito:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const favoritos = await prisma.favoritoArtigo.findMany({
      where: {
        id_usuario: decoded.id,
      },
      include: {
        Artigo: {
          select: {
            id: true,
            titulo: true,
            slug: true,
            imagemHeader: true,
            resumo: true,
            dataPublicacao: true,
            status: true,
          },
        },
      },
      orderBy: {
        data_favoritado: "desc",
      },
    });

    // Filtra apenas artigos publicados
    const favoritosFiltrados = favoritos.filter(
      fav => fav.Artigo.status === "publicado"
    );

    return NextResponse.json({ favoritos: favoritosFiltrados }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}