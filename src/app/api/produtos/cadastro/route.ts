
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    
    const { nome, descricao, marca, preco, id_categoria, url_imagem, url_loja } = await req.json();

    if (!nome || !marca || !preco || !id_categoria || !url_imagem || !url_loja) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando.' },
        { status: 400 }
      );
    }

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        marca,
        preco: parseFloat(preco),
        id_categoria: parseInt(id_categoria, 10),
        url_imagem, 
        url_loja, 
      },
    });

    return NextResponse.json({
      message: 'Produto cadastrado com sucesso!',
      produto: novoProduto,
    });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}