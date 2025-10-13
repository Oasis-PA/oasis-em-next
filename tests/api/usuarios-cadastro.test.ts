// tests/api/usuarios-cadastro.test.ts
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/usuarios/cadastro/route';
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

describe('POST /api/usuarios/cadastro', () => {
  beforeEach(() => {
    mockFindUnique.mockReset();
    mockCreate.mockReset();
    // Mock padrão: email não existe
    mockFindUnique.mockResolvedValue(null);
    // Mock padrão: cria usuário
    mockCreate.mockResolvedValue({
      id_usuario: 1,
      nome: 'João Silva',
      email: 'joao@teste.com',
      senha: 'hashedpassword',
      id_genero: 1,
      telefone: null,
      data_nascimento: null,
      data_cadastro: new Date(),
      id_tipo_cabelo: null,
      sobrenome: null,
      sobre: null,
      url_foto: null,
    });
  });

  it('deve cadastrar usuário com sucesso', async () => {
    const request = new NextRequest('http://localhost:3000/api/usuarios/cadastro', {
      method: 'POST',
      body: JSON.stringify({
        nome: 'João Silva',
        email: 'joao@teste.com',
        senha: 'SenhaForte123!', // Senha forte válida
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
    mockFindUnique.mockResolvedValueOnce({
      id_usuario: 1,
      nome: 'Usuário Existente',
      email: 'existente@email.com',
      senha: 'senha123',
      id_genero: 1,
      telefone: null,
      data_nascimento: null,
      data_cadastro: new Date(),
      id_tipo_cabelo: null,
      sobrenome: null,
      sobre: null,
      url_foto: null,
    });

    const request = new NextRequest('http://localhost:3000/api/usuarios/cadastro', {
      method: 'POST',
      body: JSON.stringify({
        nome: 'João Silva',
        email: 'existente@email.com',
        senha: 'SenhaForte123!',
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
      {
        body: {},
        expectedMessage: 'Dados inválidos',
        expectedErrors: ['nome', 'email', 'senha']
      },
      {
        body: { nome: 'João Silva' },
        expectedMessage: 'Dados inválidos',
        expectedErrors: ['email', 'senha']
      },
      {
        body: { nome: 'João Silva', email: 'joao@email.com' },
        expectedMessage: 'Dados inválidos',
        expectedErrors: ['senha']
      },
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
      expect(data.errors).toBeDefined();

      // Verifica se todos os campos esperados estão nos erros
      testCase.expectedErrors.forEach(campo => {
        expect(data.errors.some((err: any) => err.campo === campo)).toBe(true);
      });
    }
  });
});
