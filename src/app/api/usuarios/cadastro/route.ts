// app/api/usuarios/cadastro/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { nome, email, senha } = await req.json();

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Verifica se o email já existe
    const usuarioExistente = await prisma.usuario.findUnique({ 
      where: { email } 
    });
    
    if (usuarioExistente) {
      return NextResponse.json(
        { message: "Já existe um usuário com este email." },
        { status: 400 }
      );
    }

    // Cria o usuário no banco
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        id_genero: 1, // default temporário
      },
    });

    return NextResponse.json({ 
      message: "Conta criada com sucesso!", 
      usuario: novoUsuario 
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json({ message: "Erro no servidor." }, { status: 500 });
  }
}