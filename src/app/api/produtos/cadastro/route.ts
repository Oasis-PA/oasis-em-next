// app/api/produtos/cadastro/route.ts
// ATUALIZADO: Suporta múltiplas tags

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
      id_tag, // Tag principal (compatibilidade)
      tags_ids, // ✅ NOVO: Array de IDs de tags
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
        { message: `Categoria com ID ${id_categoria} não encontrada.` },
        { status: 404 }
      );
    }

    // ✅ NOVO: Validar tags se fornecidas
    const tagsParaAdicionar: number[] = [];
    
    if (tags_ids && Array.isArray(tags_ids) && tags_ids.length > 0) {
      // Validar se todas as tags existem
      const tagsExistentes = await prisma.tag.findMany({
        where: { id_tag: { in: tags_ids.map((id: any) => parseInt(id, 10)) } }
      });

      if (tagsExistentes.length !== tags_ids.length) {
        return NextResponse.json(
          { message: 'Uma ou mais tags não foram encontradas.' },
          { status: 404 }
        );
      }

      tagsParaAdicionar.push(...tags_ids.map((id: any) => parseInt(id, 10)));
    } else if (id_tag) {
      // Compatibilidade: usar id_tag como tag principal
      const tagExiste = await prisma.tag.findUnique({
        where: { id_tag: parseInt(id_tag, 10) }
      });

      if (!tagExiste) {
        return NextResponse.json(
          { message: 'Tag não encontrada.' },
          { status: 404 }
        );
      }

      tagsParaAdicionar.push(parseInt(id_tag, 10));
    }

    // Validar tipo de cabelo
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

    // Validar tipo de pele
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

    // ✅ ATUALIZADO: Criar produto com múltiplas tags
    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        composicao: composicao?.trim() || null,
        qualidades: qualidades?.trim() || null,
        mais_detalhes: mais_detalhes?.trim() || null,
        marca,
        preco: parseFloat(preco),
        id_categoria: parseInt(id_categoria, 10),
        id_tag: tagsParaAdicionar[0] || null, // Mantém compatibilidade
        id_tipo_cabelo: id_tipo_cabelo ? parseInt(id_tipo_cabelo, 10) : null,
        id_tipo_pele: id_tipo_pele ? parseInt(id_tipo_pele, 10) : null,
        url_imagem: url_imagem?.trim() || null,
        url_loja: url_loja?.trim() || null,
        
        // ✅ NOVO: Adicionar tags na tabela ProdutoTag
        ProdutoTag: {
          create: tagsParaAdicionar.map((tagId, index) => ({
            id_tag: tagId,
            principal: index === 0, // Primeira tag é principal
            ordem: index + 1
          }))
        }
      },
      include: {
        categoria: true,
        tipo_cabelo: true,
        ProdutoTag: {
          include: { Tag: true }
        }
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