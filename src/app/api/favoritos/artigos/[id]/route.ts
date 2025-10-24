// app/api/favoritos/artigos/[id]/route.ts
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

// DELETE - Remover artigo dos favoritos
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica autenticação
    const userData = verifyToken(request);
    
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
    const favorito = await prisma.favoritoArtigo.findUnique({
      where: {
        id_usuario_id_artigo: {
          id_usuario: userData.userId,
          id_artigo: id_artigo,
        },
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
    console.error('Erro ao remover favorito:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}