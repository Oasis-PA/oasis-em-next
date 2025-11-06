import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: '.env' });

console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ Definido' : '✗ Não definido');

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('\n🔗 Testando conexão com banco de dados...');

    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log('✅ Conexão bem-sucedida!');
    console.log('Hora do servidor:', result[0].current_time);

    const userCount = await prisma.usuario.count();
    console.log(`📊 Total de usuários: ${userCount}`);

    const categoriesCount = await prisma.categoria.count();
    console.log(`📊 Total de categorias: ${categoriesCount}`);

    console.log('\n✅ Banco de dados está operacional!');
  } catch (error) {
    console.error('❌ Erro ao conectar:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

test();
