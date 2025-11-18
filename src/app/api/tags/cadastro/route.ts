import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nome } = body;

    if (!nome || !nome.trim()) {
      return NextResponse.json(
        { message: 'O nome da tag é obrigatório.' },
        { status: 400 }
      );
    }

    const nomeNormalizado = nome.trim().toLowerCase();

    // Verifica se a tag já existe
    const tagExistente = await prisma.tag.findUnique({
      where: { nome: nomeNormalizado }
    });

    if (tagExistente) {
      return NextResponse.json(
        { message: 'Esta tag já existe.' },
        { status: 409 }
      );
    }

    
    // Cria a tag no banco
    const novaTag = await prisma.tag.create({
      data: {
        nome: nomeNormalizado,
      },
    });


    return NextResponse.json({
      message: 'Tag cadastrada com sucesso!',
      tag: novaTag,
    }, { status: 201 });

  } catch (error) {
    
    // Retorna mais detalhes do erro em desenvolvimento
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor ao tentar cadastrar a tag.',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}