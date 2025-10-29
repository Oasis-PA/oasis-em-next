import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação dos campos obrigatórios
    const {
      nome_contato,
      email,
      telefone,
      estado,
      cidade,
      perfil_principal,
      numero_seguidores,
      proposta
    } = body;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!nome_contato || !email || !telefone || !estado || !cidade || 
        !perfil_principal || !numero_seguidores || !proposta) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      );
    }

    // Limpar telefone (remover caracteres não numéricos)
    const telefoneNumerico = telefone.replace(/\D/g, '');
    
    if (telefoneNumerico.length < 10 || telefoneNumerico.length > 11) {
      return NextResponse.json(
        { error: 'Telefone inválido. Use o formato: XX XXXXX-XXXX' },
        { status: 400 }
      );
    }

    // Criar registro no banco de dados
    const novaParceiraInfluenciador = await prisma.influenciadores.create({
      data: {
        nome_contato,
        email: email.toLowerCase().trim(),
        telefone: parseFloat(telefoneNumerico),
        estado: estado.toUpperCase(),
        cidade,
        perfil_principal,
        numero_seguidores,
        proposta,
        status: 'pendente'
      }
    });

    // Opcional: Enviar email de notificação para o time de marketing
    // await enviarEmailNotificacao(novaParceiraInfluenciador);

    return NextResponse.json(
      {
        success: true,
        message: 'Proposta enviada com sucesso! Nossa equipe entrará em contato em breve.',
        data: {
          id: novaParceiraInfluenciador.id,
          status: novaParceiraInfluenciador.status
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Erro ao processar solicitação:', error);

    // Verificar se é erro de email duplicado
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json(
        { error: 'Este email já foi cadastrado. Use outro email ou entre em contato conosco.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação. Tente novamente mais tarde.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Endpoint GET para listar (opcional - apenas para admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const influenciadores = await prisma.influenciadores.findMany({
      where: status ? { status } : {},
      orderBy: {
        data_solicitacao: 'desc'
      },
      take: 50 // Limitar resultados
    });

    return NextResponse.json({
      success: true,
      data: influenciadores
    });

  } catch (error) {
    console.error('Erro ao buscar influenciadores:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}