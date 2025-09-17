// tests/api/usuarios-cadastro.test.ts
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/usuarios/cadastro/route';
import { PrismaClient, Usuario } from '@prisma/client';
import { jest } from '@jest/globals';

// Mock do Prisma usando async functions simples
const mockPrismaCadastro = {
  usuario: {
    findUnique: async (args: { where: { email: string } }): Promise<Usuario | null> => null,
    create: async (args: any): Promise<Usuario> => ({
      id_usuario: 1,
      nome: args.data.nome,
      email: args.data.email,
      senha: args.data.senha,
      id_genero: args.data.id_genero ?? 1,
      telefone: null,
      data_nascimento: null,
      data_cadastro: new Date(),
      id_tipo_cabelo: null,
    }),
  },
};

// Mock do PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: class {
    usuario = mockPrismaCadastro.usuario;
  },
}));

describe('POST /api/usuarios/cadastro', () => {
  beforeEach(() => {
    // Resetar mocks
    mockPrismaCadastro.usuario.findUnique = async () => null;
    mockPrismaCadastro.usuario.create = async (args: any) => ({
      id_usuario: 1,
      nome: args.data.nome,
      email: args.data.email,
      senha: args.data.senha,
      id_genero: args.data.id_genero ?? 1,
      telefone: null,
      data_nascimento: null,
      data_cadastro: new Date(),
      id_tipo_cabelo: null,
    });
  });

  it('deve cadastrar usuário com sucesso', async () => {
    const request = new NextRequest('http://localhost:3000/api/usuarios/cadastro', {
      method: 'POST',
      body: JSON.stringify({
        nome: 'João Silva',
        email: 'joao@teste.com',
        senha: 'senha123',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Conta criada com sucesso!');
    expect(data.usuario.nome).toBe('João Silva');
    expect(data.usuario.email).toBe('joao@teste.com');
  });

  it('deve retornar erro quando email já existe', async () => {
    mockPrismaCadastro.usuario.findUnique = async () => ({
      id_usuario: 1,
      nome: 'Usuário Existente',
      email: 'existente@email.com',
      senha: 'senha123',
      id_genero: 1,
      telefone: null,
      data_nascimento: null,
      data_cadastro: new Date(),
      id_tipo_cabelo: null,
    });

    const request = new NextRequest('http://localhost:3000/api/usuarios/cadastro', {
      method: 'POST',
      body: JSON.stringify({
        nome: 'João',
        email: 'existente@email.com',
        senha: 'senha123',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Já existe um usuário com este email.');
  });

  it('deve retornar erro quando campos obrigatórios não são fornecidos', async () => {
    const testCases = [
      { body: {}, expectedMessage: 'Todos os campos são obrigatórios.' },
      { body: { nome: 'João' }, expectedMessage: 'Todos os campos são obrigatórios.' },
      { body: { nome: 'João', email: 'joao@email.com' }, expectedMessage: 'Todos os campos são obrigatórios.' },
    ];

    for (const testCase of testCases) {
      const request = new NextRequest('http://localhost:3000/api/usuarios/cadastro', {
        method: 'POST',
        body: JSON.stringify(testCase.body),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe(testCase.expectedMessage);
    }
  });
});
