// file: app/api/produtos/route.ts - CÓDIGO ATUALIZADO

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tagId = searchParams.get('id_tag');
    const categoriaId = searchParams.get('id_categoria');
    const cabeloId = searchParams.get('id_tipo_cabelo');
    const peleId = searchParams.get('id_tipo_pele');
    const marca = searchParams.get('marca'); // ✅ ALTERADO: de 'id_preco' para 'marca'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    
    try {
        let query = supabaseAdmin
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
        if (tagId) query = query.eq('id_tag', tagId);
        if (categoriaId) query = query.eq('id_categoria', categoriaId);
        if (cabeloId) query = query.eq('id_tipo_cabelo', cabeloId);
        if (peleId) query = query.eq('id_tipo_pele', peleId);

        // ✅ NOVO: Filtro de Marca (substituindo o de preço)
        if (marca) {
            query = query.eq('marca', marca);
        }

        // PAGINAÇÃO
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data: produtos, error, count } = await query;

        if (error) {
            return NextResponse.json(
                { error: 'Erro ao buscar produtos', details: error.message }, 
                { status: 500 }
            );
        }

        const formattedProducts = produtos?.map((p: any) => ({
            id_produto: p.id_produto,
            nome: p.nome,
            url_loja: p.url_loja,
            url_imagem: p.url_imagem || null,
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
        return NextResponse.json(
            { error: 'Erro interno do servidor' }, 
            { status: 500 }
        );
    }
}