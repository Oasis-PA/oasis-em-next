import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('📥 Dados recebidos:', body); // Debug

    const { nome } = body;

    if (!nome || !nome.trim()) {
      return NextResponse.json(
        { message: 'O nome da tag é obrigatório.' },
        { status: 400 }
      );
    }

    const nomeNormalizado = nome.trim().toLowerCase();
    console.log('🔍 Verificando se tag existe:', nomeNormalizado); // Debug

    // Verifica se a tag já existe
    const tagExistente = await prisma.tag.findUnique({
      where: { nome: nomeNormalizado }
    });

    if (tagExistente) {
      console.log('⚠️ Tag já existe:', tagExistente); // Debug
      return NextResponse.json(
        { message: 'Esta tag já existe.' },
        { status: 409 }
      );
    }

    console.log('✅ Criando nova tag...'); // Debug
    
    // Cria a tag no banco
    const novaTag = await prisma.tag.create({
      data: {
        nome: nomeNormalizado,
      },
    });

    console.log('🎉 Tag criada com sucesso:', novaTag); // Debug

    return NextResponse.json({
      message: 'Tag cadastrada com sucesso!',
      tag: novaTag,
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Erro detalhado ao cadastrar tag:', error);
    
    // Retorna mais detalhes do erro em desenvolvimento
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor ao tentar cadastrar a tag.',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}