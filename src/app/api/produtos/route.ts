// file: app/api/produtos/route.ts

import { createClient } from '@supabase/supabase-js'; 
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tagId = searchParams.get('id_tag');
    const categoriaId = searchParams.get('id_categoria');
    const cabeloId = searchParams.get('id_tipo_cabelo');
    const peleId = searchParams.get('id_tipo_pele');
    const precoId = searchParams.get('id_preco');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    try {
        // ✅ QUERY CORRIGIDA: url_imagem agora vem diretamente da tabela Produto
        let query = supabase
            .from('Produto')
            .select(`
                id_produto, 
                nome, 
                url_loja,
                url_imagem,
                id_tag,
                Tag!inner(nome)
            `, { count: 'exact' });

        // APLICAR FILTROS
        if (tagId) {
            query = query.eq('id_tag', tagId);
        }

        // ⚠️ CENÁRIO 1: Se 'id_categoria' existe diretamente na tabela Produto
        if (categoriaId) {
            query = query.eq('id_categoria', categoriaId);
        }

        // ⚠️ CENÁRIO 2: Se houver tabela intermediária (ex: ProdutoTipoCabelo)
        // Precisará de uma subquery ou join adicional
        if (cabeloId) {
            // Se existir coluna direta:
            query = query.eq('id_tipo_cabelo', cabeloId);
            
            // OU se for relação N:N através de tabela intermediária:
            // const { data: produtoIds } = await supabase
            //     .from('ProdutoTipoCabelo')
            //     .select('id_produto')
            //     .eq('id_tipo_cabelo', cabeloId);
            // if (produtoIds) {
            //     query = query.in('id_produto', produtoIds.map(p => p.id_produto));
            // }
        }

        if (peleId) {
            query = query.eq('id_tipo_pele', peleId);
        }

        // FILTRO DE PREÇO (se houver coluna 'preco' na tabela)
        if (precoId) {
            switch(precoId) {
                case '1':
                    query = query.lte('preco', 50);
                    break;
                case '2':
                    query = query.gte('preco', 50).lte('preco', 100);
                    break;
                case '3':
                    query = query.gte('preco', 100);
                    break;
            }
        }

        // PAGINAÇÃO
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data: produtos, error, count } = await query;

        if (error) {
            console.error('Erro ao buscar produtos:', error);
            return NextResponse.json(
                { error: 'Erro ao buscar produtos', details: error.message }, 
                { status: 500 }
            );
        }

        // FORMATAÇÃO DOS DADOS
        const formattedProducts = produtos?.map((p: any) => ({
            id_produto: p.id_produto,
            nome: p.nome,
            url_loja: p.url_loja,
            url_imagem: p.url_imagem || null, // ✅ url_imagem vem diretamente da tabela
            tag_principal: p.Tag?.nome || '',
            id_tag: p.id_tag
        })) || [];

        return NextResponse.json({
            produtos: formattedProducts,
            pagination: {
                page,
                limit,
                total: count || 0,
                hasMore: count ? (page * limit) < count : false
            }
        });

    } catch (error: any) {
        console.error('Erro inesperado:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' }, 
            { status: 500 }
        );
    }
}