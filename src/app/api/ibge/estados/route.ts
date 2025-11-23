// 📁 src/app/api/ibge/estados/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
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
    console.error('Erro ao buscar estados:', error);

    // Retornar lista estática em caso de falha
    const estadosStaticos = [
      { id: 12, sigla: 'AC', nome: 'Acre' },
      { id: 27, sigla: 'AL', nome: 'Alagoas' },
      { id: 16, sigla: 'AP', nome: 'Amapá' },
      { id: 13, sigla: 'AM', nome: 'Amazonas' },
      { id: 29, sigla: 'BA', nome: 'Bahia' },
      { id: 23, sigla: 'CE', nome: 'Ceará' },
      { id: 53, sigla: 'DF', nome: 'Distrito Federal' },
      { id: 32, sigla: 'ES', nome: 'Espírito Santo' },
      { id: 52, sigla: 'GO', nome: 'Goiás' },
      { id: 21, sigla: 'MA', nome: 'Maranhão' },
      { id: 51, sigla: 'MT', nome: 'Mato Grosso' },
      { id: 50, sigla: 'MS', nome: 'Mato Grosso do Sul' },
      { id: 31, sigla: 'MG', nome: 'Minas Gerais' },
      { id: 15, sigla: 'PA', nome: 'Pará' },
      { id: 25, sigla: 'PB', nome: 'Paraíba' },
      { id: 41, sigla: 'PR', nome: 'Paraná' },
      { id: 26, sigla: 'PE', nome: 'Pernambuco' },
      { id: 22, sigla: 'PI', nome: 'Piauí' },
      { id: 33, sigla: 'RJ', nome: 'Rio de Janeiro' },
      { id: 24, sigla: 'RN', nome: 'Rio Grande do Norte' },
      { id: 43, sigla: 'RS', nome: 'Rio Grande do Sul' },
      { id: 11, sigla: 'RO', nome: 'Rondônia' },
      { id: 14, sigla: 'RR', nome: 'Roraima' },
      { id: 42, sigla: 'SC', nome: 'Santa Catarina' },
      { id: 35, sigla: 'SP', nome: 'São Paulo' },
      { id: 28, sigla: 'SE', nome: 'Sergipe' },
      { id: 17, sigla: 'TO', nome: 'Tocantins' }
    ];

    return NextResponse.json(estadosStaticos, { status: 200 });
  }
}

