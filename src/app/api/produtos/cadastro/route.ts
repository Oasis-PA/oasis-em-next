// app/api/produtos/cadastro/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { 
      nome, 
      descricao, 
      marca, 
      preco, 
      id_categoria, 
      url_imagem, 
      url_loja,
      id_tag // Agora recebe o ID da tag ao invés do nome
    } = await req.json();

    if (!nome || !marca || !preco || !id_categoria || !url_imagem || !url_loja) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando.' },
        { status: 400 }
      );
    }

    // Verifica se a tag existe (se foi fornecida)
    if (id_tag) {
      const tagExiste = await prisma.tag.findUnique({
        where: { id_tag: parseInt(id_tag, 10) }
      });
      
      if (!tagExiste) {
        return NextResponse.json(
          { message: 'Tag não encontrada.' },
          { status: 404 }
        );
      }
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
        id_tag: id_tag ? parseInt(id_tag, 10) : null,
      },
      include: {
        tag: true, // Retorna os dados da tag junto
      }
    });

    return NextResponse.json({
      message: 'Produto cadastrado com sucesso!',
      produto: novoProduto,
    });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor.', error: String(error) },
      { status: 500 }
    );
  }
}