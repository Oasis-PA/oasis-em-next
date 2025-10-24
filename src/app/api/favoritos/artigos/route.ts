// app/api/favoritos/artigos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId: number;
  email: string;
}

// Função para verificar o token JWT
function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
}

// POST - Adicionar artigo aos favoritos
export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação
    const userData = verifyToken(request);
    
    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    // Tenta ler o body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Body inválido ou vazio' },
        { status: 400 }
      );
    }

    const { id_artigo } = body;

    // Validação
    if (!id_artigo || typeof id_artigo !== 'number') {
      return NextResponse.json(
        { error: 'ID do artigo é obrigatório e deve ser um número' },
        { status: 400 }
      );
    }

    // Verifica se o artigo existe
    const artigo = await prisma.artigo.findUnique({
      where: { id: id_artigo },
    });

    if (!artigo) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Verifica se já está favoritado
    const favoritoExistente = await prisma.favoritoArtigo.findUnique({
      where: {
        id_usuario_id_artigo: {
          id_usuario: userData.userId,
          id_artigo: id_artigo,
        },
      },
    });

    if (favoritoExistente) {
      return NextResponse.json(
        { 
          message: 'Artigo já está nos favoritos',
          favorito: favoritoExistente
        },
        { status: 200 }
      );
    }

    // Cria o favorito
    const novoFavorito = await prisma.favoritoArtigo.create({
      data: {
        id_usuario: userData.userId,
        id_artigo: id_artigo,
      },
      include: {
        Artigo: {
          select: {
            id: true,
            titulo: true,
            slug: true,
            imagemHeader: true,
            resumo: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Artigo adicionado aos favoritos com sucesso',
        favorito: novoFavorito,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// GET - Listar todos os artigos favoritos do usuário
export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    const userData = verifyToken(request);
    
    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    // Busca todos os favoritos do usuário
    const favoritos = await prisma.favoritoArtigo.findMany({
      where: {
        id_usuario: userData.userId,
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
        data_favoritado: 'desc',
      },
    });

    return NextResponse.json(
      {
        favoritos,
        total: favoritos.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}