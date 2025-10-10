// app/api/tags/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Busca todas as tags e ordena por nome
    const tags = await prisma.tag.findMany({
      orderBy: { nome: 'asc' },
    });
    
    // Formata a resposta
    const tagsFormatadas = tags.map(tag => ({
      id_tag: tag.id_tag,
      nome: tag.nome,
    }));

    return NextResponse.json(tagsFormatadas);

  } catch (error) {
    console.error('Erro ao carregar tags:', error);
    return NextResponse.json(
      { message: 'Erro ao carregar lista de tags.', error: String(error) },
      { status: 500 }
    );
  }
}
