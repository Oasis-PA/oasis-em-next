// file: app/api/produtos/route.ts
// ATUALIZADO: Suporta múltiplas tags

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tagId = searchParams.get('id_tag');
    const categoriaId = searchParams.get('id_categoria');
    const cabeloId = searchParams.get('id_tipo_cabelo');
    const peleId = searchParams.get('id_tipo_pele');
    const marca = searchParams.get('marca');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    try {
        // Construir filtros base
        const where: any = {};

        if (categoriaId) where.id_categoria = parseInt(categoriaId);
        if (cabeloId) where.id_tipo_cabelo = parseInt(cabeloId);
        if (peleId) where.id_tipo_pele = parseInt(peleId);
        if (marca) where.marca = marca;

        // ✅ NOVO: Filtro por tag usando ProdutoTag
        if (tagId) {
            where.ProdutoTag = {
                some: {
                    id_tag: parseInt(tagId)
                }
            };
        }

        // Paginação
        const from = (page - 1) * limit;

        // Buscar total
        const total = await prisma.produto.count({ where });

        // ✅ ATUALIZADO: Buscar produtos com múltiplas tags
        const produtos = await prisma.produto.findMany({
            where,
            select: {
                id_produto: true,
                nome: true,
                url_loja: true,
                url_imagem: true,
                ProdutoTag: {
                    where: { principal: true },
                    take: 1,
                    include: {
                        Tag: {
                            select: { nome: true }
                        }
                    }
                }
            },
            skip: from,
            take: limit,
            orderBy: { id_produto: 'desc' }
        });

        // ✅ ATUALIZADO: Formatar resposta com tag principal
        const formattedProducts = produtos.map((p: any) => ({
            id_produto: p.id_produto,
            nome: p.nome,
            url_loja: p.url_loja,
            url_imagem: p.url_imagem || null,
            tag_principal: p.ProdutoTag?.[0]?.tag?.nome || 'Geral',
            id_tag: p.ProdutoTag?.[0]?.tag?.id_tag || null
        }));

        return NextResponse.json({
            produtos: formattedProducts,
            pagination: {
                page,
                limit,
                total: total || 0,
                hasMore: (page * limit) < total
            }
        });

    } catch (error: any) {
        console.error('Erro ao buscar produtos:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor', details: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}