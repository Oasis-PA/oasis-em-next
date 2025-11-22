import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Atualizar pergunta
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const id = parseInt(params.id);

    const pergunta = await prisma.pergunta.update({
      where: { id_pergunta: id },
      data: {
        pergunta: data.pergunta,
        subtitulo: data.subtitulo,
        campo_bd: data.campo_bd,
        imagem_url: data.imagem_url,
        ordem: data.ordem,
        obrigatoria: data.obrigatoria,
      }
    });

    return NextResponse.json({ success: true, data: pergunta });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar pergunta' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar pergunta
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.pergunta.delete({
      where: { id_pergunta: id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Pergunta deletada com sucesso!' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar pergunta' },
      { status: 500 }
    );
  }
}