// app/api/test-favorito/route.ts
// ROTA DE TESTE - Remover depois de resolver o problema
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId: number;
  email: string;
}

function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const results: any = {
    step1_auth: null,
    step2_cookie: null,
    step3_prisma_connection: null,
    step4_schema_info: null,
    error: null,
  };

  try {
    // Teste 1: Cookie
    const cookie = request.cookies.get('auth-token');
    results.step2_cookie = cookie ? 'Cookie encontrado' : 'Cookie não encontrado';
    
    // Teste 2: Autenticação
    const userData = verifyToken(request);
    results.step1_auth = userData 
      ? { userId: userData.userId, email: userData.email }
      : 'Não autenticado';

    // Teste 3: Conexão Prisma
    try {
      await prisma.$connect();
      results.step3_prisma_connection = 'Conexão OK';
    } catch (err) {
      results.step3_prisma_connection = `Erro: ${err instanceof Error ? err.message : 'desconhecido'}`;
    }

    // Teste 4: Verificar schema do FavoritoArtigo
    try {
      const schemaInfo = await prisma.$queryRaw`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'FavoritoArtigo'
        ORDER BY ordinal_position
      `;
      results.step4_schema_info = schemaInfo;
    } catch (err) {
      results.step4_schema_info = `Erro ao buscar schema: ${err instanceof Error ? err.message : 'desconhecido'}`;
    }

    // Teste 5: Testar busca de favorito (se autenticado)
    if (userData) {
      try {
        const testArtigo = await prisma.artigo.findFirst({
          select: { id: true, titulo: true }
        });
        
        results.step5_test_artigo = testArtigo 
          ? { id: testArtigo.id, titulo: testArtigo.titulo }
          : 'Nenhum artigo encontrado';

        if (testArtigo) {
          // Tenta buscar favorito
          try {
            const favorito = await prisma.favoritoArtigo.findUnique({
              where: {
                id_usuario_id_artigo: {
                  id_usuario: userData.userId,
                  id_artigo: testArtigo.id,
                },
              },
            });
            results.step6_test_favorito = favorito ? 'Favorito encontrado' : 'Favorito não existe';
          } catch (err: any) {
            results.step6_test_favorito = `Erro na busca: ${err.message}`;
            results.step6_error_code = err.code;
          }

          // Tenta criar um favorito de teste
          try {
            const novoFavorito = await prisma.favoritoArtigo.create({
              data: {
                id_usuario: userData.userId,
                id_artigo: testArtigo.id,
              },
            });
            results.step7_test_create = `Favorito criado: ${novoFavorito.id_favorito_artigo}`;
            
            // Remove o favorito de teste
            await prisma.favoritoArtigo.delete({
              where: { id_favorito_artigo: novoFavorito.id_favorito_artigo }
            });
            results.step8_test_delete = 'Favorito removido com sucesso';
          } catch (err: any) {
            results.step7_test_create = `Erro ao criar: ${err.message}`;
            results.step7_error_code = err.code;
            results.step7_error_meta = err.meta;
          }
        }
      } catch (err) {
        results.step5_test_artigo = `Erro: ${err instanceof Error ? err.message : 'desconhecido'}`;
      }
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    results.error = {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
    return NextResponse.json(results, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}