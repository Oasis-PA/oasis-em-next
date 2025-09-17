import { NextRequest } from 'next/server';
import { POST } from '@/app/api/usuarios/check-email/route';
import { PrismaClient, Usuario } from '@prisma/client';
import { jest } from '@jest/globals';

// Mock do Prisma
const mockPrisma = {
  usuario: {
    // Async function simples, sem tipos genéricos
    findUnique: async (args: { where: { email: string } }): Promise<Usuario | null> => null,
  },
};

// Mock do PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: class {
    usuario = mockPrisma.usuario;
  },
}));

describe('POST /api/usuarios/check-email', () => {
  beforeEach(() => {
    // Limpa os mocks chamando manualmente
    mockPrisma.usuario.findUnique = async (args: { where: { email: string } }) => null;
  });

  it('deve retornar "Email disponível" quando email não existe', async () => {
    const request = new NextRequest('http://localhost:3000/api/usuarios/check-email', {
      method: 'POST',
      body: JSON.stringify({ email: 'novo@email.com' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Email disponível.');
  });

  it('deve retornar erro quando email já existe', async () => {
    mockPrisma.usuario.findUnique = async () => ({
      id_usuario: 1,
      nome: 'João',
      email: 'existente@email.com',
      telefone: null,
      senha: '123456',
      data_nascimento: null,
      data_cadastro: new Date(),
      id_genero: 1,
      id_tipo_cabelo: null,
    });

    const request = new NextRequest('http://localhost:3000/api/usuarios/check-email', {
      method: 'POST',
      body: JSON.stringify({ email: 'existente@email.com' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Já existe um usuário com este email.');
  });

  it('deve retornar erro quando email não é fornecido', async () => {
    const request = new NextRequest('http://localhost:3000/api/usuarios/check-email', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Email é obrigatório.');
  });

  it('deve retornar erro 500 quando há erro no banco', async () => {
    mockPrisma.usuario.findUnique = async () => {
      throw new Error('Erro no banco');
    };

    const request = new NextRequest('http://localhost:3000/api/usuarios/check-email', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@email.com' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toBe('Erro no servidor.');
  });
});
