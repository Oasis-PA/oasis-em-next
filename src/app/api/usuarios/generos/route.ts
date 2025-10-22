import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const generos = await prisma.genero.findMany({
      select: {
        id_genero: true,
        nome: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });

    return NextResponse.json(generos);
  } catch (err) {
    console.error("Erro ao buscar gêneros:", err);
    return NextResponse.json(
      { error: "Erro ao buscar gêneros" }, 
      { status: 500 }
    );
  }
}