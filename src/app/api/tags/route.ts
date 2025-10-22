// Rota: /api/tags
// Tabela Supabase: public.Tag (para filtros de produto: condicionador, shampoo, etc.)

import { createClient } from '@supabase/supabase-js'; 
import { NextResponse } from 'next/server';

// 🚨 SUBSTITUA PELAS SUAS VARIÁVEIS DE AMBIENTE REAIS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    const { data, error } = await supabase
        .from('Tag') 
        .select('id_tag, nome'); // Colunas da sua tabela Tag

    if (error) {
        console.error('Erro ao buscar Tags:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
    // Retorna o formato esperado: [{ id_tag: 1, nome: 'condicionador' }, ...]
    return NextResponse.json(data);
}