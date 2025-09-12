"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [lembrar, setLembrar] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, lembrar }),
      });

      const data = await res.json();
      setMensagem(data.message);

      if (res.ok) {

        window.location.href = "/";
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
      setMensagem("Erro no servidor.");
    }
  }

  return (
    <main id="main-margin-login">
      <section>
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
            autoComplete="off"
            className="padding-form"
          />

          <section id="section-checkbox-login">
            <label htmlFor="checkbox-login">
              <input
                type="checkbox"
                id="checkbox-login"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
              />
              <span id="span-lembredemim-login">Lembre de mim</span>
            </label>
            <Link href="#">Esqueceu a senha?</Link>
          </section>

          <button type="submit" className="botaocontinue">
            LOGIN
          </button>
        </form>

        {mensagem && <p style={{ color: "red" }}>{mensagem}</p>}

        <section className="div-linha-ou">
          <div className="lin"></div>
          <p className="div-ou">ou</p>
          <div className="lin"></div>
        </section>

        <section className="botaogoogle">
          <button type="button">
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

        <Link href="/tela-de-cadastro">
          <button id="botaonaoconta">
            NÃO TEM UMA CONTA? CLIQUE AQUI PARA CRIAR.
          </button>
        </Link>
      </section>

      <figure className="figure-padding-login">
        <img
          src="/images/tela-de-cadastro/imagem-tela-login-amarelo.png"
          alt="imagem-tela-login-amarelo"
          width={50}
          height={1049}
        />
      </figure>
    </main>
  );
}
