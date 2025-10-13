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

    // Cria o produto primeiro
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        marca,
        preco: parseFloat(preco),
        id_categoria: parseInt(id_categoria, 10),
        id_tag: id_tag ? parseInt(id_tag, 10) : null,
      },
      include: {
        tag: true,
      }
    });

    // Se foi fornecida uma imagem, cria na tabela ImagemProduto
    if (url_imagem) {
      await prisma.imagemProduto.create({
        data: {
          id_produto: novoProduto.id_produto,
          url_imagem: url_imagem,
          ordem: 1,
        }
      });
    }

    // Se foi fornecido link de loja, cria na tabela LinkLoja
    if (url_loja && id_loja) {
      await prisma.linkLoja.create({
        data: {
          id_produto: novoProduto.id_produto,
          id_loja: parseInt(id_loja, 10),
          preco: parseFloat(preco),
          url_compra: url_loja,
        }
      });
    }

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