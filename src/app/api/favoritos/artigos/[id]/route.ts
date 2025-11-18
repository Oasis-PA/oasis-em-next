// app/api/favoritos/artigos/[id]/route.ts
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

// DELETE - Remover artigo dos favoritos
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    
    // Await params no Next.js 15
    const params = await context.params;
    
    // Verifica autenticação
    const userData = await verifyToken(request);
    
    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const id_artigo = parseInt(params.id);

    // Validação
    if (isNaN(id_artigo)) {
      return NextResponse.json(
        { error: 'ID do artigo inválido' },
        { status: 400 }
      );
    }


    // Verifica se o favorito existe
    const favorito = await prisma.favoritoArtigo.findFirst({
      where: {
        id_usuario: userData.userId,
        id_artigo: id_artigo,
      },
    });


    if (!favorito) {
      return NextResponse.json(
        { error: 'Favorito não encontrado' },
        { status: 404 }
      );
    }

    // Remove o favorito
    await prisma.favoritoArtigo.delete({
      where: {
        id_favorito_artigo: favorito.id_favorito_artigo,
      },
    });


    return NextResponse.json(
      {
        message: 'Artigo removido dos favoritos com sucesso',
      },
      { status: 200 }
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