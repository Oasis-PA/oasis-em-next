"use client";

import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function senhaModal({ isOpen, onClose }: ModalProps) {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMensagem(data.message);
    } catch (err) {
      setMensagem("Erro ao enviar e-mail.");
    }
  }

  // Não renderiza nada se não estiver aberto
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
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Enviar link de recuperação
          </button>
        </form>

        {mensagem && <p className="mt-3 text-sm text-gray-700">{mensagem}</p>}
      </div>
    </div>
  );
}
