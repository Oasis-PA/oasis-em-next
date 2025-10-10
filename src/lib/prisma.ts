// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Adiciona parâmetro para desabilitar prepared statements em desenvolvimento
const getDatabaseUrl = () => {
  const baseUrl = process.env.DATABASE_URL;

  if (!baseUrl) {
    console.warn('DATABASE_URL não está definida');
    return undefined;
  }

  if (process.env.NODE_ENV === "development") {
    try {
      const url = new URL(baseUrl);
      url.searchParams.set('pgbouncer', 'true');
      url.searchParams.set('connect_timeout', '10');
      return url.toString();
    } catch (error) {
      console.error('Erro ao processar DATABASE_URL:', error);
      return baseUrl;
    }
  }

  return baseUrl;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    errorFormat: "pretty",
    datasourceUrl: getDatabaseUrl(),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

