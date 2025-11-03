// file: app/api/produtos/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

    try {
        const { data: produto, error } = await supabaseAdmin
            .from('Produto')
            .select(`
                id_produto, 
                nome, 
                preco,
                url_loja,
                url_imagem,
                composicao,
                qualidades,
                mais_detalhes,
                id_tag,
                Tag!inner(nome)
            `)
            .eq('id_produto', id)
            .single();

        if (error) {
            console.error('Erro ao buscar produto:', error);
            return NextResponse.json(
                { error: 'Produto não encontrado', details: error.message }, 
                { status: 404 }
            );
        }

        // Garantir que produto não é null antes de acessar propriedades
        if (!produto) {
            return NextResponse.json(
                { error: 'Produto não encontrado' }, 
                { status: 404 }
            );
        }

        // Tag pode vir como array ou objeto, então tratamos ambos os casos
        const tagData = produto.Tag as any;
        let tagNome = '';
        
        if (Array.isArray(tagData) && tagData.length > 0) {
            tagNome = tagData[0]?.nome || '';
        } else if (tagData && typeof tagData === 'object') {
            tagNome = tagData.nome || '';
        }

        // Formatar preço para o padrão brasileiro
        const formatarPreco = (preco: any): string => {
            if (!preco) return '0,00';
            
            // Se já for string, retorna como está
            if (typeof preco === 'string') return preco;
            
            // Se for número, formata
            if (typeof preco === 'number') {
                return preco.toFixed(2).replace('.', ',');
            }
            
            return String(preco);
        };

        const formattedProduct = {
            id_produto: produto.id_produto,
            nome: produto.nome,
            preco: formatarPreco(produto.preco),
            url_loja: produto.url_loja,
            url_imagem: produto.url_imagem || null,
            composicao: produto.composicao || '',
            qualidades: produto.qualidades || '',
            mais_detalhes: produto.mais_detalhes || '',
            tag_principal: tagNome,
            id_tag: produto.id_tag
        };

        console.log('Produto formatado:', formattedProduct); // Debug

        return NextResponse.json(formattedProduct);

    } catch (error: any) {
        console.error('Erro inesperado:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

// PATCH - Atualização parcial de produto (requer autenticação admin)
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

    // 1. Validar autenticação admin
    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado' },
        { status: 401 }
      );
    }

    // 2. Verificar se o produto existe
    const produtoExistente = await prisma.produto.findUnique({
      where: { id_produto },
    });

    if (!produtoExistente) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // 3. Processar dados de atualização
    const body = await request.json();

    // Campos permitidos para atualização
    const allowedFields = [
      'nome',
      'marca',
      'preco',
      'id_categoria',
      'descricao',
      'id_tag',
      'id_tipo_pele',
      'id_tipo_cabelo',
      'url_imagem',
      'url_loja',
      'composicao',
      'qualidades',
      'mais_detalhes',
    ];

    // Filtrar apenas campos permitidos
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

    // 4. Atualizar produto
    const produtoAtualizado = await prisma.produto.update({
      where: { id_produto },
      data: updateData,
      include: {
        categoria: true,
        tag: true,
        tipo_cabelo: true,
        TipoPele: true,
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