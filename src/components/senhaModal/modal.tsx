"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL_TEST!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST!
);

export default function SenhaModal({ isOpen, onClose }: ModalProps) {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setMensagem("Erro ao enviar e-mail: " + error.message);
    } else {
      setMensagem("E-mail enviado! Verifique sua caixa de entrada.");
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Recuperar Senha</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="border w-full p-2 mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>

        {mensagem && <p className="mt-3 text-sm text-gray-700">{mensagem}</p>}
      </div>
    </div>
  );
}
