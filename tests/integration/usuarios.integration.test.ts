// tests/integration/usuarios.integration.test.ts
import { describe, it, expect } from '@jest/globals';
import { prisma } from './setup';
import bcrypt from 'bcryptjs';

describe('Testes de Integração - Usuários', () => {

  describe('Criação de Usuário', () => {
    it('deve criar um usuário com sucesso no banco de dados', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
        },
      });

      expect(usuario).toHaveProperty('id');
      expect(usuario.nome).toBe('João Silva');
      expect(usuario.email).toBe('joao@teste.com');
      expect(usuario.id_genero).toBe(1);
      expect(usuario.createdAt).toBeInstanceOf(Date);
    });

    it('deve rejeitar criação de usuário com email duplicado (constraint de unicidade)', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      // Criar primeiro usuário
      await prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
        },
      });

      // Tentar criar segundo usuário com mesmo email
      await expect(
        prisma.usuario.create({
          data: {
            nome: 'Maria Silva',
            email: 'joao@teste.com', // Email duplicado
            senha: senhaHash,
            id_genero: 2,
          },
        })
      ).rejects.toThrow(); // Deve lançar erro de constraint único
    });

    it('deve criar usuário com todos os campos opcionais', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Maria',
          sobrenome: 'Santos',
          email: 'maria@teste.com',
          senha: senhaHash,
          telefone: '(11) 98765-4321',
          data_nascimento: new Date('1990-05-15'),
          sobre: 'Apaixonada por cuidados capilares',
          url_foto: 'https://exemplo.com/foto.jpg',
          id_genero: 2,
          id_tipo_cabelo: 3,
        },
      });

      expect(usuario.sobrenome).toBe('Santos');
      expect(usuario.telefone).toBe('(11) 98765-4321');
      expect(usuario.sobre).toBe('Apaixonada por cuidados capilares');
      expect(usuario.id_tipo_cabelo).toBe(3);
    });
  });

  describe('Leitura de Usuário', () => {
    it('deve buscar usuário por email', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      // Criar usuário
      await prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
        },
      });

      // Buscar usuário
      const usuario = await prisma.usuario.findUnique({
        where: { email: 'joao@teste.com' },
      });

      expect(usuario).not.toBeNull();
      expect(usuario?.email).toBe('joao@teste.com');
      expect(usuario?.nome).toBe('João Silva');
    });

    it('deve buscar usuário com relacionamentos (genero, tipo de cabelo)', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Maria Santos',
          email: 'maria@teste.com',
          senha: senhaHash,
          id_genero: 2,
          id_tipo_cabelo: 3,
        },
      });

      // Buscar com relacionamentos
      const usuarioComRelacionamentos = await prisma.usuario.findUnique({
        where: { id: usuario.id },
        include: {
          genero: true,
          tipo_cabelo: true,
        },
      });

      expect(usuarioComRelacionamentos?.genero?.nome).toBe('Feminino');
      expect(usuarioComRelacionamentos?.tipo_cabelo?.tipo).toBe('Cacheado');
    });

    it('deve retornar null ao buscar usuário inexistente', async () => {
      const usuario = await prisma.usuario.findUnique({
        where: { email: 'naoexiste@teste.com' },
      });

      expect(usuario).toBeNull();
    });
  });

  describe('Atualização de Usuário', () => {
    it('deve atualizar dados pessoais do usuário', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
        },
      });

      // Atualizar usuário
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: usuario.id },
        data: {
          nome: 'João Silva',
          sobrenome: 'Santos',
          sobre: 'Desenvolvedor web',
          id_tipo_cabelo: 2,
        },
      });

      expect(usuarioAtualizado.nome).toBe('João Silva');
      expect(usuarioAtualizado.sobrenome).toBe('Santos');
      expect(usuarioAtualizado.sobre).toBe('Desenvolvedor web');
      expect(usuarioAtualizado.id_tipo_cabelo).toBe(2);
    });

    it('deve alterar senha do usuário', async () => {
      const senhaAntiga = await bcrypt.hash('SenhaAntiga123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: senhaAntiga,
          id_genero: 1,
        },
      });

      // Alterar senha
      const novaSenhaHash = await bcrypt.hash('NovaSenha456@', 10);
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: usuario.id },
        data: { senha: novaSenhaHash },
      });

      // Verificar se a nova senha funciona
      const senhaValida = await bcrypt.compare('NovaSenha456@', usuarioAtualizado.senha);
      expect(senhaValida).toBe(true);
    });

    it('deve rejeitar atualização para email duplicado', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      // Criar dois usuários
      await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
        },
      });

      const usuario2 = await prisma.usuario.create({
        data: {
          nome: 'Maria',
          email: 'maria@teste.com',
          senha: senhaHash,
          id_genero: 2,
        },
      });

      // Tentar atualizar email do segundo usuário para o email do primeiro
      await expect(
        prisma.usuario.update({
          where: { id: usuario2.id },
          data: { email: 'joao@teste.com' }, // Email já existe
        })
      ).rejects.toThrow();
    });
  });

  describe('Deleção de Usuário', () => {
    it('deve deletar usuário do banco de dados', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
        },
      });

      // Deletar usuário
      await prisma.usuario.delete({
        where: { id: usuario.id },
      });

      // Verificar que não existe mais
      const usuarioDeletado = await prisma.usuario.findUnique({
        where: { id: usuario.id },
      });

      expect(usuarioDeletado).toBeNull();
    });

    it('deve deletar usuário e seus tokens de reset de senha (cascade)', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
        },
      });

      // Criar token de reset
      await prisma.passwordReset.create({
        data: {
          email: usuario.email,
          token: 'token-teste-123',
          expira_em: new Date(Date.now() + 3600000),
        },
      });

      // Deletar usuário (deve deletar tokens em cascade)
      await prisma.usuario.delete({
        where: { id: usuario.id },
      });

      // Verificar que tokens também foram deletados
      const tokens = await prisma.passwordReset.findMany({
        where: { email: usuario.email },
      });

      expect(tokens.length).toBe(0);
    });
  });

  describe('Transações de Usuário', () => {
    it('deve fazer rollback de transação ao falhar', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      try {
        await prisma.$transaction(async (tx) => {
          // Criar usuário
          await tx.usuario.create({
            data: {
              nome: 'João Silva',
              email: 'joao@teste.com',
              senha: senhaHash,
              id_genero: 1,
            },
          });

          // Tentar criar usuário com email duplicado (vai falhar)
          await tx.usuario.create({
            data: {
              nome: 'Maria Silva',
              email: 'joao@teste.com', // Duplicado!
              senha: senhaHash,
              id_genero: 2,
            },
          });
        });
      } catch (error) {
        // Esperado falhar
      }

      // Verificar que NENHUM usuário foi criado (rollback)
      const usuarios = await prisma.usuario.findMany({
        where: { email: 'joao@teste.com' },
      });

      expect(usuarios.length).toBe(0);
    });

    it('deve criar usuário e perfil em transação atômica', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const resultado = await prisma.$transaction(async (tx) => {
        // Criar usuário
        const usuario = await tx.usuario.create({
          data: {
            nome: 'João Silva',
            email: 'joao@teste.com',
            senha: senhaHash,
            id_genero: 1,
          },
        });

        // Atualizar perfil
        const usuarioAtualizado = await tx.usuario.update({
          where: { id: usuario.id },
          data: {
            sobre: 'Perfil criado em transação',
            id_tipo_cabelo: 2,
          },
        });

        return usuarioAtualizado;
      });

      expect(resultado.nome).toBe('João Silva');
      expect(resultado.sobre).toBe('Perfil criado em transação');
      expect(resultado.id_tipo_cabelo).toBe(2);
    });
  });
});
