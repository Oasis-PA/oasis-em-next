// tests/api/usuarios-esqueceusenha.test.ts
import { describe, it, expect } from '@jest/globals';
import { solicitarResetSenhaSchema, resetarSenhaSchema } from '@/lib/validations';

describe('POST /api/usuarios/esqueceusenha', () => {
  describe('Solicitar reset de senha', () => {
    it('deve validar email válido', () => {
      const dadosValidos = {
        email: 'usuario@teste.com'
      };

      expect(() => solicitarResetSenhaSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve rejeitar email inválido', () => {
      const dadosInvalidos = {
        email: 'emailinvalido'
      };

      expect(() => solicitarResetSenhaSchema.parse(dadosInvalidos)).toThrow();
    });

    it('deve rejeitar quando email não é fornecido', () => {
      const dadosInvalidos = {};

      expect(() => solicitarResetSenhaSchema.parse(dadosInvalidos)).toThrow();
    });
  });

  describe('Resetar senha com token', () => {
    it('deve validar dados de reset válidos', () => {
      const dadosValidos = {
        token: 'token-valido-123',
        novaSenha: 'NovaSenha123!',
        confirmaNovaSenha: 'NovaSenha123!'
      };

      expect(() => resetarSenhaSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve rejeitar quando senhas não conferem', () => {
      const dadosInvalidos = {
        token: 'token-valido-123',
        novaSenha: 'NovaSenha123!',
        confirmaNovaSenha: 'SenhaDiferente123!'
      };

      expect(() => resetarSenhaSchema.parse(dadosInvalidos)).toThrow();
    });

    it('deve rejeitar senha fraca', () => {
      const dadosInvalidos = {
        token: 'token-valido-123',
        novaSenha: '123',
        confirmaNovaSenha: '123'
      };

      expect(() => resetarSenhaSchema.parse(dadosInvalidos)).toThrow();
    });
  });
});
