"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { cadastroEtapa1Schema } from "@/lib/validations";
import "@/styles/tela-de-cadastro.css";

export default function TelaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setErros({});

    try {
      // Validação frontend com Zod
      const dadosValidados = cadastroEtapa1Schema.parse({ nome, email });

      // Verifica se email já existe
      const checkRes = await fetch("/api/usuarios/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: dadosValidados.email }),
      });

      const checkData = await checkRes.json();

      if (!checkRes.ok) {
        setErro(checkData.message || "Email já cadastrado.");
        return;
      }

      // Salva dados temporários e avança
      sessionStorage.setItem("cadastroTemp", JSON.stringify(dadosValidados));
      router.push("/cadastro2");
      
    } catch (err) {
      if (err instanceof ZodError) {
        // Mapeia erros do Zod para o estado
        const novosErros: Record<string, string> = {};
        err.errors.forEach((error) => {
          const campo = error.path[0] as string;
          novosErros[campo] = error.message;
        });
        setErros(novosErros);
      } else {
        setErro("Erro de conexão com servidor.");
      }
    }
  };

  return (
    <div className="page-login-cadastro-wrapper">
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
              onChange={(e) => {
                setNome(e.target.value);
                if (erros.nome) {
                  const { nome, ...rest } = erros;
                  setErros(rest);
                }
              }}
            />
            {erros.nome && <p style={{ color: "red", fontSize: "0.875rem" }}>{erros.nome}</p>}

            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              autoComplete="email"
              className="padding-form"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (erros.email) {
                  const { email, ...rest } = erros;
                  setErros(rest);
                }
              }}
            />
            {erros.email && <p style={{ color: "red", fontSize: "0.875rem" }}>{erros.email}</p>}

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
    </div>
  );
}