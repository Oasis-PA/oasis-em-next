// file: app/api/produtos/route.ts - CÓDIGO ATUALIZADO

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
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
        // Construir filtros
        const where: any = {};

        if (tagId) where.id_tag = parseInt(tagId);
        if (categoriaId) where.id_categoria = parseInt(categoriaId);
        if (cabeloId) where.id_tipo_cabelo = parseInt(cabeloId);
        if (peleId) where.id_tipo_pele = parseInt(peleId);
        if (marca) where.marca = marca;

        // Paginação
        const from = (page - 1) * limit;

        // Buscar total
        const total = await prisma.produto.count({ where });

        // Buscar produtos
        const produtos = await prisma.produto.findMany({
            where,
            select: {
                id_produto: true,
                nome: true,
                url_loja: true,
                url_imagem: true,
                id_tag: true,
                tag: {
                    select: { nome: true }
                }
            },
            skip: from,
            take: limit,
            orderBy: { id_produto: 'desc' }
        });

        const formattedProducts = produtos.map((p: any) => ({
            id_produto: p.id_produto,
            nome: p.nome,
            url_loja: p.url_loja,
            url_imagem: p.url_imagem || null,
            tag_principal: p.tag?.nome || 'Geral',
            id_tag: p.id_tag
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