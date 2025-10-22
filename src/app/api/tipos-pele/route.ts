// Rota: /api/tipos-pele
// Tabela Supabase: public.TipoPele (Assumindo que você tem esta tabela)

import { createClient } from '@supabase/supabase-js'; 
import { NextResponse } from 'next/server';

// 🚨 SUBSTITUA PELAS SUAS VARIÁVEIS DE AMBIENTE REAIS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    // OBS: Ajuste o nome da tabela (TipoPele) e o ID (id_tipo_pele) conforme seu DB!
    const { data, error } = await supabase
        .from('TipoPele') 
        .select('id_tipo_pele, nome'); 

    if (error) {
        console.error('Erro ao buscar Tipos de Pele:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
    return NextResponse.json(data);
}