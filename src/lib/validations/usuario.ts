// src/lib/validations/usuario.ts
import { z } from "zod";

// Validações de campos individuais reutilizáveis
export const nomeSchema = z
  .string()
  .min(2, "Nome deve ter no mínimo 2 caracteres")
  .max(100, "Nome deve ter no máximo 100 caracteres")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras");

export const emailSchema = z
  .string()
  .email("Email inválido")
  .max(255, "Email muito longo");

export const senhaSchema = z
  .string()
  .min(8, "Senha deve ter no mínimo 8 caracteres")
  .max(100, "Senha muito longa")
  .regex(/[A-Z]/, "Senha deve conter ao menos uma letra maiúscula")
  .regex(/[a-z]/, "Senha deve conter ao menos uma letra minúscula")
  .regex(/[0-9]/, "Senha deve conter ao menos um número")
  .regex(/[^A-Za-z0-9]/, "Senha deve conter ao menos um caractere especial");

export const telefoneSchema = z
  .string()
  .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Telefone inválido. Use o formato (XX) XXXXX-XXXX")
  .optional();

export const sobrenomeSchema = z
  .string()
  .min(2, "Sobrenome deve ter no mínimo 2 caracteres")
  .max(100, "Sobrenome deve ter no máximo 100 caracteres")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Sobrenome deve conter apenas letras")
  .optional();

export const sobreSchema = z
  .string()
  .max(500, "Descrição muito longa")
  .optional();

export const dataNascimentoSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida. Use o formato AAAA-MM-DD")
  .refine((data) => {
    const dataObj = new Date(data);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataObj.getFullYear();
    return idade >= 13 && idade <= 120;
  }, "Você deve ter entre 13 e 120 anos")
  .optional();

export const urlFotoSchema = z
  .string()
  .url("URL inválida")
  .max(500, "URL muito longa")
  .optional();

// Schemas compostos para diferentes operações

// Cadastro - Etapa 1 (Nome e Email)
export const cadastroEtapa1Schema = z.object({
  nome: nomeSchema,
  email: emailSchema,
});

// Cadastro - Etapa 2 (Senha)
export const cadastroEtapa2Schema = z
  .object({
    senha: senhaSchema,
    confirmaSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmaSenha, {
    message: "As senhas não conferem",
    path: ["confirmaSenha"],
  });

// Cadastro - Completo (para API)
export const cadastroSchema = z.object({
  nome: nomeSchema,
  email: emailSchema,
  senha: senhaSchema,
  id_genero: z.number().int().positive().default(1),
  telefone: telefoneSchema.optional(),
  sobrenome: sobrenomeSchema.optional(),
  data_nascimento: dataNascimentoSchema.optional(),
});

// Login
export const loginSchema = z.object({
  email: emailSchema,
  senha: z.string().min(1, "Senha é obrigatória"),
});

// Atualização de perfil
export const atualizarPerfilSchema = z.object({
  nome: nomeSchema.optional(),
  sobrenome: sobrenomeSchema,
  telefone: telefoneSchema,
  data_nascimento: dataNascimentoSchema,
  sobre: sobreSchema,
  url_foto: urlFotoSchema,
  id_tipo_cabelo: z.number().int().positive().optional(),
});

// Alteração de senha
export const alterarSenhaSchema = z
  .object({
    senhaAtual: z.string().min(1, "Senha atual é obrigatória"),
    novaSenha: senhaSchema,
    confirmaNovaSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmaNovaSenha, {
    message: "As senhas não conferem",
    path: ["confirmaNovaSenha"],
  })
  .refine((data) => data.senhaAtual !== data.novaSenha, {
    message: "A nova senha deve ser diferente da senha atual",
    path: ["novaSenha"],
  });

// Reset de senha
export const solicitarResetSenhaSchema = z.object({
  email: emailSchema,
});

export const resetarSenhaSchema = z
  .object({
    token: z.string().min(1, "Token é obrigatório"),
    novaSenha: senhaSchema,
    confirmaNovaSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmaNovaSenha, {
    message: "As senhas não conferem",
    path: ["confirmaNovaSenha"],
  });

// Verificação de email
export const checkEmailSchema = z.object({
  email: emailSchema,
});

// Tipos TypeScript derivados dos schemas
export type CadastroEtapa1Input = z.infer<typeof cadastroEtapa1Schema>;
export type CadastroEtapa2Input = z.infer<typeof cadastroEtapa2Schema>;
export type CadastroInput = z.infer<typeof cadastroSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AtualizarPerfilInput = z.infer<typeof atualizarPerfilSchema>;
export type AlterarSenhaInput = z.infer<typeof alterarSenhaSchema>;
export type SolicitarResetSenhaInput = z.infer<typeof solicitarResetSenhaSchema>;
export type ResetarSenhaInput = z.infer<typeof resetarSenhaSchema>;
export type CheckEmailInput = z.infer<typeof checkEmailSchema>;
