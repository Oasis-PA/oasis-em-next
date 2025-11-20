import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { protectAdminRoute } from '@/lib/verify-admin-token';

// GET - Listar todos os cortes
export async function GET(request: NextRequest) {
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status && status !== 'todos' ? { status } : {};

    const cortes = await prisma.cortes.findMany({
      where,
      orderBy: { criadoEm: 'desc' },
    });

    return NextResponse.json(cortes);
  } catch (error) {
    console.error('Erro ao buscar cortes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar cortes' },
      { status: 500 }
    );
  }
}

// POST - Criar novo corte
export async function POST(request: NextRequest) {
  const authError = await protectAdminRoute(request);
  if (authError) return authError;

  try {
    const data = await request.json();
    // normaliza possíveis nomes do campo vindos do client
    const incomingDate = data.dataPublicacao ?? data.data_publicacao ?? data.DataPublicacao ?? null;
    const parsedDate = incomingDate ? new Date(incomingDate) : null;

    // Gerar slug a partir do nome
    const slug = data.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Verifica se o slug já existe
    const slugExiste = await prisma.cortes.findUnique({
      where: { slug }
    });

    if (slugExiste) {
      return NextResponse.json(
        { error: 'Este slug já está sendo usado' },
        { status: 409 }
      );
    }

    const corte = await prisma.cortes.create({
      data: {
        nome: data.nome,
        slug,
        descricao: data.descricao,
        historia: data.historia || null,
        como_fazer: data.comoFazer || null,
        rosto_compativel: data.rostoCompativel || null,
        como_arrumar: data.comoArrumar || null,
        imagem_principal: data.imagemPrincipal || null,
        status: data.status || 'rascunho',
        // usar o campo aceito pelo Prisma Client (dataPublicacao)
        atualizadoEm: new Date(),
      },
    });

    return NextResponse.json(corte, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar corte:', error);
    return NextResponse.json(
      { error: 'Erro ao criar corte' },
      { status: 500 }
    );
  }
}