import { NextRequest } from 'next/server';
import { POST } from '@/app/api/usuarios/check-email/route';
import { PrismaClient, Usuario } from '@prisma/client';
import { jest } from '@jest/globals';

// Variável para controle do mock
let mockFindUnique: any;

// Mock do PrismaClient
jest.mock('@/lib/prisma', () => ({
  prisma: {
    get usuario() {
      return {
        findUnique: (...args: any[]) => mockFindUnique(...args),
      };
    },
  },
}));

describe('POST /api/usuarios/check-email', () => {
  beforeEach(() => {
    // Resetar mock
    mockFindUnique = async () => null;
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
    mockFindUnique = async () => ({
      id_usuario: 1,
      nome: 'João',
      email: 'existente@email.com',
      telefone: null,
      senha: '123456',
      data_nascimento: null,
      data_cadastro: new Date(),
      id_genero: 1,
      id_tipo_cabelo: null,
      sobrenome: null,
      sobre: null,
      url_foto: null,
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
    expect(data.message).toBe('Dados inválidos');
    expect(data.errors).toBeDefined();
    expect(data.errors.some((err: any) => err.campo === 'email')).toBe(true);
  });

  it('deve retornar erro de validação quando email é inválido', async () => {
    const request = new NextRequest('http://localhost:3000/api/usuarios/check-email', {
      method: 'POST',
      body: JSON.stringify({ email: 'emailinvalido' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Dados inválidos');
    expect(data.errors).toBeDefined();
    expect(data.errors.some((err: any) => err.campo === 'email' && err.mensagem.includes('inválido'))).toBe(true);
  });

  it('deve retornar erro 500 quando há erro no banco', async () => {
    mockFindUnique = async () => {
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
