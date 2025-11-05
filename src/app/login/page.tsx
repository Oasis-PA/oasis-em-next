"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { loginSchema } from "@/lib/validations";
import "@/styles/tela-de-cadastro.css";
import SenhaModal from "@/components/senhaModal/modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setErros({});
    setCarregando(true);

    try {
      // Validação frontend com Zod
      const dadosValidados = loginSchema.parse({ email, senha });

      const res = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosValidados),
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
          setMensagem(data.message || "Erro ao fazer login");
        }
        setCarregando(false);
        return;
      }

      // Salva dados do usuário no sessionStorage
      if (data.usuario) {
        sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
      }

      // Redireciona para home
      router.push("/");
      
    } catch (err) {
      if (err instanceof ZodError) {
        const novosErros: Record<string, string> = {};
        err.errors.forEach((error) => {
          const campo = error.path[0] as string;
          novosErros[campo] = error.message;
        });
        setErros(novosErros);
      } else {
        setMensagem("Erro de conexão com servidor.");
      }
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
            onChange={(e) => {
              setEmail(e.target.value);
              if (erros.email) {
                const { email, ...rest } = erros;
                setErros(rest);
              }
            }}
            
            autoComplete="email"
            className="padding-form"
          />
          {erros.email && <p style={{ color: "red", fontSize: "0.875rem" }}>{erros.email}</p>}

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              if (erros.senha) {
                const { senha, ...rest } = erros;
                setErros(rest);
              }
            }}
           
            autoComplete="current-password"
            className="padding-form"
          />
          {erros.senha && <p style={{ color: "red", fontSize: "0.875rem" }}>{erros.senha}</p>}

          <section id="section-checkbox-login">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-blue-600 hover:underline"
            >
              Esqueceu a senha?
            </button>
          </section>

          {mensagem && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
              {mensagem}
            </p>
          )}

          <button 
            type="submit" 
            className="botaocontinue"
            disabled={carregando}
          >
            {carregando ? "ENTRANDO..." : "LOGIN"}
          </button>
        </form>

        <section className="div-linha-ou">
          <div className="lin"></div>
          <p className="div-ou">ou</p>
          <div className="lin"></div>
        </section>

        <Link href="/cadastro">
          <button id="botaonaoconta" type="button">
            NÃO TEM UMA CONTA? CLIQUE AQUI PARA CRIAR.
          </button>
        </Link>
      </section>

      <figure id="figure-padding-login">
        <Image
          src="/images/tela-de-cadastro/Imagem-tela-login-amarelo.png"
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