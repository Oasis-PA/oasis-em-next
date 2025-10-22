// app/api/produtos/cadastro/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const {
      nome,
      composicao,
      qualidades,
      mais_detalhes,
      marca,
      preco,
      id_categoria,
      url_imagem,
      url_loja,
      id_tag,
      id_tipo_cabelo,
      id_tipo_pele
    } = body;

    // Validação de campos obrigatórios
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

    // Verifica se o tipo de cabelo existe (se foi fornecido)
    if (id_tipo_cabelo) {
      const tipoCabeloExiste = await prisma.tipoCabelo.findUnique({
        where: { id_tipo_cabelo: parseInt(id_tipo_cabelo, 10) }
      });

      if (!tipoCabeloExiste) {
        return NextResponse.json(
          { message: 'Tipo de cabelo não encontrado.' },
          { status: 404 }
        );
      }
    }

    // Verifica se o tipo de pele existe (se foi fornecido)
    if (id_tipo_pele) {
      const tipoPeleExiste = await prisma.tipoPele.findUnique({
        where: { id_tipo_pele: parseInt(id_tipo_pele, 10) }
      });

      if (!tipoPeleExiste) {
        return NextResponse.json(
          { message: 'Tipo de pele não encontrado.' },
          { status: 404 }
        );
      }
    }

    // Cria o produto com todos os campos
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        composicao: composicao?.trim() || null,
        qualidades: qualidades?.trim() || null,
        mais_detalhes: mais_detalhes?.trim() || null,
        marca,
        preco: parseFloat(preco),
        id_categoria: parseInt(id_categoria, 10),
        id_tag: id_tag ? parseInt(id_tag, 10) : null,
        id_tipo_cabelo: id_tipo_cabelo ? parseInt(id_tipo_cabelo, 10) : null,
        id_tipo_pele: id_tipo_pele ? parseInt(id_tipo_pele, 10) : null,
        url_imagem: url_imagem?.trim() || null,
        url_loja: url_loja?.trim() || null,
      },
      include: {
        tag: true,
        tipo_cabelo: true,
        categoria: true,
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