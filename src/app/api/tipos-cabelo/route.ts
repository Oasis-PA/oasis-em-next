// Rota: /api/tipos-cabelo
// Tabela Supabase: public.TipoCabelo (Liso, Crespo, etc.)

import { createClient } from '@supabase/supabase-js'; 
import { NextResponse } from 'next/server';

// 🚨 SUBSTITUA PELAS SUAS VARIÁVEIS DE AMBIENTE REAIS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    const { data, error } = await supabase
        .from('TipoCabelo') 
        .select('id_tipo_cabelo, nome'); // Colunas da sua tabela TipoCabelo

    if (error) {
        console.error('Erro ao buscar Tipos de Cabelo:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
    return NextResponse.json(data);
}