// Rota: /api/tipos-cabelo
// Tabela Supabase: public.TipoCabelo (Liso, Crespo, etc.)

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cachedQuery } from '@/lib/cache';

export async function GET() {
    try {
        const data = await cachedQuery(
            'tipos-cabelo:all',
            async () => {
                const { data, error } = await supabaseAdmin
                    .from('TipoCabelo')
                    .select('id_tipo_cabelo, nome');

                if (error) throw error;
                return data;
            },
            60 // 1 hora
        );

        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar Tipos de Cabelo:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}