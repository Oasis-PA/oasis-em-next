import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Apenas para testar: contar registros na tabela Usuario
    const count = await prisma.usuario.count();
    console.log(`✅ Conexão bem-sucedida! Usuários cadastrados: ${count}`);
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
