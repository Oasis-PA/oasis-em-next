"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";


export default function TelaCadastroSenha() {
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();


  // Recupera nome e email da tela 1
  useEffect(() => {
    const dados = sessionStorage.getItem("cadastroTemp");
    console.log("Lido do sessionStorage:", dados); // debug

    if (dados) {
      const { nome, email } = JSON.parse(dados);
      setNome(nome);
      setEmail(email);
    } else {
      // Se não houver dados, redireciona de volta para a tela 1
      router.push("/Cadastro1");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmaSenha) {
      setErro("As senhas não conferem!");
      return;
    }

    // valida se aceitou os termos
    const checkbox = document.getElementById("checkbox-cadastro") as HTMLInputElement;
    if (!checkbox?.checked) {
      setErro("Você precisa aceitar os termos para continuar!");
      return;
    }

    try {
      const res = await fetch("/api/usuarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || "Erro ao criar conta.");
        return;
      }

      // limpa os dados temporários
      sessionStorage.removeItem("cadastroTemp");

      // redireciona para login (ou home)
      location.href = "/";
     // router.push("/");
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

      <main id="main-margin-cadastro2">
        <section>
          <h1>Agora, crie sua senha!</h1>
          <p>
            sua senha deve ser <strong>forte</strong>, contendo números,{" "}
            <br className="hide-on-mobile" /> letras maiúsculas e minúsculas e
            caracteres.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              autoComplete="off"
              className="padding-form"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <label htmlFor="csenha">Confirme sua senha</label>
            <input
              type="password"
              id="csenha"
              name="csenha"
              autoComplete="off"
              className="padding-form"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              required
            />

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <button type="submit" className="botaocontinue">
              CRIE SUA CONTA
            </button>

            <section id="section-checkbox-cadastro">
              <input type="checkbox" id="checkbox-cadastro" name="checkboxt" />
              <span>aceito os termos de condição para criação da conta</span>
            </section>
          </form>
        </section>
      </main>
    </div>
  );
}
