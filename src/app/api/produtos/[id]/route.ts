// file: app/api/produtos/[id]/route.ts

import { createClient } from '@supabase/supabase-js'; 
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

    try {
        const { data: produto, error } = await supabase
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