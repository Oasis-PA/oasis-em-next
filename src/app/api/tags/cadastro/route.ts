

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { nome } = await req.json();

    if (!nome) {
      return NextResponse.json(
        { message: 'O nome da tag é obrigatório.' },
        { status: 400 }
      );
    }

    // Verifica se a tag já existe (baseado no @unique do seu modelo)
    const tagExistente = await prisma.tag.findUnique({
        where: { nome: nome.toLowerCase() } // Normaliza para evitar tags duplicadas (ex: 'Shampoo' e 'shampoo')
    });

    if (tagExistente) {
        return NextResponse.json(
            { message: 'Esta tag já existe.' },
            { status: 409 } // 409 Conflict
        );
    }
    
    // Cria a tag no banco
    const novaTag = await prisma.tag.create({
      data: {
        nome: nome.toLowerCase(),
      },
    });

    return NextResponse.json({
      message: 'Tag cadastrada com sucesso!',
      tag: novaTag,
    }, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Erro ao cadastrar tag:', error);
    // Em caso de erro interno, retorna 500
    return NextResponse.json(
      { message: 'Erro interno do servidor ao tentar cadastrar a tag.' },
      { status: 500 }
    );
  }
}