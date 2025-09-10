// tests/setup.ts - Setup atualizado para seu projeto
import { PrismaClient } from '@prisma/client';

declare global {
  var __PRISMA_TEST__: PrismaClient | undefined;
}

const prisma = globalThis.__PRISMA_TEST__ || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_TEST || process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__PRISMA_TEST__ = prisma;
}

export { prisma };

// Limpar dados de teste em ordem correta (respeitando foreign keys)
export async function cleanupTestData() {
  const tablesOrder = [
    'ProdutoTag',
    'Favorito', 
    'Avaliacao',
    'Produto',
    'Usuario',
    'Categoria',
    'Tag',
    'TipoCabelo',
    'Genero'
  ];
  
  for (const table of tablesOrder) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`);
    } catch (error) {
      console.warn(`Erro ao limpar tabela ${table}:`, error);
    }
  }
}

// Hook para limpar dados antes de cada teste
beforeEach(async () => {
  await cleanupTestData();
});

// Hook para desconectar após todos os testes
afterAll(async () => {
  await cleanupTestData();
  await prisma.$disconnect();
});

