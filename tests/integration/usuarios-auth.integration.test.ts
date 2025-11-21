/**
 * Integration Tests: Usuários - Autenticação
 * Testa a API REAL + Banco de Dados
 *
 * NÃO testa Zod (Cypress faz isso)
 * NÃO testa validações óbvias
 * APENAS testa o fluxo real
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

describe('[INTEGRATION] Autenticação de Usuários', () => {
  const testEmail = `test-auth-${Date.now()}@test.com`;
  const testPassword = 'SenhaSegura123!';
  let testUserId: number;

  beforeAll(async () => {
    // Criar usuário de teste no banco
    const hashedPassword = await bcryptjs.hash(testPassword, 10);
    const user = await prisma.usuario.create({
      data: {
        email: testEmail,
        nome_usuario: 'Test User',
        senha: hashedPassword,
        telefone: '11999999999',
        dataAdesao: new Date(),
      },
    });
    testUserId = user.id_usuario;
  });

  afterAll(async () => {
    // Limpar dados de teste
    await prisma.usuario.delete({ where: { id_usuario: testUserId } });
    await prisma.$disconnect();
  });

  describe('POST /api/usuarios/login', () => {
    /**
     * ✅ TESTE REAL: API retorna token válido após login com credenciais corretas
     * Testa: API + Banco + Geração de JWT
     */
    it('deve fazer login e retornar token JWT válido', async () => {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          senha: testPassword,
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.token).toBeDefined();
      expect(typeof data.token).toBe('string');
      expect(data.token).toMatch(/^eyJ/); // JWT header
    });

    /**
     * ✅ TESTE REAL: API retorna erro 401 com credenciais inválidas
     * Testa: Verificação de senha com bcrypt
     */
    it('deve retornar 401 com senha incorreta', async () => {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          senha: 'SenhaErrada123!',
        }),
      });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBeDefined();
    });

    /**
     * ✅ TESTE REAL: API retorna 404 para usuário inexistente
     * Testa: Busca no banco
     */
    it('deve retornar 404 para usuário não encontrado', async () => {
      const response = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'naoexiste@test.com',
          senha: testPassword,
        }),
      });

      expect(response.status).toBe(404);
    });

    /**
     * ❌ NÃO TESTAMOS: Validação Zod (email inválido)
     * Por quê? O frontend/Cypress testa isso.
     * Zod é responsabilidade do Zod, não do Jest.
     */
  });

  describe('POST /api/usuarios/cadastro', () => {
    const newEmail = `new-user-${Date.now()}@test.com`;

    /**
     * ✅ TESTE REAL: Criar usuário salva no banco corretamente
     * Testa: API + Prisma + Criptografia de senha
     */
    it('deve criar novo usuário e salvar no banco', async () => {
      const response = await fetch('http://localhost:3000/api/usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newEmail,
          nome_usuario: 'New User',
          senha: 'NovaSenh@123',
          telefone: '11988888888',
        }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.id_usuario).toBeDefined();

      // Verificar se foi realmente criado no banco
      const userInDb = await prisma.usuario.findUnique({
        where: { email: newEmail },
      });
      expect(userInDb).toBeDefined();
      expect(userInDb?.nome_usuario).toBe('New User');
      expect(userInDb?.senha).not.toBe('NovaSenh@123'); // Senha criptografada
      expect(userInDb?.senha.length).toBeGreaterThan(20); // Hash bcrypt

      // Cleanup
      await prisma.usuario.delete({ where: { id_usuario: userInDb!.id_usuario } });
    });

    /**
     * ✅ TESTE REAL: Email duplicado retorna erro 409
     * Testa: Constraint UNIQUE do banco
     */
    it('deve retornar 409 para email duplicado', async () => {
      const response = await fetch('http://localhost:3000/api/usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail, // Email que já existe
          nome_usuario: 'Another User',
          senha: 'OutraSenha@123',
          telefone: '11977777777',
        }),
      });

      expect(response.status).toBe(409);
      const data = await response.json();
      expect(data.error).toContain('email');
    });
  });

  describe('Fluxo Real: Cadastro -> Login -> Acessar Perfil', () => {
    const flowEmail = `flow-${Date.now()}@test.com`;
    const flowPassword = 'FlowPassword@123';
    let flowUserId: number;
    let authToken: string;

    /**
     * ✅ TESTE COMPLETO: User journey completo
     * Simula exatamente o que um usuário faz
     */
    it('user pode se cadastrar, fazer login e acessar perfil', async () => {
      // 1. Cadastro
      const signupRes = await fetch('http://localhost:3000/api/usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: flowEmail,
          nome_usuario: 'Flow User',
          senha: flowPassword,
          telefone: '11966666666',
        }),
      });
      expect(signupRes.status).toBe(201);
      const signupData = await signupRes.json();
      flowUserId = signupData.id_usuario;

      // 2. Login
      const loginRes = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: flowEmail,
          senha: flowPassword,
        }),
      });
      expect(loginRes.status).toBe(200);
      const loginData = await loginRes.json();
      authToken = loginData.token;
      expect(authToken).toBeDefined();

      // 3. Acessar perfil com token
      const profileRes = await fetch('http://localhost:3000/api/usuarios/perfil', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      expect(profileRes.status).toBe(200);
      const profileData = await profileRes.json();
      expect(profileData.email).toBe(flowEmail);
      expect(profileData.nome_usuario).toBe('Flow User');

      // Cleanup
      await prisma.usuario.delete({ where: { id_usuario: flowUserId } });
    });
  });
});
