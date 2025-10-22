// src/lib/validations/produto.ts
import { z } from "zod";

// Validações individuais
export const nomeProdutoSchema = z
  .string()
  .min(2, "Nome do produto deve ter no mínimo 2 caracteres")
  .max(200, "Nome do produto deve ter no máximo 200 caracteres");

export const marcaProdutoSchema = z
  .string()
  .min(2, "Marca deve ter no mínimo 2 caracteres")
  .max(100, "Marca deve ter no máximo 100 caracteres");

export const precoProdutoSchema = z
  .number()
  .positive("Preço deve ser maior que zero")
  .max(99999.99, "Preço muito alto");

export const descricaoProdutoSchema = z
  .string()
  .max(1000, "Descrição muito longa")
  .optional();

// Schemas compostos

// Criar produto
export const criarProdutoSchema = z.object({
  nome: nomeProdutoSchema,
  marca: marcaProdutoSchema,
  preco: precoProdutoSchema,
  id_categoria: z.number().int().positive("Categoria inválida"),
  descricao: descricaoProdutoSchema,
  id_tag: z.number().int().positive().optional(),
  id_tipo_pele: z.number().int().positive().optional(),
  id_tipo_cabelo: z.number().int().positive().optional(),
});

// Atualizar produto
export const atualizarProdutoSchema = z.object({
  nome: nomeProdutoSchema.optional(),
  marca: marcaProdutoSchema.optional(),
  preco: precoProdutoSchema.optional(),
  id_categoria: z.number().int().positive("Categoria inválida").optional(),
  descricao: descricaoProdutoSchema,
  id_tag: z.number().int().positive().optional(),
  id_tipo_pele: z.number().int().positive().optional(),
  id_tipo_cabelo: z.number().int().positive().optional(),
});

// Tipos TypeScript
export type CriarProdutoInput = z.infer<typeof criarProdutoSchema>;
export type AtualizarProdutoInput = z.infer<typeof atualizarProdutoSchema>;
