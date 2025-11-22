import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Criar nova opção
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const idPergunta = Number(data.id_pergunta);
    if (!idPergunta || !data.valor || !data.texto) {
      return NextResponse.json({ error: 'id_pergunta, valor e texto são obrigatórios' }, { status: 400 });
    }

    // verificar se pergunta existe
    const p = await prisma.pergunta.findUnique({ where: { id_pergunta: idPergunta } });
    if (!p) {
      return NextResponse.json({ error: 'Pergunta não encontrada' }, { status: 404 });
    }

    const opcao = await prisma.opcaoResposta.create({
      data: {
        id_pergunta: idPergunta,
        valor: data.valor,
        texto: data.texto,
        ordem: Number(data.ordem ?? 0),
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Opção criada com sucesso!',
      data: opcao
    }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar opção:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Erro ao criar opção' },
      { status: 500 }
    );
  }
}