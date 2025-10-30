// app/api/favoritos/artigos/check/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId?: number;
  id?: number;
  id_usuario?: number;
  email: string;
}

// Função para verificar o token JWT
function verifyToken(request: NextRequest): { userId: number; email: string } | null {
  try {
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
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

// GET - Verifica se o artigo está favoritado pelo usuário
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params no Next.js 15
    const params = await context.params;
    const id_artigo = parseInt(params.id);

    // Validação
    if (isNaN(id_artigo)) {
      return NextResponse.json(
        { error: 'ID do artigo inválido', isFavorited: false },
        { status: 400 }
      );
    }

    // Verifica autenticação
    const userData = verifyToken(request);
    
    // Se não estiver autenticado, retorna false
    if (!userData) {
      return NextResponse.json(
        { isFavorited: false },
        { status: 200 }
      );
    }

    // Verifica se o favorito existe
    const favorito = await prisma.favoritoArtigo.findFirst({
      where: {
        id_usuario: userData.userId,
        id_artigo: id_artigo,
      },
    });

    return NextResponse.json(
      {
        isFavorited: !!favorito,
        favorito: favorito || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        isFavorited: false,
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}