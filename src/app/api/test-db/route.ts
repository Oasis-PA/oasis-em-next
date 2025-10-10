import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Tenta fazer uma query simples
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      message: "Conexão com banco de dados OK!",
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    });
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);

    return NextResponse.json({
      success: false,
      message: "Erro ao conectar no banco de dados",
      error: error instanceof Error ? error.message : String(error),
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    }, { status: 500 });
  }
}
