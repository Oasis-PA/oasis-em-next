// src/app/api/parcerias-empresas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      nome,
      email,
      telefone,
      empresaRepresentada,
      totalColaboradores,
      cargo,
      motivo
    } = body;

    // Validações básicas
    if (!nome || !email || !telefone || !empresaRepresentada || !totalColaboradores || !cargo || !motivo) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verifica se o email já existe
    const empresaExistente = await prisma.empresas.findUnique({
      where: { email_corporativo: email }
    });

    if (empresaExistente) {
      return NextResponse.json(
        { error: 'Este email corporativo já foi cadastrado' },
        { status: 409 }
      );
    }

    // Remove caracteres não numéricos do telefone
    const telefoneNumerico = telefone.replace(/\D/g, '');

    // Cria o registro no banco
    const novaEmpresa = await prisma.empresas.create({
      data: {
        nome_sobrenome: nome,
        email_corporativo: email,
        telefone: telefoneNumerico,
        empresa_representada: empresaRepresentada,
        total_colaboradores: parseInt(totalColaboradores),
        cargo: cargo,
        motivo_contato: motivo,
        data_solicitacao: new Date(),
        status: 'pendente' // Status inicial
      }
    });

    return NextResponse.json(
      {
        message: 'Solicitação enviada com sucesso! Entraremos em contato em breve.',
        id: novaEmpresa.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro ao criar solicitação de parceria:', error);
    
    return NextResponse.json(
      { error: 'Erro ao processar solicitação. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}