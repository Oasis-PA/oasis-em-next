"use client";

import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SenhaModal({ isOpen, onClose }: ModalProps) {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setSucesso(false);
    setLoading(true);

    try {
      const res = await fetch("/api/usuarios/esqueci-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem(data.message || "E-mail enviado! Verifique sua caixa de entrada.");
        setSucesso(true);
        setEmail(""); // Limpa o campo
      } else {
        setMensagem(data.message || "Erro ao enviar e-mail.");
        setSucesso(false);
      }
    } catch (error) {
      setMensagem("Erro de conexão com o servidor.");
      setSucesso(false);
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setEmail("");
    setMensagem("");
    setSucesso(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white p-6 rounded-lg w-96 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl leading-none"
          aria-label="Fechar"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Recuperar Senha</h2>
        <p className="text-sm text-gray-600 mb-4">
          Digite seu e-mail cadastrado para receber instruções de recuperação de senha.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="border w-full p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>

        {mensagem && (
          <p 
            className={`mt-3 text-sm ${sucesso ? 'text-green-600' : 'text-red-600'}`}
          >
            {mensagem}
          </p>
        )}

        {sucesso && (
          <button
            onClick={handleClose}
            className="w-full mt-3 bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition"
          >
            Fechar
          </button>
        )}
      </div>
    </div>
  );
}