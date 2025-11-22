// Rota: /api/admin/categorias-artigos
// Lista categorias existentes para uso nos artigos

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/categorias-artigos
 * Listar todas as categorias
 */
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nome: 'asc' },
      select: {
        id_categoria: true,
        nome: true,
        descricao: true
      }
    });

    return NextResponse.json(categorias);
  } catch (error: any) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/categorias-artigos
 * Criar nova categoria (requer autenticação admin)
 */
export async function POST(request: NextRequest) {
  try {
    // Validar autenticação admin
    const adminToken = request.cookies.get('admin-auth-token')?.value;
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Token de admin necessário.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nome, descricao } = body;

    // Validações
    if (!nome || typeof nome !== 'string') {
      return NextResponse.json(
        { error: 'Nome da categoria é obrigatório' },
        { status: 400 }
      );
    }

    const nomeTrimmed = nome.trim();
    if (nomeTrimmed.length < 2) {
      return NextResponse.json(
        { error: 'Nome deve ter pelo menos 2 caracteres' },
        { status: 400 }
      );
    }

    if (nomeTrimmed.length > 100) {
      return NextResponse.json(
        { error: 'Nome não pode ter mais de 100 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se já existe categoria com mesmo nome
    const categoriaExistente = await prisma.categoria.findUnique({
      where: { nome: nomeTrimmed }
    });

    if (categoriaExistente) {
      return NextResponse.json(
        { error: 'Já existe uma categoria com este nome' },
        { status: 409 }
      );
    }

    // Criar categoria
    const novaCategoria = await prisma.categoria.create({
      data: {
        nome: nomeTrimmed,
        descricao: descricao?.trim() || null
      }
    });

    return NextResponse.json(
      {
        message: 'Categoria criada com sucesso',
        categoria: novaCategoria
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao criar categoria' },
      { status: 500 }
    );
  }
}