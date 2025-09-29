// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o usuário
export type UserProfile = {
  id_usuario: number
  nome: string
  sobrenome?: string
  email: string
  telefone?: string
  data_nascimento?: Date
  data_cadastro: Date
  sobre?: string
  genero: {
    nome: string
    sigla: string
  }
  tipo_cabelo?: {
    nome: string
    descricao?: string
  }
}