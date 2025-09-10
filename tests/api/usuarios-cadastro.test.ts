import { prisma } from '../setup';

// Mock mais simples do NextResponse
const mockJson = jest.fn();
const mockStatus = jest.fn();

jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, options: any = {}) => {
      mockJson.mockReturnValue(data);
      mockStatus.mockReturnValue(options.status || 200);
      return {
        json: () => Promise.resolve(data),
        status: options.status || 200
      };
    },
  },
}));

describe('API de Cadastro de Usuários', () => {
  beforeEach(async () => {
    // Limpar mocks
    mockJson.mockClear();
    mockStatus.mockClear();
    
    // Criar gênero padrão para os testes
    await prisma.genero.create({
      data: { nome: 'Padrão', sigla: 'P' }
    });
  });

  it('deve criar um usuário com dados válidos', async () => {
    // Importar dinamicamente para usar o mock
    const { POST } = await import('../../app/api/usuarios/cadastro/route');
    
    const userData = {
      nome: 'João Silva',
      email: 'joao@teste.com',
      senha: 'senha123'
    };

    const req = {
      json: async () => userData,
    } as Request;

    const response = await POST(req);
    
    expect(response.status).toBe(200);

    // Verificar se foi salvo no banco
    const usuarioSalvo = await prisma.usuario.findUnique({
      where: { email: userData.email }
    });

    expect(usuarioSalvo).toBeTruthy();
    expect(usuarioSalvo?.nome).toBe(userData.nome);
    expect(usuarioSalvo?.email).toBe(userData.email);
  });

  it('deve retornar erro com campos obrigatórios faltando', async () => {
    const { POST } = await import('../../app/api/usuarios/cadastro/route');
    
    const invalidData = {
      nome: 'João Silva',
      // email faltando
      senha: 'senha123'
    };

    const req = {
      json: async () => invalidData,
    } as Request;

    const response = await POST(req);
    
    expect(response.status).toBe(400);
  });

  it('deve retornar erro com email duplicado', async () => {
    const { POST } = await import('../../app/api/usuarios/cadastro/route');
    
    const emailDuplicado = 'duplicado@teste.com';
    
    // Criar usuário primeiro
    await prisma.usuario.create({
      data: {
        nome: 'Usuário Existente',
        email: emailDuplicado,
        senha: 'senha123',
        id_genero: 1
      }
    });

    const userData = {
      nome: 'Novo Usuário',
      email: emailDuplicado,
      senha: 'outrasenha'
    };

    const req = {
      json: async () => userData,
    } as Request;

    const response = await POST(req);
    
    expect(response.status).toBe(400);
  });
});

// ==========================================
// ARQUIVO: tests/api/usuarios-check-email.test.ts  
// SUBSTITUA TODO O CONTEÚDO ATUAL POR ESTE:
// ==========================================

import { prisma } from '../setup';

// Mock simples do NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, options: any = {}) => ({
      json: () => Promise.resolve(data),
      status: options.status || 200
    }),
  },
}));

describe('API de Verificação de Email', () => {
  beforeEach(async () => {
    // Criar gênero padrão
    await prisma.genero.create({
      data: { nome: 'Padrão', sigla: 'P' }
    });
  });

  it('deve retornar disponível para email novo', async () => {
    const { POST } = await import('../../src/app/api/usuarios/check-email/route');
    
    const emailData = {
      email: 'novo@teste.com'
    };

    const req = {
      json: async () => emailData,
    } as Request;

    const response = await POST(req);
    
    expect(response.status).toBe(200);
  });

  it('deve retornar erro para email existente', async () => {
    const { POST } = await import('../../src/app/api/usuarios/check-email/route');
    
    const emailExistente = 'existente@teste.com';
    
    // Criar usuário com email
    await prisma.usuario.create({
      data: {
        nome: 'Usuário Existente',
        email: emailExistente,
        senha: 'senha123',
        id_genero: 1
      }
    });

    const emailData = {
      email: emailExistente
    };

    const req = {
      json: async () => emailData,
    } as Request;

    const response = await POST(req);
    
    expect(response.status).toBe(400);
  });

  it('deve retornar erro quando email não é fornecido', async () => {
    const { POST } = await import('../../src/app/api/usuarios/check-email/route');
    
    const emailData = {}; // email faltando

    const req = {
      json: async () => emailData,
    } as Request;

    const response = await POST(req);
    
    expect(response.status).toBe(400);
  });
});