import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Atualizar pergunta
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await request.json();
    const idNum = parseInt(id);

    if (!idNum || isNaN(idNum)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      );
    }

    const pergunta = await prisma.pergunta.update({
      where: { id_pergunta: idNum },
      data: {
        pergunta: data.pergunta,
        subtitulo: data.subtitulo ?? null,
        campo_bd: data.campo_bd ?? null,
        imagem_url: data.imagem_url ?? null,
        ordem: Number(data.ordem ?? 0),
        obrigatoria: Boolean(data.obrigatoria ?? true),
      }
    });

    return NextResponse.json({ success: true, data: pergunta });
  } catch (error: any) {
    console.error('Erro ao atualizar pergunta:', error);
    return NextResponse.json(
      { success: false, error: error?.message ?? 'Erro ao atualizar pergunta' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar pergunta
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const idNum = parseInt(id);

    if (!idNum || isNaN(idNum)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      );
    }

    await prisma.pergunta.delete({
      where: { id_pergunta: idNum }
    });

    return NextResponse.json({
      success: true,
      message: 'Pergunta deletada com sucesso!'
    });
  } catch (error: any) {
    console.error('Erro ao deletar pergunta:', error);
    return NextResponse.json(
      { success: false, error: error?.message ?? 'Erro ao deletar pergunta' },
      { status: 500 }
    );
  }
}
