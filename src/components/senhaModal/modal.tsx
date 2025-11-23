"use client";

import { useState } from "react";
// Importação do CSS Module
import styles from "@/styles/senhamodal.module.css";

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
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Recuperar Senha</h2>
          
          <button
            onClick={handleClose}
            className={styles.closeBtn}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <p className={styles.description}>
            Digite seu e-mail cadastrado para receber instruções de recuperação de senha.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={loading}
            >
              {/* Span adicionado para garantir o z-index correto sobre o efeito hover do CSS */}
              <span>
                {loading ? "Enviando..." : "Enviar link de recuperação"}
              </span>
            </button>
          </form>

          {mensagem && (
            <div
              className={`${styles.message} ${
                sucesso ? styles.messageSuccess : styles.messageError
              }`}
            >
              {mensagem}
            </div>
          )}

          {sucesso && (
            <button
              onClick={handleClose}
              className={styles.btnSecondary}
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}