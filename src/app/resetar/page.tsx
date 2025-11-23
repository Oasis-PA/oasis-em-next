"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "@/styles/resetar.css"; 

export default function ResetarPage() {
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
    <div className="page-resetar-wrapper">
    <main className="main-container">
      <div className="reset-card">
        <h1>Redefinir Senha</h1>
        <form onSubmit={handleReset} className="reset-form">
          <input
            type="password"
            placeholder="Nova senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button
            type="submit"
            className="submit-btn"
          >
            Salvar nova senha
          </button>
        </form>
        {mensagem && <p className="feedback-message">{mensagem}</p>}
      </div>
    </main>
    </div>
  );
}