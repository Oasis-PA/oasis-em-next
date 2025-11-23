// 📁 src/app/api/ibge/cidades/[sigla]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { sigla: string } }
) {
  try {
    const { sigla } = params;

    if (!sigla || sigla.length !== 2) {
      return NextResponse.json(
        { error: 'Sigla do estado inválida' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla.toUpperCase()}/municipios?orderBy=nome`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 86400 } // Cache por 24 horas
      }
    );

    if (!response.ok) {
      throw new Error(`IBGE API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      }
    });

  } catch (error: any) {
    console.error('Erro ao buscar cidades:', error);
    
    return NextResponse.json(
      { error: 'Não foi possível carregar as cidades' },
      { status: 500 }
    );
  }
}