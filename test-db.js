import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error'],
});

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Conexão com banco de dados OK');

    // Testa uma query simples
    const count = await prisma.usuario.count();
    console.log(`📊 Total de usuários: ${count}`);

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao conectar:', error.message);
    console.error('Detalhes:', error);
    process.exit(1);
  }
}

testConnection();
