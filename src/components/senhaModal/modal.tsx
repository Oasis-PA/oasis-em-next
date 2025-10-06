"use client";

import { useState } from "react";
import "@/styles/SenhaModal.css";

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
        setEmail("");
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
    <div className="senha-modal-overlay" onClick={handleClose}>
      <div className="senha-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="senha-modal-header">
          <h2 className="senha-modal-title">Recuperar Senha</h2>
          
          <button
            onClick={handleClose}
            className="senha-modal-close"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="senha-modal-body">
          <p className="senha-modal-description">
            Digite seu e-mail cadastrado para receber instruções de recuperação de senha.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="senha-form-group">
              <label htmlFor="email" className="senha-form-label">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="senha-form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="senha-btn senha-btn-primary"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </button>
          </form>

          {mensagem && (
            <div className={`senha-message ${sucesso ? 'senha-message-success' : 'senha-message-error'}`}>
              {mensagem}
            </div>
          )}

          {sucesso && (
            <button
              onClick={handleClose}
              className="senha-btn senha-btn-secondary"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
