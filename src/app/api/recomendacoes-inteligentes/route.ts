// file: app/api/recomendacoes-inteligentes/route.ts
// Sistema completo de recomendação baseado em questionário + visualizações

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ProdutoRecomendado {
  id_produto: number;
  nome: string;
  marca: string;
  url_loja: string | null;
  url_imagem: string | null;
  tag_principal: string;
  tags: string[];
  score: number;
  motivos: string[];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('id_usuario');
  const limit = parseInt(searchParams.get('limit') || '8');

  if (!userId) {
    return NextResponse.json(
      { error: 'ID do usuário é obrigatório' },
      { status: 400 }
    );
  }

  try {
    const id_usuario = parseInt(userId);

    // 1. BUSCAR USUÁRIO E QUESTIONÁRIOS
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario },
      include: {
        tipo_cabelo: true,
        QuestionarioResposta: {
          include: {
            Questionario: true
          }
        }
      }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // 2. EXTRAIR TAGS RECOMENDADAS DO QUESTIONÁRIO
    const tagsRecomendadas = new Map<number, number>(); // id_tag -> peso total
    const respostasUsuario: Record<string, string> = {};

    for (const resp of usuario.QuestionarioResposta) {
      const respostas = resp.respostas as any;
      
      // Extrair todos os campos respondidos
      Object.entries(respostas).forEach(([campo, valor]) => {
        if (valor && typeof valor === 'string') {
          respostasUsuario[campo] = valor.toLowerCase();
        }
      });
    }

    // Buscar mapeamento de tags baseado nas respostas
    for (const [campo, valor] of Object.entries(respostasUsuario)) {
      const mapeamentos = await prisma.questionarioTagMap.findMany({
        where: {
          campo_bd: campo,
          valor_resposta: valor
        }
      });

      mapeamentos.forEach(map => {
        const pesoAtual = tagsRecomendadas.get(map.id_tag) || 0;
        tagsRecomendadas.set(map.id_tag, pesoAtual + (map.peso || 10));
      });
    }

    // 3. BUSCAR PRODUTOS COM AS TAGS RECOMENDADAS
    const idsTagsRecomendadas = Array.from(tagsRecomendadas.keys());

    if (idsTagsRecomendadas.length === 0) {
      // Fallback: recomendar produtos gerais
      const produtosGerais = await prisma.produto.findMany({
        take: limit,
        include: {
          ProdutoTag: {
            include: { Tag: true },
            where: { principal: true }
          }
        },
        orderBy: { data_cadastro: 'desc' }
      });

      const recomendacoesGerais = produtosGerais.map(p => ({
        id_produto: p.id_produto,
        nome: p.nome,
        marca: p.marca,
        url_loja: p.url_loja,
        url_imagem: p.url_imagem,
        tag_principal: p.ProdutoTag?.[0]?.Tag.nome || 'Geral',
        tags: [],
        score: 10,
        motivos: ['Produto popular']
      }));

      return NextResponse.json({
        recomendacoes: recomendacoesGerais,
        baseado_em: 'produtos_populares',
        respostas_analisadas: {}
      });
    }

    // Buscar produtos que têm PELO MENOS UMA das tags recomendadas
    const produtosCandidatos = await prisma.produto.findMany({
      where: {
        ProdutoTag: {
          some: {
            id_tag: { in: idsTagsRecomendadas }
          }
        }
      },
      include: {
        ProdutoTag: {
          include: { Tag: true }
        },
        tipo_cabelo: true,
        categoria: true
      }
    });

    // 4. CALCULAR SCORE DE CADA PRODUTO
    const produtosComScore: ProdutoRecomendado[] = produtosCandidatos.map(produto => {
      let score = 0;
      const motivos: string[] = [];
      const tagsEncontradas: string[] = [];

      // Calcular score baseado nas tags do produto
      produto.ProdutoTag?.forEach(pt => {
        const pesoTag = tagsRecomendadas.get(pt.id_tag);
        if (pesoTag) {
          score += pesoTag;
          tagsEncontradas.push(pt.Tag.nome);
        }
      });

      // Adicionar motivos baseados nas respostas
      if (respostasUsuario.estado_cabelo) {
        const estado = respostasUsuario.estado_cabelo;
        if (estado === 'ralo' && tagsEncontradas.some(t => 
          t.toLowerCase().includes('volume') || 
          t.toLowerCase().includes('ralo')
        )) {
          motivos.push('Ideal para cabelo ralo');
        }
        if (estado === 'ressecado' && tagsEncontradas.some(t => 
          t.toLowerCase().includes('hidrata')
        )) {
          motivos.push('Hidrata profundamente');
        }
        if (estado === 'danificado' && tagsEncontradas.some(t => 
          t.toLowerCase().includes('reconstru')
        )) {
          motivos.push('Reconstrói fios danificados');
        }
      }

      if (respostasUsuario.tipo_cabelo) {
        const tipoCabelo = respostasUsuario.tipo_cabelo;
        if (tagsEncontradas.some(t => t.toLowerCase().includes(tipoCabelo))) {
          motivos.push(`Especial para cabelo ${tipoCabelo}`);
        }
      }

      if (motivos.length === 0) {
        motivos.push('Recomendado para seu perfil');
      }

      const tagPrincipal = produto.ProdutoTag?.find(pt => pt.principal);

      return {
        id_produto: produto.id_produto,
        nome: produto.nome,
        marca: produto.marca,
        url_loja: produto.url_loja,
        url_imagem: produto.url_imagem,
        tag_principal: tagPrincipal?.Tag.nome || 'Produto',
        tags: produto.ProdutoTag?.map(pt => pt.Tag.nome) || [],
        score,
        motivos
      };
    });

    // 5. ORDENAR E LIMITAR
    const recomendacoes = produtosComScore
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // 6. ESTATÍSTICAS
    const tagsTop = await prisma.tag.findMany({
      where: { id_tag: { in: Array.from(tagsRecomendadas.keys()).slice(0, 5) } },
      select: { nome: true }
    });

    return NextResponse.json({
      recomendacoes,
      baseado_em: 'questionario',
      respostas_analisadas: respostasUsuario,
      tags_priorizadas: tagsTop.map(t => t.nome),
      total_candidatos: produtosCandidatos.length
    });

  } catch (error: any) {
    console.error('Erro ao gerar recomendações:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar recomendações', details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}