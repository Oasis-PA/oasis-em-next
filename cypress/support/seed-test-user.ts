/**
 * Script para criar usuário de teste no banco de dados
 * Este usuário é usado pelos testes E2E do Cypress
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
    // Verifica se o usuário já existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email: TEST_USER.email },
    });

    // Hash da senha
    const senhaHash = await bcrypt.hash(TEST_USER.senha, 10);

    if (existingUser) {
      // Atualiza o usuário existente
      await prisma.usuario.update({
        where: { email: TEST_USER.email },
        data: {
          nome: TEST_USER.nome,
          senha: senhaHash,
        },
      });
      console.log('✅ Usuário de teste atualizado:', TEST_USER.email);
    } else {
      // Cria novo usuário
      await prisma.usuario.create({
        data: {
          nome: TEST_USER.nome,
          email: TEST_USER.email,
          senha: senhaHash,
          id_genero: TEST_USER.id_genero,
        },
      });
      console.log('✅ Usuário de teste criado:', TEST_USER.email);
    }
  } catch (error) {
    console.error('❌ Erro ao criar usuário de teste:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executa se chamado diretamente
seedTestUser()
  .then(() => {
    console.log('✅ Seed concluído com sucesso');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  });
