// src/app/api/avaliacoes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { criarAvaliacaoSchema } from '@/lib/validations/avaliacao';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// GET - Listar avaliações (com filtros opcionais)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id_produto = searchParams.get('id_produto');
    const id_usuario = searchParams.get('id_usuario');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where: any = {};
    if (id_produto) where.id_produto = parseInt(id_produto);
    if (id_usuario) where.id_usuario = parseInt(id_usuario);

    const skip = (page - 1) * limit;

    const [avaliacoes, total] = await Promise.all([
      prisma.avaliacao.findMany({
        where,
        include: {
          usuario: {
            select: {
              id_usuario: true,
              nome: true,
              sobrenome: true,
              url_foto: true,
            },
          },
          produto: {
            select: {
              id_produto: true,
              nome: true,
            },
          },
        },
        orderBy: {
          data_avaliacao: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.avaliacao.count({ where }),
    ]);

    return NextResponse.json({
      avaliacoes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar avaliações' },
      { status: 500 }
    );
  }
}

// POST - Criar avaliação (requer autenticação)
export async function POST(request: NextRequest) {
  // Rate Limiting: 5 avaliações por hora por IP
  const clientIp = getClientIp(request);
  const rateLimitResult = rateLimit(clientIp, {
    id: 'criar-avaliacao',
    limit: 5,
    window: 3600, // 1 hora
  });

  if (!rateLimitResult.success) {
    const waitMinutes = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000);
    return NextResponse.json(
      {
        error: 'Muitas avaliações criadas. Tente novamente em ' + waitMinutes + ' minutos.',
        retryAfter: rateLimitResult.resetTime,
      },
      { status: 429 }
    );
  }

  try {
    // 1. Validar autenticação
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 401 }
      );
    }

    const userId = decoded.id_usuario || decoded.userId || decoded.id;
    if (!userId) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // 2. Validar dados com Zod
    const body = await request.json();
    const validatedData = criarAvaliacaoSchema.parse({
      ...body,
      id_usuario: parseInt(userId),
    });

    // 3. Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id_produto: validatedData.id_produto },
    });

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // 4. Verificar se o usuário já avaliou este produto
    const avaliacaoExistente = await prisma.avaliacao.findFirst({
      where: {
        id_usuario: validatedData.id_usuario,
        id_produto: validatedData.id_produto,
      },
    });

    if (avaliacaoExistente) {
      return NextResponse.json(
        { error: 'Você já avaliou este produto. Use PUT para atualizar.' },
        { status: 409 }
      );
    }

    // 5. Criar avaliação
    const novaAvaliacao = await prisma.avaliacao.create({
      data: validatedData,
      include: {
        usuario: {
          select: {
            id_usuario: true,
            nome: true,
            sobrenome: true,
            url_foto: true,
          },
        },
        produto: {
          select: {
            id_produto: true,
            nome: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Avaliação criada com sucesso',
        avaliacao: novaAvaliacao,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: error.errors.map((err) => ({
            campo: err.path.join('.'),
            mensagem: err.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error('Erro ao criar avaliação:', error);
    return NextResponse.json(
      { error: 'Erro ao criar avaliação' },
      { status: 500 }
    );
  }
}
