#!/usr/bin/env node

import dotenv from 'dotenv';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: join(__dirname, '..', '.env') });

console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ Carregado' : '✗ Não encontrado');

if (!process.env.DATABASE_URL) {
  console.error('❌ Erro: DATABASE_URL não está definido');
  process.exit(1);
}

try {
  console.log('\n🚀 Executando: npx prisma migrate dev --skip-generate');
  const env = { ...process.env };
  console.log('DATABASE_URL para subprocess:', env.DATABASE_URL ? 'Definido' : 'Não definido');

  execSync('npx prisma migrate dev --skip-generate', {
    stdio: 'inherit',
    env: env,
    shell: true
  });
  console.log('\n✅ Migration concluída com sucesso!');
} catch (error) {
  console.error('\n❌ Erro durante migration');
  process.exit(1);
}
