// file: app/api/marcas/route.ts

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Configuração do Supabase (use as suas variáveis de ambiente)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    try {
        // Chama a função que criamos no Supabase
        const { data, error } = await supabase.rpc('get_distinct_marcas');

        if (error) {
            console.error('Erro ao buscar marcas:', error);
            return NextResponse.json({ error: 'Erro ao buscar marcas' }, { status: 500 });
        }

        // O formato da resposta já será [{ nome: 'MARCA 1' }, { nome: 'MARCA 2' }]
        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro inesperado:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}