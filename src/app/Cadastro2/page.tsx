"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/tela-de-cadastro.css";

export default function TelaCadastroSenha() {
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  // Recupera nome e email da tela 1
  useEffect(() => {
    const dados = sessionStorage.getItem("cadastroTemp");
    
    if (dados) {
      try {
        const { nome, email } = JSON.parse(dados);
        setNome(nome);
        setEmail(email);
      } catch (error) {
        console.error("Erro ao ler dados temporários:", error);
        router.push("/cadastro");
      }
    } else {
      router.push("/cadastro");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    // Validações
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmaSenha) {
      setErro("As senhas não conferem!");
      return;
    }

    if (!aceitouTermos) {
      setErro("Você precisa aceitar os termos para continuar!");
      return;
    }

    setCarregando(true);

    try {
      const res = await fetch("/api/usuarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || "Erro ao criar conta.");
        setCarregando(false);
        return;
      }

      // Limpa os dados temporários
      sessionStorage.removeItem("cadastroTemp");

      // Redireciona para login usando router
      router.push("/login?cadastro=sucesso");
    } catch (err) {
      console.error("Erro no cadastro:", err);
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

      <main id="main-margin-cadastro2">
        <section>
          <h1>Agora, crie sua <br />senha!</h1>
          <p>
            Recomenda-se que sua senha seja <strong>forte</strong>, combinando números, 
            <br className="hide-on-mobile" /> letras maiúsculas e minúsculas e caracteres.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              autoComplete="new-password"
              className="padding-form"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              minLength={6}
              required
              disabled={carregando}
            />

            <label htmlFor="csenha">Confirme sua senha</label>
            <input
              type="password"
              id="csenha"
              name="csenha"
              autoComplete="new-password"
              className="padding-form"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              minLength={6}
              required
              disabled={carregando}
            />

            {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}

            <button 
              type="submit" 
              className="botaocontinue"
              disabled={carregando}
            >
              {carregando ? "CRIANDO CONTA..." : "CRIE SUA CONTA"}
            </button>

            <section id="section-checkbox-cadastro">
              <input 
                type="checkbox" 
                id="checkbox-cadastro" 
                name="checkboxt"
                checked={aceitouTermos}
                onChange={(e) => setAceitouTermos(e.target.checked)}
                disabled={carregando}
              />
              <span>aceito os termos de condição para criação da conta</span>
            </section>
          </form>
        </section>
      </main>
    </div>
  );
}