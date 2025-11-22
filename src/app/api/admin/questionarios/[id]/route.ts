import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Atualizar questionário
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const data = await request.json();
    const id = parseInt(params.id);

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      );
    }

    const questionario = await prisma.questionario.update({
      where: { id_questionario: id },
      data: {
        titulo: data.titulo,
        descricao: data.descricao ?? null,
        icon: data.icon ?? null,
        redirect_url: data.redirect_url ?? null,
        ativo: data.ativo ?? true,
        ordem: Number(data.ordem ?? 0),
      }
    });

    return NextResponse.json({ success: true, data: questionario });
  } catch (error: any) {
    console.error('Erro ao atualizar questionário:', error);
    return NextResponse.json(
      { success: false, error: error?.message ?? 'Erro ao atualizar questionário' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar questionário
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID inválido' },
        { status: 400 }
      );
    }

    await prisma.questionario.delete({
      where: { id_questionario: id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Questionário deletado com sucesso!' 
    });
  } catch (error: any) {
    console.error('Erro ao deletar questionário:', error);
    return NextResponse.json(
      { success: false, error: error?.message ?? 'Erro ao deletar questionário' },
      { status: 500 }
    );
  }
}