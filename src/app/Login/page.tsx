"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/tela-de-cadastro.css";
import SenhaModal from "@/components/senhaModal/modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const res = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensagem(data.message || "Erro ao fazer login");
        setCarregando(false);
        return;
      }

      // Salva dados do usuário no sessionStorage
      if (data.usuario) {
        sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
      }

      // Redireciona para dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro ao logar:", err);
      setMensagem("Erro de conexão com servidor.");
      setCarregando(false);
    }
  }

  return (
    <main id="main-margin-login">
      <section id="gambiarra">
        <h1>Olá, seja bem vindo(a)!</h1>
        <p>
          Insira suas informações de registro ou{" "}
          <br className="hide-on-mobile" /> <strong>crie</strong> sua conta
        </p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="padding-form"
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            autoComplete="current-password"
            className="padding-form"
          />

          <section id="section-checkbox-login">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-blue-600 hover:underline"
            >
              Esqueceu a senha?
            </button>
          </section>

          <button 
            type="submit" 
            className="botaocontinue"
            disabled={carregando}
          >
            {carregando ? "ENTRANDO..." : "LOGIN"}
          </button>
        </form>

        {mensagem && (
          <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            {mensagem}
          </p>
        )}

        <section className="div-linha-ou">
          <div className="lin"></div>
          <p className="div-ou">ou</p>
          <div className="lin"></div>
        </section>

        <Link href="/cadastro">
          <button id="botaonaoconta">
            NÃO TEM UMA CONTA? CLIQUE AQUI PARA CRIAR.
          </button>
        </Link>
      </section>

      <figure id="figure-padding-login">
        <Image
          src="/images/tela-de-cadastro/imagem-tela-login-amarelo.png"
          alt="imagem-tela-login-amarelo"
          width={850}
          height={1049}
          style={{ objectFit: "contain" }}
        />
      </figure>

      <SenhaModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}