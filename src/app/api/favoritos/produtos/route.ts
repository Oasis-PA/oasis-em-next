// app/api/favoritos/produtos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId?: number;
  id?: number;
  id_usuario?: number;
  email: string;
}

// Função para verificar o token JWT
async function verifyToken (request: NextRequest): Promise<{ userId: number; email: string } | null> {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const decoded = payload as unknown as JWTPayload;

    // Tenta diferentes possíveis nomes do campo ID
    const userId = decoded.userId || decoded.id || decoded.id_usuario;

    if (!userId) {
      return null;
    }

    return {
      userId: userId,
      email: decoded.email
    };
  } catch (error) {
    return null;
  }
}

// POST - Adicionar produto aos favoritos
export async function POST(request: NextRequest) {
  try {

    // Verifica autenticação
    const userData = await verifyToken(request);

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

    const { id_produto } = body;

    // Validação
    if (!id_produto || typeof id_produto !== 'number') {
      return NextResponse.json(
        { error: 'ID do produto é obrigatório e deve ser um número' },
        { status: 400 }
      );
    }

    // Verifica se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id_produto: id_produto },
    });

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }


    // Verifica se já está favoritado
    const favoritoExistente = await prisma.favorito.findFirst({
      where: {
        id_usuario: userData.userId,
        id_produto: id_produto,
      },
    });

    if (favoritoExistente) {
      return NextResponse.json(
        {
          message: 'Produto já está nos favoritos',
          favorito: favoritoExistente
        },
        { status: 200 }
      );
    }

    // Cria o favorito
    const novoFavorito = await prisma.favorito.create({
      data: {
        id_usuario: userData.userId,
        id_produto: id_produto,
      },
      include: {
        produto: {
          select: {
            id_produto: true,
            nome: true,
            marca: true,
            preco: true,
            url_imagem: true,
            descricao: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Produto adicionado aos favoritos com sucesso',
        favorito: novoFavorito,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET - Listar todos os produtos favoritos do usuário
export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    const userData = await verifyToken(request);

    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    // Busca todos os favoritos do usuário
    const favoritos = await prisma.favorito.findMany({
      where: {
        id_usuario: userData.userId,
      },
      include: {
        produto: {
          select: {
            id_produto: true,
            nome: true,
            marca: true,
            preco: true,
            url_imagem: true,
            descricao: true,
            data_cadastro: true,
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
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
