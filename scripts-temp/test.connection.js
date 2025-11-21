import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔄 Tentando conectar ao Supabase...');
    
    // Testa a conexão
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Conexão bem-sucedida!', result);
    
    // Tenta contar usuários
    const count = await prisma.usuario.count();
    console.log(`📊 Total de usuários: ${count}`);
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.error('📋 Detalhes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();