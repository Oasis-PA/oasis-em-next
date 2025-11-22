import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Atualizar opção
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

    const opcao = await prisma.opcaoResposta.update({
      where: { id_opcao: id },
      data: {
        valor: data.valor,
        texto: data.texto,
        ordem: Number(data.ordem ?? 0),
      }
    });

    return NextResponse.json({ success: true, data: opcao });
  } catch (error: any) {
    console.error('Erro ao atualizar opção:', error);
    return NextResponse.json(
      { success: false, error: error?.message ?? 'Erro ao atualizar opção' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar opção
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

    await prisma.opcaoResposta.delete({
      where: { id_opcao: id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Opção deletada com sucesso!' 
    });
  } catch (error: any) {
    console.error('Erro ao deletar opção:', error);
    return NextResponse.json(
      { success: false, error: error?.message ?? 'Erro ao deletar opção' },
      { status: 500 }
    );
  }
}