// app/api/usuarios/check-email/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email é obrigatório." },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuario) {
      return NextResponse.json(
        { message: "Já existe um usuário com este email." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Email disponível." }, { status: 200 });
  } catch (error) {
    console.error("Erro em check-email:", error);

    // Log detalhado do erro para debug
    if (error instanceof Error) {
      console.error("Mensagem:", error.message);
      console.error("Stack:", error.stack);
    }

    return NextResponse.json(
      {
        message: "Erro no servidor.",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}