// src/app/api/produtos/[id]/imagens/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabaseAdmin } from '@/lib/supabase';
import { SignJWT, jwtVerify } from "jose";
import { z } from 'zod';

// Schema de validação
const uploadImagemSchema = z.object({
  ordem: z.number().int().min(0).optional(),
});

// GET - Listar todas as imagens de um produto
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_produto = parseInt(id);

    if (isNaN(id_produto)) {
      return NextResponse.json(
        { error: 'ID de produto inválido' },
        { status: 400 }
      );
    }

    // Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id_produto },
    });

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Buscar imagens ordenadas
    const imagens = await prisma.imagemProduto.findMany({
      where: { id_produto },
      orderBy: [{ ordem: 'asc' }, { id_imagem_produto: 'asc' }],
    });

    return NextResponse.json({ imagens });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar imagens do produto' },
      { status: 500 }
    );
  }
}

// POST - Upload de nova imagem para o produto (requer autenticação admin)
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const id_produto = parseInt(id);

    if (isNaN(id_produto)) {
      return NextResponse.json(
        { error: 'ID de produto inválido' },
        { status: 400 }
      );
    }

    // 1. Validar autenticação admin
    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado' },
        { status: 401 }
      );
    }

    try {
      const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);
      await jwtVerify(adminToken, secret);
    } catch (error) {
      return NextResponse.json(
        { error: 'Token admin inválido' },
        { status: 401 }
      );
    }

    // 2. Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id_produto },
    });

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // 3. Processar o upload
    const formData = await request.formData();
    const file = formData.get('imagem') as File;
    const ordemStr = formData.get('ordem') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhuma imagem fornecida' },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Arquivo deve ser uma imagem' },
        { status: 400 }
      );
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Imagem muito grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    // Validar dimensões recomendadas (opcional, pode adicionar depois)
    // TODO: Validar dimensões mínimas/máximas usando sharp ou similar

    // 4. Upload para Supabase Storage
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const fileName = `produto_${id_produto}_${timestamp}.${extension}`;
    const filePath = `produtos/${id_produto}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabaseAdmin.storage
      .from('perfil-fotos') // TODO: Criar bucket específico 'produtos-imagens'
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: '31536000', // 1 ano
      });

    if (uploadError) {
      return NextResponse.json(
        { error: 'Erro ao fazer upload da imagem' },
        { status: 500 }
      );
    }

    // 5. Gera URL pública
    const { data: urlData } = supabaseAdmin.storage
      .from('perfil-fotos')
      .getPublicUrl(filePath);

    const url_imagem = urlData.publicUrl;

    // 6. Salvar no banco de dados
    const ordem = ordemStr ? parseInt(ordemStr) : null;

    const novaImagem = await prisma.imagemProduto.create({
      data: {
        id_produto,
        url_imagem,
        ordem,
      },
    });

    return NextResponse.json(
      {
        message: 'Imagem adicionada com sucesso',
        imagem: novaImagem,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao adicionar imagem ao produto' },
      { status: 500 }
    );
  }
}
