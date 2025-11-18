// Rota: /api/tags
// Tabela Supabase: public.Tag (para filtros de produto: condicionador, shampoo, etc.)

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cachedQuery } from '@/lib/cache';

export async function GET() {
    try {
        // Cache por 1 hora (dados estáticos)
        const data = await cachedQuery(
            'tags:all',
            async () => {
                const { data, error } = await supabaseAdmin
                    .from('Tag')
                    .select('id_tag, nome');

                if (error) throw error;
                return data;
            },
            60 // 1 hora
        );

        // Retorna o formato esperado: [{ id_tag: 1, nome: 'condicionador' }, ...]
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}