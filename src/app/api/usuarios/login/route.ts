// app/api/usuarios/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, senha } = body;

    if (!email || !senha) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // Verificação simples de senha (você deve implementar bcrypt)
    const senhaCorreta = senha === usuario.senha;

    if (!senhaCorreta) {
      return NextResponse.json(
        { message: "Senha incorreta." },
        { status: 401 }
      );
    }

    // Aqui você pode gerar JWT ou sessão (NextAuth)
    return NextResponse.json(
      { message: "Login realizado com sucesso!", usuario },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "Erro no servidor." },
      { status: 500 }
    );
  }
}