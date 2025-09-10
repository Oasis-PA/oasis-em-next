// ==========================================
// ARQUIVO: jest.config.js (na raiz do projeto)
// SUBSTITUA O CONTEÚDO ATUAL POR ESTE:
// ==========================================

module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/tests/**/*.test.ts'
  ],
  collectCoverageFrom: [
    'app/api/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**'
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testTimeout: 30000, // 30 segundos para operações de banco
  verbose: true
};

// ==========================================
// ARQUIVO: tests/setup.ts
// SUBSTITUA O CONTEÚDO ATUAL POR ESTE:
// ==========================================

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
      await prisma.$executeRawUnsafe(`DELETE FROM "${table}";`);
      await prisma.$executeRawUnsafe(`ALTER SEQUENCE "${table.toLowerCase()}_id_${table.toLowerCase()}_seq" RESTART WITH 1;`);
    } catch (error) {
      // Ignorar erros de tabelas que não existem ou sequences
      console.warn(`Aviso ao limpar ${table}:`, error);
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

// ==========================================
// ARQUIVO: .env.test (na raiz do projeto)
// CRIE ESTE ARQUIVO COM SUAS CREDENCIAIS:
// ==========================================

DATABASE_URL_TEST="postgresql://postgres.yyvjzgxyxgalnnwcjfqh:capenga@aws-1-sa-east-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_SUPABASE_URL_TEST="https://yyvjzgxyxgalnnwcjfqh.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5dmp6Z3h5eGdhbG5ud2NqZnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NjE5NjcsImV4cCI6MjA3MjQzNzk2N30.9YCwdSLGGjUGT3slSaqV8nhnTj7Vewz_m2Db9w3F_ro"
NODE_ENV=test

// ==========================================
// ATUALIZE SEU package.json:
// ADICIONE ESTES SCRIPTS NA SEÇÃO "scripts":
// ==========================================


// ==========================================
// COMANDOS PARA EXECUTAR APÓS CRIAR OS ARQUIVOS:
// ==========================================

