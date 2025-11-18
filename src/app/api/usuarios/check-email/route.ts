// app/api/usuarios/check-email/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";
import { checkEmailSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validação com Zod
    const { email } = checkEmailSchema.parse(body);

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

  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Dados inválidos",
          errors: error.errors.map(err => ({
            campo: err.path.join('.'),
            mensagem: err.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Erro no servidor." }, { status: 500 });
  }
}