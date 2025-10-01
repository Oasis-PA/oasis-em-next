"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/tela-de-cadastro.css";

export default function TelaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    // Validações básicas
    if (nome.trim().length < 3) {
      setErro("O nome deve ter pelo menos 3 caracteres.");
      setCarregando(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro("Digite um e-mail válido.");
      setCarregando(false);
      return;
    }

    try {
      const res = await fetch("/api/usuarios/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || "Erro ao verificar email.");
        setCarregando(false);
        return;
      }

      // Salva temporariamente no sessionStorage para a próxima tela
      sessionStorage.setItem("cadastroTemp", JSON.stringify({ nome: nome.trim(), email: email.toLowerCase() }));
      
      // Redireciona para tela 2
      router.push("/cadastro2");
    } catch (err) {
      console.error("Erro na verificação:", err);
      setErro("Erro de conexão com servidor.");
      setCarregando(false);
    }
  };

  return (
    <div className="tela-cadastro-container">
      <figure className="figure-padding-cadastro">
        <Image
          src="/images/tela-de-cadastro/imagem-tela-login-roxo.png"
          alt="imagem-tela-login-roxo"
          width={850}
          height={1049}
          style={{ objectFit: "contain" }}
        />
      </figure>

      <main id="main-margin-cadastro">
        <section>
          <h1>Olá, seja bem <br />vindo(a)!</h1>
          <p>
            Insira suas informações pessoais ou <br className="hide-on-mobile" />{" "}
            <strong>faça</strong> o registro
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="snome">Seu nome</label>
            <input
              type="text"
              id="snome"
              name="snome"
              autoComplete="name"
              className="padding-form"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              minLength={3}
              required
              disabled={carregando}
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="padding-form"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={carregando}
            />

            {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}

            <button 
              type="submit" 
              className="botaocontinue"
              disabled={carregando}
            >
              {carregando ? "VERIFICANDO..." : "CONTINUE"}
            </button>
          </form>

          <section className="div-linha-ou">
            <div className="lin"></div>
            <p className="div-ou">ou</p>
            <div className="lin"></div>
          </section>

          <Link href="/login">
            <button id="botaojaconta" type="button" disabled={carregando}>
              JÁ TEM UMA CONTA? CLIQUE AQUI PARA REGISTRAR.
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}