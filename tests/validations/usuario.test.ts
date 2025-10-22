// tests/validations/usuario.test.ts
import { describe, it, expect } from '@jest/globals';
import {
  cadastroEtapa1Schema,
  cadastroEtapa2Schema,
  cadastroSchema,
  loginSchema,
  checkEmailSchema,
  atualizarPerfilSchema,
  alterarSenhaSchema,
} from '@/lib/validations';

describe('Validações de Usuário', () => {

  describe('cadastroEtapa1Schema', () => {
    it('deve aceitar nome e email válidos', () => {
      const dados = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
      };

      expect(() => cadastroEtapa1Schema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar nome muito curto', () => {
      const dados = {
        nome: 'J',
        email: 'joao@exemplo.com',
      };

      expect(() => cadastroEtapa1Schema.parse(dados)).toThrow('Nome deve ter no mínimo 2 caracteres');
    });

    it('deve rejeitar nome com números', () => {
      const dados = {
        nome: 'João123',
        email: 'joao@exemplo.com',
      };

      expect(() => cadastroEtapa1Schema.parse(dados)).toThrow('Nome deve conter apenas letras');
    });

    it('deve rejeitar email inválido', () => {
      const dados = {
        nome: 'João Silva',
        email: 'emailinvalido',
      };

      expect(() => cadastroEtapa1Schema.parse(dados)).toThrow('Email inválido');
    });

    it('deve aceitar nomes com acentos', () => {
      const dados = {
        nome: 'José María',
        email: 'jose@exemplo.com',
      };

      expect(() => cadastroEtapa1Schema.parse(dados)).not.toThrow();
    });
  });

  describe('cadastroEtapa2Schema', () => {
    it('deve aceitar senha forte e confirmação correta', () => {
      const dados = {
        senha: 'SenhaForte123!',
        confirmaSenha: 'SenhaForte123!',
      };

      expect(() => cadastroEtapa2Schema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar senha muito curta', () => {
      const dados = {
        senha: 'Abc1!',
        confirmaSenha: 'Abc1!',
      };

      expect(() => cadastroEtapa2Schema.parse(dados)).toThrow('Senha deve ter no mínimo 8 caracteres');
    });

    it('deve rejeitar senha sem letra maiúscula', () => {
      const dados = {
        senha: 'senhafraca123!',
        confirmaSenha: 'senhafraca123!',
      };

      expect(() => cadastroEtapa2Schema.parse(dados)).toThrow('Senha deve conter ao menos uma letra maiúscula');
    });

    it('deve rejeitar senha sem letra minúscula', () => {
      const dados = {
        senha: 'SENHAFORTE123!',
        confirmaSenha: 'SENHAFORTE123!',
      };

      expect(() => cadastroEtapa2Schema.parse(dados)).toThrow('Senha deve conter ao menos uma letra minúscula');
    });

    it('deve rejeitar senha sem número', () => {
      const dados = {
        senha: 'SenhaForte!',
        confirmaSenha: 'SenhaForte!',
      };

      expect(() => cadastroEtapa2Schema.parse(dados)).toThrow('Senha deve conter ao menos um número');
    });

    it('deve rejeitar senha sem caractere especial', () => {
      const dados = {
        senha: 'SenhaForte123',
        confirmaSenha: 'SenhaForte123',
      };

      expect(() => cadastroEtapa2Schema.parse(dados)).toThrow('Senha deve conter ao menos um caractere especial');
    });

    it('deve rejeitar senhas que não conferem', () => {
      const dados = {
        senha: 'SenhaForte123!',
        confirmaSenha: 'SenhaDiferente123!',
      };

      expect(() => cadastroEtapa2Schema.parse(dados)).toThrow('As senhas não conferem');
    });
  });

  describe('loginSchema', () => {
    it('deve aceitar email e senha válidos', () => {
      const dados = {
        email: 'joao@exemplo.com',
        senha: 'qualquersenha',
      };

      expect(() => loginSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar email inválido', () => {
      const dados = {
        email: 'emailinvalido',
        senha: 'senha123',
      };

      expect(() => loginSchema.parse(dados)).toThrow('Email inválido');
    });

    it('deve rejeitar senha vazia', () => {
      const dados = {
        email: 'joao@exemplo.com',
        senha: '',
      };

      expect(() => loginSchema.parse(dados)).toThrow('Senha é obrigatória');
    });
  });

  describe('checkEmailSchema', () => {
    it('deve aceitar email válido', () => {
      const dados = { email: 'joao@exemplo.com' };

      expect(() => checkEmailSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar email inválido', () => {
      const dados = { email: 'emailinvalido' };

      expect(() => checkEmailSchema.parse(dados)).toThrow('Email inválido');
    });
  });

  describe('cadastroSchema (completo)', () => {
    it('deve aceitar cadastro completo válido', () => {
      const dados = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'SenhaForte123!',
        id_genero: 1,
      };

      const resultado = cadastroSchema.parse(dados);
      expect(resultado).toHaveProperty('nome', 'João Silva');
      expect(resultado).toHaveProperty('id_genero', 1);
    });

    it('deve usar id_genero padrão como 1', () => {
      const dados = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'SenhaForte123!',
      };

      const resultado = cadastroSchema.parse(dados);
      expect(resultado.id_genero).toBe(1);
    });

    it('deve aceitar campos opcionais', () => {
      const dados = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'SenhaForte123!',
        telefone: '(11) 98765-4321',
        sobrenome: 'Santos',
        data_nascimento: '1990-05-15',
      };

      expect(() => cadastroSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar telefone em formato inválido', () => {
      const dados = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'SenhaForte123!',
        telefone: '11987654321', // sem formatação
      };

      expect(() => cadastroSchema.parse(dados)).toThrow('Telefone inválido');
    });

    it('deve rejeitar data de nascimento inválida (menor de 13 anos)', () => {
      const anoAtual = new Date().getFullYear();
      const dataNascimento = `${anoAtual - 10}-01-01`; // 10 anos atrás

      const dados = {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: 'SenhaForte123!',
        data_nascimento: dataNascimento,
      };

      expect(() => cadastroSchema.parse(dados)).toThrow('Você deve ter entre 13 e 120 anos');
    });
  });

  describe('alterarSenhaSchema', () => {
    it('deve aceitar alteração de senha válida', () => {
      const dados = {
        senhaAtual: 'SenhaAntiga123!',
        novaSenha: 'NovaSenha456@',
        confirmaNovaSenha: 'NovaSenha456@',
      };

      expect(() => alterarSenhaSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar nova senha igual à senha atual', () => {
      const dados = {
        senhaAtual: 'SenhaForte123!',
        novaSenha: 'SenhaForte123!',
        confirmaNovaSenha: 'SenhaForte123!',
      };

      expect(() => alterarSenhaSchema.parse(dados)).toThrow('A nova senha deve ser diferente da senha atual');
    });

    it('deve rejeitar confirmação de senha incorreta', () => {
      const dados = {
        senhaAtual: 'SenhaAntiga123!',
        novaSenha: 'NovaSenha456@',
        confirmaNovaSenha: 'SenhaDiferente456@',
      };

      expect(() => alterarSenhaSchema.parse(dados)).toThrow('As senhas não conferem');
    });
  });

  describe('atualizarPerfilSchema', () => {
    it('deve aceitar atualização parcial de perfil', () => {
      const dados = {
        nome: 'João Silva',
        sobre: 'Desenvolvedor web apaixonado por tecnologia',
      };

      expect(() => atualizarPerfilSchema.parse(dados)).not.toThrow();
    });

    it('deve aceitar URL de foto válida', () => {
      const dados = {
        url_foto: 'https://exemplo.com/foto.jpg',
      };

      expect(() => atualizarPerfilSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar URL de foto inválida', () => {
      const dados = {
        url_foto: 'urlInvalida',
      };

      expect(() => atualizarPerfilSchema.parse(dados)).toThrow('URL inválida');
    });

    it('deve aceitar todos os campos opcionais vazios', () => {
      const dados = {};

      expect(() => atualizarPerfilSchema.parse(dados)).not.toThrow();
    });
  });
});
