import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Criar nova pergunta
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const idQuestionario = Number(data.id_questionario);
    if (!idQuestionario || !data.pergunta) {
      return NextResponse.json({ error: 'id_questionario e pergunta são obrigatórios' }, { status: 400 });
    }

    // verificar se questionário existe
    const q = await prisma.questionario.findUnique({ where: { id_questionario: idQuestionario } });
    if (!q) {
      return NextResponse.json({ error: 'Questionário não encontrado' }, { status: 404 });
    }

    const pergunta = await prisma.pergunta.create({
      data: {
        id_questionario: idQuestionario,
        pergunta: data.pergunta,
        subtitulo: data.subtitulo ?? null,
        campo_bd: data.campo_bd ?? null,
        imagem_url: data.imagem_url ?? null,
        ordem: Number(data.ordem ?? 0),
        obrigatoria: Boolean(data.obrigatoria ?? true),
      },
      include: { OpcaoResposta: true }
    });

    return NextResponse.json({
      success: true,
      message: 'Pergunta criada com sucesso!',
      data: pergunta
    }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar pergunta:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Erro ao criar pergunta' },
      { status: 500 }
    );
  }
}