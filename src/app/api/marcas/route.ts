// file: app/api/marcas/route.ts

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cachedQuery } from '@/lib/cache';

export async function GET() {
    try {
        const data = await cachedQuery(
            'marcas:all',
            async () => {
                const { data, error } = await supabaseAdmin.rpc('get_distinct_marcas');
                if (error) throw error;
                return data;
            },
            60 // 1 hora
        );

        // O formato da resposta já será [{ nome: 'MARCA 1' }, { nome: 'MARCA 2' }]
        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro inesperado:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}