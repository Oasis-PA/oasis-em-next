import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { protectAdminRoute } from '@/lib/verify-admin-token';

// GET - Buscar corte por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verifica autenticação admin
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    const corte = await prisma.corte.findUnique({
      where: { id: parseInt(id) },
    });

    if (!corte) {
      return NextResponse.json(
        { error: 'Corte não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(corte);
  } catch (error) {
    console.error('Erro ao buscar corte:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar corte' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar corte
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verifica autenticação admin
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const data = await request.json();

    // Verifica se o corte existe
    const corteExiste = await prisma.corte.findUnique({
      where: { id: parseInt(id) }
    });

    if (!corteExiste) {
      return NextResponse.json(
        { error: 'Corte não encontrado' },
        { status: 404 }
      );
    }

    const corte = await prisma.corte.update({
      where: { id: parseInt(id) },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        historia: data.historia || null,
        comoFazer: data.comoFazer || null,
        rostoCompativel: data.rostoCompativel || null,
        comoArrumar: data.comoArrumar || null,
        imagemPrincipal: data.imagemPrincipal || null,
        status: data.status,
      },
    });

    return NextResponse.json(corte);
  } catch (error) {
    console.error('Erro ao atualizar corte:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar corte' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir corte
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verifica autenticação admin
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    await prisma.corte.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Corte excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir corte:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir corte' },
      { status: 500 }
    );
  }
}