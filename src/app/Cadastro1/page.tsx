"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { signIn } from "next-auth/react";


export default function TelaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      // Chamada para API que verifica se email já existe
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

      // Salva temporariamente para a tela de senha
      sessionStorage.setItem("cadastroTemp", JSON.stringify({ nome, email }));

      // Redireciona para a segunda tela
      router.push("/Cadastro2");
    } catch (err) {
      setErro("Erro de conexão com servidor.");
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
          <h1>Olá, seja bem vindo(a)!</h1>
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

  <section className="botaogoogle">
  <button type="button" onClick={() => signIn("google")}>
    <Image
      src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/google-color.png"
      alt="logogoogle"
      width={30}
      height={30}
    />
    <span className="span-button-continue-google">
      CONTINUE COM O GOOGLE
    </span>
  </button>
</section>


        
            <Link href="/Login">
            <button id="botaojaconta" type="button">
              JÁ TEM UMA CONTA? CLIQUE AQUI PARA REGISTRAR.
            </button></Link>
        
        </section>
      </main>
    </div>
  );
}
