import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Atualizar questionário
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const id = parseInt(params.id);

    const questionario = await prisma.questionario.update({
      where: { id_questionario: id },
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        icon: data.icon,
        redirect_url: data.redirect_url,
        ativo: data.ativo,
        ordem: data.ordem,
      }
    });

    return NextResponse.json({ success: true, data: questionario });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar questionário' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar questionário
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.questionario.delete({
      where: { id_questionario: id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Questionário deletado com sucesso!' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar questionário' },
      { status: 500 }
    );
  }
}