// tests/integration/usuario-flow.test.ts
import { NextRequest } from 'next/server';
import { jest } from '@jest/globals';

const mockFindUnique = jest.fn();
const mockCreate = jest.fn();

jest.mock('@/lib/prisma', () => ({
  prisma: {
    usuario: {
      findUnique: mockFindUnique,
      create: mockCreate,
    },
  },
}));

import { POST as checkEmailPOST } from '@/app/api/usuarios/check-email/route';
import { POST as cadastroPOST } from '@/app/api/usuarios/cadastro/route';

describe('Fluxo completo de cadastro de usuário', () => {
  beforeEach(() => {
    mockFindUnique.mockReset();
    mockCreate.mockReset();
  });

  it('deve completar fluxo de cadastro com sucesso', async () => {
    const userData = {
      nome: 'Maria Santos',
      email: 'maria@teste.com',
      senha: 'MinhaSenh@123',
    };

    // Passo 1: Verificar se email está disponível
    mockFindUnique.mockResolvedValue(null);

    const checkEmailRequest = new NextRequest('http://localhost:3000/api/usuarios/check-email', {
      method: 'POST',
      body: JSON.stringify({ email: userData.email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const checkEmailResponse = await checkEmailPOST(checkEmailRequest);
    const checkEmailData = await checkEmailResponse.json();

    expect(checkEmailResponse.status).toBe(200);
    expect(checkEmailData.message).toBe('Email disponível.');

    // Passo 2: Cadastrar usuário
    const novoUsuario = {
      id: 1,
      ...userData,
      id_genero: 1,
      createdAt: new Date(),
    };
    mockCreate.mockResolvedValue(novoUsuario);

    const cadastroRequest = new NextRequest('http://localhost:3000/api/usuarios/cadastro', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    const cadastroResponse = await cadastroPOST(cadastroRequest);
    const cadastroData = await cadastroResponse.json();

    expect(cadastroResponse.status).toBe(200);
    expect(cadastroData.message).toBe('Conta criada com sucesso!');
    expect(cadastroData.usuario.email).toBe(userData.email);

    // Passo 3: Tentar verificar email novamente (agora deve existir)
    mockFindUnique.mockResolvedValue(novoUsuario);

    const checkEmailRequest2 = new NextRequest('http://localhost:3000/api/usuarios/check-email', {
      method: 'POST',
      body: JSON.stringify({ email: userData.email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const checkEmailResponse2 = await checkEmailPOST(checkEmailRequest2);
    const checkEmailData2 = await checkEmailResponse2.json();

    expect(checkEmailResponse2.status).toBe(400);
    expect(checkEmailData2.message).toBe('Já existe um usuário com este email.');
  });

  it('deve falhar quando tenta cadastrar email já existente', async () => {
    const userData = {
      nome: 'João Duplicado',
      email: 'existente@teste.com',
      senha: 'senha123',
    };

    // Simula que email já existe
    mockFindUnique.mockResolvedValue({
      id: 1,
      email: userData.email,
      nome: 'Usuário Existente',
    });

    // Passo 1: Verificar email (deve retornar que já existe)
    const checkEmailRequest = new NextRequest('http://localhost:3000/api/usuarios/check-email', {
      method: 'POST',
      body: JSON.stringify({ email: userData.email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const checkEmailResponse = await checkEmailPOST(checkEmailRequest);
    const checkEmailData = await checkEmailResponse.json();

    expect(checkEmailResponse.status).toBe(400);
    expect(checkEmailData.message).toBe('Já existe um usuário com este email.');

    // Passo 2: Tentar cadastrar mesmo assim (deve falhar)
    const cadastroRequest = new NextRequest('http://localhost:3000/api/usuarios/cadastro', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    const cadastroResponse = await cadastroPOST(cadastroRequest);
    const cadastroData = await cadastroResponse.json();

    expect(cadastroResponse.status).toBe(400);
    expect(cadastroData.message).toBe('Já existe um usuário com este email.');
  });
});
