// app/api/tags/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { nome: 'asc' },
    });
    
    return NextResponse.json(tags);

  } catch (error) {
    console.error('Erro ao buscar tags:', error);
    return NextResponse.json(
      { message: 'Erro ao carregar tags.', error: String(error) },
      { status: 500 }
    );
  }
}