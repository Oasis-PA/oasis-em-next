"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import styles from "@/styles/resetar.module.css";

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
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        <div className={styles.resetCard}>
          {/* Adicionada classe direta 'title' ao invés de depender de cascata */}
          <h1 className={styles.title}>Redefinir Senha</h1>
          
          <form onSubmit={handleReset} className={styles.resetForm}>
            <input
              type="password"
              placeholder="Nova senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className={styles.inputField}
            />
            <button
              type="submit"
              className={styles.submitBtn}
            >
              Salvar nova senha
            </button>
          </form>
          
          {mensagem && <p className={styles.feedbackMessage}>{mensagem}</p>}
        </div>
      </main>
    </div>
  );
}