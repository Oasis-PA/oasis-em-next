/**
 * Script para criar usuário de teste no banco de dados
 * Este usuário é usado pelos testes E2E do Cypress
 *
 * ⚠️ IMPORTANTE: Este script cria dados de teste APENAS para teste
 * Os dados NÃO são persistidos após os testes
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const TEST_USER = {
  nome: 'Cypress Test User',
  email: 'cypress@test.com',
  senha: 'Senha123!@#', // Senha em texto plano para os testes
  id_genero: 1, // Ajuste conforme necessário
};

export async function seedTestUser() {
  try {
    // Hash da senha
    const senhaHash = await bcrypt.hash(TEST_USER.senha, 10);

    // Verifica se o usuário já existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email: TEST_USER.email },
    });

    if (existingUser) {
      console.log('ℹ️  Usuário de teste já existe:', TEST_USER.email);
      console.log('💡 Dica: Execute "npm run test:seed:clean" para remover dados de teste');
    } else {
      // Cria novo usuário apenas para os testes
      await prisma.usuario.create({
        data: {
          nome: TEST_USER.nome,
          email: TEST_USER.email,
          senha: senhaHash,
          id_genero: TEST_USER.id_genero,
        },
      });
      console.log('✅ Usuário de teste criado:', TEST_USER.email);
      console.log('💡 Dica: Execute "npm run test:seed:clean" para remover após os testes');
    }
  } catch (error) {
    console.error('❌ Erro ao criar usuário de teste:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function cleanupTestUser() {
  try {
    const deleted = await prisma.usuario.deleteMany({
      where: { email: TEST_USER.email },
    });

    if (deleted.count > 0) {
      console.log(`✅ ${deleted.count} usuário(s) de teste removido(s)`);
    } else {
      console.log('ℹ️  Nenhum usuário de teste encontrado para remover');
    }
  } catch (error) {
    console.error('❌ Erro ao remover usuário de teste:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executa se chamado diretamente
const command = process.argv[2];

if (command === 'clean') {
  cleanupTestUser()
    .then(() => {
      console.log('✅ Limpeza concluída com sucesso');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erro na limpeza:', error);
      process.exit(1);
    });
} else if (!command || command === 'seed') {
  seedTestUser()
    .then(() => {
      console.log('✅ Seed concluído com sucesso');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erro no seed:', error);
      process.exit(1);
    });
}
