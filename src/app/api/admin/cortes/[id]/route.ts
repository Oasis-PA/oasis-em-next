import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { protectAdminRoute } from '@/lib/verify-admin-token';

// GET - Buscar corte por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    const corte = await prisma.cortes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!corte) {
      return NextResponse.json(
        { error: 'Corte não encontrado' },
        { status: 404 }
      );
    }

    // Mapear campos snake_case para camelCase para o frontend
    const corteFormatado = {
      id: corte.id,
      nome: corte.nome,
      slug: corte.slug,
      descricao: corte.descricao,
      historia: corte.historia,
      comoFazer: corte.como_fazer,
      rostoCompativel: corte.rosto_compativel,
      comoArrumar: corte.como_arrumar,
      imagemPrincipal: corte.imagem_principal,
      status: corte.status,
      criadoEm: corte.criadoEm,
      atualizadoEm: corte.atualizadoEm,
    };

    return NextResponse.json(corteFormatado);
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
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const data = await request.json();

    // Verifica se o corte existe
    const corteExiste = await prisma.cortes.findUnique({
      where: { id: parseInt(id) }
    });

    if (!corteExiste) {
      return NextResponse.json(
        { error: 'Corte não encontrado' },
        { status: 404 }
      );
    }

    const corte = await prisma.cortes.update({
      where: { id: parseInt(id) },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        historia: data.historia || null,
        como_fazer: data.comoFazer || null,
        rosto_compativel: data.rostoCompativel || null,
        como_arrumar: data.comoArrumar || null,
        imagem_principal: data.imagemPrincipal || null,
        status: data.status,
        atualizadoEm: new Date(),
      },
    });

    // Retornar campos formatados para o frontend
    const corteFormatado = {
      id: corte.id,
      nome: corte.nome,
      slug: corte.slug,
      descricao: corte.descricao,
      historia: corte.historia,
      comoFazer: corte.como_fazer,
      rostoCompativel: corte.rosto_compativel,
      comoArrumar: corte.como_arrumar,
      imagemPrincipal: corte.imagem_principal,
      status: corte.status,
      
      criadoEm: corte.criadoEm,
      atualizadoEm: corte.atualizadoEm,
    };

    return NextResponse.json(corteFormatado);
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
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    await prisma.cortes.delete({
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