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

// DELETE - Remover artigo dos favoritos
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log('🔹 Iniciando DELETE /api/favoritos/artigos/[id]');
    
    // Await params no Next.js 15
    const params = await context.params;
    console.log('🔹 params:', params);
    
    // Verifica autenticação
    const userData = await verifyToken(request);
    console.log('🔹 userData:', userData ? `userId: ${userData.userId}` : 'null');
    
    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const id_artigo = parseInt(params.id);
    console.log('🔹 id_artigo:', id_artigo);

    // Validação
    if (isNaN(id_artigo)) {
      return NextResponse.json(
        { error: 'ID do artigo inválido' },
        { status: 400 }
      );
    }

    console.log('🔹 Buscando favorito para deletar...');
    console.log('🔹 Busca com:', { id_usuario: userData.userId, id_artigo: id_artigo });

    // Verifica se o favorito existe
    const favorito = await prisma.favoritoArtigo.findFirst({
      where: {
        id_usuario: userData.userId,
        id_artigo: id_artigo,
      },
    });

    console.log('🔹 Favorito encontrado:', favorito ? `id: ${favorito.id_favorito_artigo}` : 'null');

    if (!favorito) {
      return NextResponse.json(
        { error: 'Favorito não encontrado' },
        { status: 404 }
      );
    }

    console.log('🔹 Deletando favorito...');
    // Remove o favorito
    await prisma.favoritoArtigo.delete({
      where: {
        id_favorito_artigo: favorito.id_favorito_artigo,
      },
    });

    console.log('✅ Favorito removido com sucesso!');

    return NextResponse.json(
      {
        message: 'Artigo removido dos favoritos com sucesso',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ ERRO ao remover favorito:', error);
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