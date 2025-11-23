import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const questionario = await prisma.questionario.findFirst({
      where: {
        slug,
        ativo: true
      },
      include: {
        Pergunta: {
          include: {
            OpcaoResposta: {
              orderBy: { ordem: 'asc' }
            }
          },
          orderBy: { ordem: 'asc' }
        }
      }
    });

    if (!questionario) {
      return NextResponse.json(
        { error: 'Questionário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: questionario
    });
  } catch (error: any) {
    console.error('Erro ao buscar questionário:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Erro ao buscar questionário' },
      { status: 500 }
    );
  }
}
