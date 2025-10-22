// src/lib/validations/avaliacao.ts
import { z } from "zod";

// Validações individuais
export const notaSchema = z
  .number()
  .int("Nota deve ser um número inteiro")
  .min(1, "Nota mínima é 1")
  .max(5, "Nota máxima é 5");

export const comentarioSchema = z
  .string()
  .max(500, "Comentário muito longo")
  .optional();

// Schemas compostos

// Criar avaliação
export const criarAvaliacaoSchema = z.object({
  nota: notaSchema,
  comentario: comentarioSchema,
  id_usuario: z.number().int().positive("ID de usuário inválido"),
  id_produto: z.number().int().positive("ID de produto inválido"),
});

// Atualizar avaliação
export const atualizarAvaliacaoSchema = z.object({
  nota: notaSchema.optional(),
  comentario: comentarioSchema,
});

// Tipos TypeScript
export type CriarAvaliacaoInput = z.infer<typeof criarAvaliacaoSchema>;
export type AtualizarAvaliacaoInput = z.infer<typeof atualizarAvaliacaoSchema>;
