import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, senha } = body;

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Verifica se já existe usuário com esse email
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { message: "Já existe um usuário com este email." },
        { status: 400 }
      );
    }

    // Criptografa a senha

    // Cria o usuário no banco
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        id_genero: 1, // ⚠️ ajustar depois para capturar da tela
      },
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso!", usuario: novoUsuario },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { message: "Erro no servidor." },
      { status: 500 }
    );
  }
}
