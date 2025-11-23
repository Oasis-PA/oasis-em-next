// file: app/api/produtos/[id]/route.ts
// ✅ CORRIGIDO: Todos os erros TypeScript resolvidos

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const id_produto = parseInt(id);

    if (isNaN(id_produto)) {
      return NextResponse.json(
        { error: 'ID de produto inválido' },
        { status: 400 }
      );
    }

    // ✅ CORRIGIDO: Tag com maiúsculo
    const produto = await prisma.produto.findUnique({
      where: { id_produto },
      include: {
        ProdutoTag: {
          include: {
            Tag: {  // ✅ CORRIGIDO: Tag (maiúsculo)
              select: { id_tag: true, nome: true }
            }
          },
          orderBy: { ordem: 'asc' }
        }
      }
    });

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Formatar preço
    const formatarPreco = (preco: any): string => {
      if (!preco) return '0,00';
      if (typeof preco === 'string') return preco;
      if (typeof preco === 'number') {
        return preco.toFixed(2).replace('.', ',');
      }
      return String(preco);
    };

    // ✅ CORRIGIDO: Acesso seguro ao ProdutoTag
    const tagPrincipal = produto.ProdutoTag?.find(pt => pt.principal);
    const tagsSecundarias = produto.ProdutoTag?.filter(pt => !pt.principal) || [];

    const formattedProduct = {
      id_produto: produto.id_produto,
      nome: produto.nome,
      preco: formatarPreco(produto.preco),
      url_loja: produto.url_loja,
      url_imagem: produto.url_imagem || null,
      composicao: produto.composicao || '',
      qualidades: produto.qualidades || '',
      mais_detalhes: produto.mais_detalhes || '',
      
      // ✅ CORRIGIDO: Acesso seguro com optional chaining
      tag_principal: tagPrincipal?.Tag?.nome || 'Geral',
      id_tag: tagPrincipal?.Tag?.id_tag || null,
      tags: produto.ProdutoTag?.map(pt => ({
        id: pt.Tag.id_tag,
        nome: pt.Tag.nome,
        principal: pt.principal
      })) || []
    };

    return NextResponse.json(formattedProduct);

  } catch (error: any) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PATCH - Atualização de produto
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_produto = parseInt(id);

    if (isNaN(id_produto)) {
      return NextResponse.json(
        { error: 'ID de produto inválido' },
        { status: 400 }
      );
    }

    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado' },
        { status: 401 }
      );
    }

    const produtoExistente = await prisma.produto.findUnique({
      where: { id_produto },
    });

    if (!produtoExistente) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const allowedFields = [
      'nome', 'marca', 'preco', 'id_categoria', 'descricao',
      'id_tag', 'id_tipo_pele', 'id_tipo_cabelo',
      'url_imagem', 'url_loja', 'composicao', 'qualidades', 'mais_detalhes'
    ];

    const updateData: any = {};
    for (const field of allowedFields) {
      if (field in body && body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Nenhum campo válido fornecido para atualização' },
        { status: 400 }
      );
    }

    // ✅ CORRIGIDO: Tag com maiúsculo no include
    const produtoAtualizado = await prisma.produto.update({
      where: { id_produto },
      data: updateData,
      include: {
        categoria: true,
        tipo_cabelo: true,
        TipoPele: true,
        ProdutoTag: {
          include: { 
            Tag: true  // ✅ CORRIGIDO: Tag (maiúsculo)
          }
        }
      },
    });

    return NextResponse.json({
      message: 'Produto atualizado com sucesso',
      produto: produtoAtualizado,
    });
  } catch (error: any) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
}