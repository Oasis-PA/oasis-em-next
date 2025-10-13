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
      id_loja,
      id_tag
    } = await req.json();

    if (!nome || !marca || !preco || !id_categoria) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando (nome, marca, preco, id_categoria).' },
        { status: 400 }
      );
    }

    // Verifica se a categoria existe
    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id_categoria: parseInt(id_categoria, 10) }
    });

    if (!categoriaExiste) {
      return NextResponse.json(
        { message: `Categoria com ID ${id_categoria} não encontrada. Por favor, use uma categoria válida.` },
        { status: 404 }
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

    // Cria o produto com url_imagem e url_loja direto
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        marca,
        preco: parseFloat(preco),
        id_categoria: parseInt(id_categoria, 10),
        id_tag: id_tag ? parseInt(id_tag, 10) : null,
        url_imagem: url_imagem || null,
        url_loja: url_loja || null,
      },
      include: {
        tag: true,
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