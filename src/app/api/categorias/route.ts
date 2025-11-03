// Rota: /api/categorias
// Tabela Supabase: public.Categoria (para filtros Cabelo/Pele, se precisar)

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cachedQuery } from '@/lib/cache';

export async function GET() {
    try {
        // Cache por 1 hora (dados estáticos)
        const data = await cachedQuery(
            'categorias:all',
            async () => {
                const { data, error } = await supabaseAdmin
                    .from('Categoria')
                    .select('id_categoria, nome');

                if (error) throw error;
                return data;
            },
            60 // 1 hora
        );

        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar Categorias:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}