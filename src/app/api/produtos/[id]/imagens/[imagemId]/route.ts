// src/app/api/produtos/[id]/imagens/[imagemId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabaseAdmin } from '@/lib/supabase';
import { SignJWT, jwtVerify } from "jose";
import { z } from 'zod';

const atualizarImagemSchema = z.object({
  ordem: z.number().int().min(0),
});

// PATCH - Atualizar ordem da imagem (requer autenticação admin)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string; imagemId: string }> }
) {
  try {
    const { id, imagemId } = await context.params;
    const id_produto = parseInt(id);
    const id_imagem_produto = parseInt(imagemId);

    if (isNaN(id_produto) || isNaN(id_imagem_produto)) {
      return NextResponse.json(
        { error: 'IDs inválidos' },
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

    // 2. Verificar se a imagem existe e pertence ao produto
    const imagem = await prisma.imagemProduto.findUnique({
      where: { id_imagem_produto },
    });

    if (!imagem) {
      return NextResponse.json(
        { error: 'Imagem não encontrada' },
        { status: 404 }
      );
    }

    if (imagem.id_produto !== id_produto) {
      return NextResponse.json(
        { error: 'Imagem não pertence a este produto' },
        { status: 400 }
      );
    }

    // 3. Validar dados
    const body = await request.json();
    const { ordem } = atualizarImagemSchema.parse(body);

    // 4. Atualizar ordem
    const imagemAtualizada = await prisma.imagemProduto.update({
      where: { id_imagem_produto },
      data: { ordem },
    });

    return NextResponse.json({
      message: 'Ordem da imagem atualizada com sucesso',
      imagem: imagemAtualizada,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Erro ao atualizar imagem:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar imagem' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar imagem do produto (requer autenticação admin)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string; imagemId: string }> }
) {
  try {
    const { id, imagemId } = await context.params;
    const id_produto = parseInt(id);
    const id_imagem_produto = parseInt(imagemId);

    if (isNaN(id_produto) || isNaN(id_imagem_produto)) {
      return NextResponse.json(
        { error: 'IDs inválidos' },
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

    // 2. Verificar se a imagem existe e pertence ao produto
    const imagem = await prisma.imagemProduto.findUnique({
      where: { id_imagem_produto },
    });

    if (!imagem) {
      return NextResponse.json(
        { error: 'Imagem não encontrada' },
        { status: 404 }
      );
    }

    if (imagem.id_produto !== id_produto) {
      return NextResponse.json(
        { error: 'Imagem não pertence a este produto' },
        { status: 400 }
      );
    }

    // 3. Deletar do Supabase Storage
    try {
      const urlObj = new URL(imagem.url_imagem);
      const pathParts = urlObj.pathname.split('/');
      const bucketIndex = pathParts.findIndex(
        (part) => part === 'perfil-fotos' || part === 'produtos-imagens'
      );

      if (bucketIndex !== -1) {
        const filePath = pathParts.slice(bucketIndex + 1).join('/');
        const bucketName = pathParts[bucketIndex];
        await supabaseAdmin.storage.from(bucketName).remove([filePath]);
      }
    } catch (err) {
      console.warn('Erro ao deletar imagem do storage:', err);
      // Continua mesmo se falhar, para não bloquear a exclusão do DB
    }

    // 4. Deletar do banco de dados
    await prisma.imagemProduto.delete({
      where: { id_imagem_produto },
    });

    return NextResponse.json({
      message: 'Imagem deletada com sucesso',
    });
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar imagem' },
      { status: 500 }
    );
  }
}
