// tests/api/usuarios-perfil.test.ts
import { describe, it, expect } from '@jest/globals';
import { atualizarPerfilSchema } from '@/lib/validations';

describe('GET/PUT /api/usuarios/perfil', () => {
  it('deve validar atualização de perfil com todos os campos', () => {
    const dadosValidos = {
      nome: 'Maria',
      sobrenome: 'Oliveira',
      telefone: '(21) 99999-8888',
      data_nascimento: '1995-05-20',
      sobre: 'Amante de cosméticos naturais',
      url_foto: 'https://storage.example.com/fotos/maria.jpg',
      id_tipo_cabelo: 2
    };

    expect(() => atualizarPerfilSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar atualização apenas do nome', () => {
    const dadosValidos = {
      nome: 'Carlos'
    };

    expect(() => atualizarPerfilSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar nome muito curto', () => {
    const dadosInvalidos = {
      nome: 'A'
    };

    expect(() => atualizarPerfilSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar sobrenome com números', () => {
    const dadosInvalidos = {
      sobrenome: 'Silva123'
    };

    expect(() => atualizarPerfilSchema.parse(dadosInvalidos)).toThrow();
  });
});
