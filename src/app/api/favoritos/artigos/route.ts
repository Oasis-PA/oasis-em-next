// app/api/favoritos/artigos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SignJWT, jwtVerify } from "jose";

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
      console.error('❌ Token JWT não contém userId. Payload:', decoded);
      return null;
    }
    
    return {
      userId: userId,
      email: decoded.email
    };
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
}

// POST - Adicionar artigo aos favoritos
export async function POST(request: NextRequest) {
  try {
    console.log('🔹 Iniciando POST /api/favoritos/artigos');
    
    // Verifica autenticação
    const userData = await verifyToken(request);
    console.log('🔹 userData:', userData ? `userId: ${userData.userId}` : 'null');
    
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
      console.log('🔹 body recebido:', body);
    } catch (error) {
      console.error('❌ Erro ao ler body:', error);
      return NextResponse.json(
        { error: 'Body inválido ou vazio' },
        { status: 400 }
      );
    }

    const { id_artigo } = body;
    console.log('🔹 id_artigo:', id_artigo, 'tipo:', typeof id_artigo);

    // Validação
    if (!id_artigo || typeof id_artigo !== 'number') {
      return NextResponse.json(
        { error: 'ID do artigo é obrigatório e deve ser um número' },
        { status: 400 }
      );
    }

    console.log('🔹 Verificando se artigo existe...');
    // Verifica se o artigo existe
    const artigo = await prisma.artigo.findUnique({
      where: { id: id_artigo },
    });
    console.log('🔹 Artigo encontrado:', artigo ? `id: ${artigo.id}` : 'null');

    if (!artigo) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    console.log('🔹 Verificando se já está favoritado...');
    console.log('🔹 Buscando com:', { id_usuario: userData.userId, id_artigo: id_artigo });
    
    // Verifica se já está favoritado
    const favoritoExistente = await prisma.favoritoArtigo.findFirst({
      where: {
        id_usuario: userData.userId,
        id_artigo: id_artigo,
      },
    });
    console.log('🔹 Favorito existente:', favoritoExistente ? 'sim' : 'não');

    if (favoritoExistente) {
      return NextResponse.json(
        { 
          message: 'Artigo já está nos favoritos',
          favorito: favoritoExistente
        },
        { status: 200 }
      );
    }

    console.log('🔹 Criando favorito...');
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
    console.log('✅ Favorito criado com sucesso:', novoFavorito.id_favorito_artigo);

    return NextResponse.json(
      {
        message: 'Artigo adicionado aos favoritos com sucesso',
        favorito: novoFavorito,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ ERRO COMPLETO:', error);
    console.error('❌ Stack:', error instanceof Error ? error.stack : 'no stack');
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

// GET - Listar todos os artigos favoritos do usuário
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