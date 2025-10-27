// tests/api/usuarios-update.test.ts
import { describe, it, expect } from '@jest/globals';
import { atualizarPerfilSchema, alterarSenhaSchema } from '@/lib/validations';

describe('PUT /api/usuarios/update', () => {
  describe('Atualizar perfil', () => {
    it('deve validar atualização completa de perfil', () => {
      const dadosValidos = {
        nome: 'João Silva',
        sobrenome: 'Santos',
        telefone: '(11) 98765-4321',
        data_nascimento: '1990-01-15',
        sobre: 'Desenvolvedor apaixonado por tecnologia',
        url_foto: 'https://exemplo.com/foto.jpg',
        id_tipo_cabelo: 1
      };

      expect(() => atualizarPerfilSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve validar atualização parcial de perfil', () => {
      const dadosValidos = {
        sobrenome: 'Silva'
      };

      expect(() => atualizarPerfilSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve rejeitar telefone inválido', () => {
      const dadosInvalidos = {
        telefone: '123456'
      };

      expect(() => atualizarPerfilSchema.parse(dadosInvalidos)).toThrow();
    });

    it('deve rejeitar data de nascimento inválida', () => {
      const dadosInvalidos = {
        data_nascimento: '2020-01-01' // Menos de 13 anos
      };

      expect(() => atualizarPerfilSchema.parse(dadosInvalidos)).toThrow();
    });

    it('deve rejeitar URL de foto inválida', () => {
      const dadosInvalidos = {
        url_foto: 'url-invalida'
      };

      expect(() => atualizarPerfilSchema.parse(dadosInvalidos)).toThrow();
    });
  });

  describe('Alterar senha', () => {
    it('deve validar alteração de senha válida', () => {
      const dadosValidos = {
        senhaAtual: 'SenhaAntiga123!',
        novaSenha: 'NovaSenha123!',
        confirmaNovaSenha: 'NovaSenha123!'
      };

      expect(() => alterarSenhaSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve rejeitar quando senhas não conferem', () => {
      const dadosInvalidos = {
        senhaAtual: 'SenhaAntiga123!',
        novaSenha: 'NovaSenha123!',
        confirmaNovaSenha: 'SenhaDiferente123!'
      };

      expect(() => alterarSenhaSchema.parse(dadosInvalidos)).toThrow();
    });

    it('deve rejeitar quando nova senha é igual à atual', () => {
      const dadosInvalidos = {
        senhaAtual: 'SenhaMesma123!',
        novaSenha: 'SenhaMesma123!',
        confirmaNovaSenha: 'SenhaMesma123!'
      };

      expect(() => alterarSenhaSchema.parse(dadosInvalidos)).toThrow();
    });

    it('deve rejeitar nova senha fraca', () => {
      const dadosInvalidos = {
        senhaAtual: 'SenhaAntiga123!',
        novaSenha: '123',
        confirmaNovaSenha: '123'
      };

      expect(() => alterarSenhaSchema.parse(dadosInvalidos)).toThrow();
    });
  });
});
