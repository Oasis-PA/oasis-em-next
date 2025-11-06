// src/app/api/avaliacoes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { atualizarAvaliacaoSchema } from '@/lib/validations/avaliacao';
import { ZodError } from 'zod';
import { SignJWT, jwtVerify } from "jose";

// GET - Buscar avaliação específica
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_avaliacao = parseInt(id);

    if (isNaN(id_avaliacao)) {
      return NextResponse.json(
        { error: 'ID de avaliação inválido' },
        { status: 400 }
      );
    }

    const avaliacao = await prisma.avaliacao.findUnique({
      where: { id_avaliacao },
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

    if (!avaliacao) {
      return NextResponse.json(
        { error: 'Avaliação não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(avaliacao);
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar avaliação' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar avaliação (requer autenticação e propriedade)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_avaliacao = parseInt(id);

    if (isNaN(id_avaliacao)) {
      return NextResponse.json(
        { error: 'ID de avaliação inválido' },
        { status: 400 }
      );
    }

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
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const result = await jwtVerify(token, secret);
      decoded = result.payload;
    } catch (error) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 401 }
      );
    }

    const userId = parseInt(decoded.id_usuario || decoded.userId || decoded.id);
    if (!userId) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // 2. Verificar se a avaliação existe
    const avaliacaoExistente = await prisma.avaliacao.findUnique({
      where: { id_avaliacao },
    });

    if (!avaliacaoExistente) {
      return NextResponse.json(
        { error: 'Avaliação não encontrada' },
        { status: 404 }
      );
    }

    // 3. Verificar se o usuário é o dono da avaliação
    if (avaliacaoExistente.id_usuario !== userId) {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar esta avaliação' },
        { status: 403 }
      );
    }

    // 4. Validar dados com Zod
    const body = await request.json();
    const validatedData = atualizarAvaliacaoSchema.parse(body);

    // 5. Atualizar avaliação
    const avaliacaoAtualizada = await prisma.avaliacao.update({
      where: { id_avaliacao },
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

    return NextResponse.json({
      message: 'Avaliação atualizada com sucesso',
      avaliacao: avaliacaoAtualizada,
    });
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

    console.error('Erro ao atualizar avaliação:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar avaliação' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar avaliação (requer autenticação e propriedade)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_avaliacao = parseInt(id);

    if (isNaN(id_avaliacao)) {
      return NextResponse.json(
        { error: 'ID de avaliação inválido' },
        { status: 400 }
      );
    }

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
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const result = await jwtVerify(token, secret);
      decoded = result.payload;
    } catch (error) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 401 }
      );
    }

    const userId = parseInt(decoded.id_usuario || decoded.userId || decoded.id);
    if (!userId) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // 2. Verificar se a avaliação existe
    const avaliacaoExistente = await prisma.avaliacao.findUnique({
      where: { id_avaliacao },
    });

    if (!avaliacaoExistente) {
      return NextResponse.json(
        { error: 'Avaliação não encontrada' },
        { status: 404 }
      );
    }

    // 3. Verificar se o usuário é o dono da avaliação
    if (avaliacaoExistente.id_usuario !== userId) {
      return NextResponse.json(
        { error: 'Você não tem permissão para deletar esta avaliação' },
        { status: 403 }
      );
    }

    // 4. Deletar avaliação
    await prisma.avaliacao.delete({
      where: { id_avaliacao },
    });

    return NextResponse.json({
      message: 'Avaliação deletada com sucesso',
    });
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar avaliação' },
      { status: 500 }
    );
  }
}
