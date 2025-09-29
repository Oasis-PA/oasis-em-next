"use client";

import React, { useState, useEffect } from "react"; // Adicione useEffect aqui
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link"
import "@/styles/tela-de-cadastro.css";


export default function TelaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

 useEffect(() => {
  return () => {
    // SISTEMA DE RECARGA: Marca que está voltando do cadastro
    sessionStorage.setItem('voltandoDoCadastro', 'true');
  };
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("/api/usuarios/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || "Erro ao verificar email.");
        return;
      }

      sessionStorage.setItem("cadastroTemp", JSON.stringify({ nome, email }));
      router.push("/Cadastro2");
    } catch (err) {
      setErro("Erro de conexão com servidor.");
    }
  };

  return (
    <div className="tela-cadastro-container">
      {/* Resto do seu código permanece igual */}
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
          <h1>Olá, seja bem <br></br>vindo(a)!</h1>
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
              required
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
            />

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <button type="submit" className="botaocontinue">
              CONTINUE
            </button>
          </form>

          <section className="div-linha-ou">
            <div className="lin"></div>
            <p className="div-ou">ou</p>
            <div className="lin"></div>
          </section>

          <Link href="/login">
            <button id="botaojaconta" type="button">
              JÁ TEM UMA CONTA? CLIQUE AQUI PARA REGISTRAR.
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}