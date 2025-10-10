"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function resetar() {
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL_TEST || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    const { error } = await supabase.auth.updateUser({ password: senha });

    if (error) {
      setMensagem(error.message);
    } else {
      setMensagem("Senha atualizada com sucesso! Agora você já pode fazer login.");
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Redefinir Senha</h1>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Nova senha"
            className="border w-full p-2 mb-3 rounded"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Salvar nova senha
          </button>
        </form>
        {mensagem && <p className="mt-3 text-sm text-gray-700">{mensagem}</p>}
      </div>
    </main>
  );
}
