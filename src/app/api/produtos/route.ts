// app/api/produtos/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: { data_cadastro: 'desc' }, 
      include: {
        tag: true, // Inclui os dados da tag relacionada
      }
    });
    
    // Formata a resposta para o frontend
    const produtosFormatados = produtos.map((p: any) => ({
      id_produto: p.id_produto,
      nome: p.nome,
      url_imagem: p.url_imagem,
      tag_principal: p.tag?.nome || 'Sem tag', // Nome da tag ou fallback
      id_tag: p.id_tag,
    }));
    
    return NextResponse.json(produtosFormatados);

  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { message: 'Erro ao carregar lista de produtos.', error: String(error) },
      { status: 500 }
    );
  }
}