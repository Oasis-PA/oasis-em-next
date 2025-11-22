import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar todos os questionários
export async function GET() {
  try {
    const questionarios = await prisma.questionario.findMany({
      include: {
        Pergunta: {
          include: {
            OpcaoResposta: {
              orderBy: { ordem: 'asc' }
            }
          },
          orderBy: { ordem: 'asc' }
        }
      },
      orderBy: { ordem: 'asc' }
    });

    return NextResponse.json({ success: true, data: questionarios });
  } catch (error) {
    console.error('Erro ao buscar questionários:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar questionários' },
      { status: 500 }
    );
  }
}

// POST - Criar novo questionário
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // validações mínimas
    if (!data.slug || !data.titulo) {
      return NextResponse.json({ error: 'slug e titulo são obrigatórios' }, { status: 400 });
    }

    // checar slug existente
    const exists = await prisma.questionario.findUnique({ where: { slug: data.slug } });
    if (exists) {
      return NextResponse.json({ error: 'Já existe um questionário com esse slug' }, { status: 409 });
    }

    const questionario = await prisma.questionario.create({
      data: {
        slug: data.slug,
        titulo: data.titulo,
        descricao: data.descricao ?? null,
        icon: data.icon ?? null,
        redirect_url: data.redirect_url ?? null,
        ordem: Number(data.ordem ?? 0),
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Questionário criado com sucesso!',
      data: questionario
    }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar questionário:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Erro ao criar questionário' },
      { status: 500 }
    );
  }
}