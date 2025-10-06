// src/lib/schemas.ts
import { z } from 'zod';

// Um ótimo esquema para começar, por ser simples:
export const createTagSchema = z.object({
  nome: z.string().min(2, { message: 'O nome da tag deve ter pelo menos 2 caracteres.' }),
});

// Depois, pode adicionar os esquemas mais complexos que discutimos:
export const createProductSchema = z.object({
  nome: z.string().min(3, 'O nome do produto é obrigatório.'),
  marca: z.string().min(1, 'A marca é obrigatória.'),
  preco: z.coerce.number().positive('O preço deve ser um número positivo.'), // .coerce tenta converter string para número
  id_categoria: z.coerce.number().int().positive('ID da categoria inválido.'),
  url_imagem: z.string().url('URL da imagem inválida.'),
  url_loja: z.string().url('URL da loja inválida.'),
  descricao: z.string().optional(),
  id_tag: z.coerce.number().int().positive().optional(),
});

// E os esquemas de utilizador...