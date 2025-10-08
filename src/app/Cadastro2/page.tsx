"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import "@/styles/tela-de-cadastro.css";

// Schema de validação para senha
const senhaSchema = z.object({
  senha: z.string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter ao menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter ao menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter ao menos um número")
    .regex(/[^A-Za-z0-9]/, "Senha deve conter ao menos um caractere especial"),
  confirmaSenha: z.string(),
}).refine((data) => data.senha === data.confirmaSenha, {
  message: "As senhas não conferem",
  path: ["confirmaSenha"],
});

export default function TelaCadastroSenha() {
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Recupera nome e email da tela 1
  useEffect(() => {
    const dados = sessionStorage.getItem("cadastroTemp");
    
    if (dados) {
      const { nome, email } = JSON.parse(dados);
      setNome(nome);
      setEmail(email);
    } else {
      router.push("/cadastro");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setErros({});

    try {
      // Validação com Zod
      const dadosValidados = senhaSchema.parse({ senha, confirmaSenha });

      // Valida checkbox de termos
      const checkbox = document.getElementById("checkbox-cadastro") as HTMLInputElement;
      if (!checkbox?.checked) {
        setErro("Você precisa aceitar os termos para continuar!");
        return;
      }

      // Envia para API
      const res = await fetch("/api/usuarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          nome, 
          email, 
          senha: dadosValidados.senha,
          id_genero: 1 // Default
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const novosErros: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            novosErros[err.campo] = err.mensagem;
          });
          setErros(novosErros);
        } else {
          setErro(data.message || "Erro ao criar conta.");
        }
        return;
      }

      // Limpa dados temporários
      sessionStorage.removeItem("cadastroTemp");

      // Redireciona para login
      location.href = "/login";
      
    } catch (err) {
      if (err instanceof ZodError) {
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
              onChange={(e) => {
                setSenha(e.target.value);
                if (erros.senha) {
                  const { senha, ...rest } = erros;
                  setErros(rest);
                }
              }}
              required
            />
            {erros.senha && <p style={{ color: "red", fontSize: "0.875rem" }}>{erros.senha}</p>}

            <label htmlFor="csenha">Confirme sua senha</label>
            <input
              type="password"
              id="csenha"
              name="csenha"
              autoComplete="new-password"
              className="padding-form"
              value={confirmaSenha}
              onChange={(e) => {
                setConfirmaSenha(e.target.value);
                if (erros.confirmaSenha) {
                  const { confirmaSenha, ...rest } = erros;
                  setErros(rest);
                }
              }}
              required
            />
            {erros.confirmaSenha && <p style={{ color: "red", fontSize: "0.875rem" }}>{erros.confirmaSenha}</p>}

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