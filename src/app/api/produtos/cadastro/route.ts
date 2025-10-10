// app/api/produtos/cadastro/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client'; 

// -----------------------------------------------------
// 1. INTERFACES PARA GARANTIR A TIPAGEM CORRETA DO PAYLOAD
// -----------------------------------------------------
interface CadastroPayload {
    nome: string;
    descricao?: string;
    marca: string;
    preco: string;
    id_categoria: string;
    id_tag?: string;
    id_tipo_cabelo?: string;
    id_tipo_pele?: string;
    
    // Imagem Única
    url_imagem: string; 

    // Ofertas de Lojas (3 conjuntos)
    nome_loja_1?: string;
    preco_loja_1?: string;
    url_loja_1?: string;

    nome_loja_2?: string;
    preco_loja_2?: string;
    url_loja_2?: string;

    nome_loja_3?: string;
    preco_loja_3?: string;
    url_loja_3?: string;
}

// -----------------------------------------------------
// 2. FUNÇÃO AUXILIAR PARA PROCESSAR OFERTAS DE LOJAS
// -----------------------------------------------------
// Usando Prisma.TransactionClient para garantir o acesso correto aos modelos
async function processarOfertas(
  produtoId: number, 
  ofertas: { nome?: string; preco?: string; url?: string }[],
  tx: Prisma.TransactionClient 
) {
  const operacoesLinkLoja = [];

  for (const oferta of ofertas) {
    if (oferta.nome && oferta.preco && oferta.url) {
      
      // 1. Tenta encontrar a loja existente pelo nome
      // ✅ CORRIGIDO: tx.loja (camelCase)
      let loja = await tx.loja.findUnique({
        where: { nome: oferta.nome },
      });

      // 2. Se a loja não existir, cria uma nova
      if (!loja) {
        // ✅ CORRIGIDO: tx.loja (camelCase)
        loja = await tx.loja.create({
          data: {
            nome: oferta.nome,
          },
        });
      }

      // 3. Cria a operação para salvar o LinkLoja
      operacoesLinkLoja.push(
        // ✅ CORRIGIDO: tx.linkLoja (camelCase)
        tx.linkLoja.create({
          data: {
            id_produto: produtoId,
            id_loja: loja.id_loja,
            preco: parseFloat(oferta.preco),
            url_compra: oferta.url,
          },
        })
      );
    }
  }
  return operacoesLinkLoja;
}

// -----------------------------------------------------
// 3. FUNÇÃO PRINCIPAL POST
// -----------------------------------------------------

export async function POST(request: Request) {
  try {
    const payload: CadastroPayload = await request.json();
    
    // 1. Validação Mínima
    if (!payload.nome || !payload.marca || !payload.preco || !payload.id_categoria || !payload.url_imagem) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando (Nome, Marca, Preço, Categoria, Imagem URL).' },
        { status: 400 }
      );
    }
    
    const {
      nome,
      marca,
      descricao,
      preco,
      id_categoria,
      id_tag,
      id_tipo_cabelo,
      id_tipo_pele,
      url_imagem, 
      ...ofertasData 
    } = payload;

    const ofertas = [
      { nome: ofertasData.nome_loja_1, preco: ofertasData.preco_loja_1, url: ofertasData.url_loja_1 },
      { nome: ofertasData.nome_loja_2, preco: ofertasData.preco_loja_2, url: ofertasData.url_loja_2 },
      { nome: ofertasData.nome_loja_3, preco: ofertasData.preco_loja_3, url: ofertasData.url_loja_3 },
    ];
    
    // --- TRANSAÇÃO PRISMA ---
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        
        // 1. Cria o Produto Principal
        // ✅ CORRIGIDO: tx.produto (camelCase)
        const novoProduto = await tx.produto.create({
            data: {
                nome,
                marca,
                preco: parseFloat(preco),
                descricao,
                id_categoria: parseInt(id_categoria),
                url_imagem, 
                
                id_tag: id_tag ? parseInt(id_tag) : undefined,
                id_tipo_cabelo: id_tipo_cabelo ? parseInt(id_tipo_cabelo) : undefined,
                id_tipo_pele: id_tipo_pele ? parseInt(id_tipo_pele) : undefined,
            },
        });

        const produtoId = novoProduto.id_produto;

        // 2. Processa e cria os Links de Loja
        const operacoesLinks = await processarOfertas(produtoId, ofertas, tx);
        await Promise.all(operacoesLinks);

        return novoProduto;
    });

    return NextResponse.json(
      { message: 'Produto e ofertas cadastrados com sucesso!', produto: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro detalhado no cadastro:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar produto.', error: String(error) },
      { status: 500 }
    );
  }
}