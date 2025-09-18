"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import "@/styles/tela-de-cadastro.css"; 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogIn, LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


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

   const handleLoginClick = async () => {
      await signIn("google");
    };
  
    const handleLogoutClick = async () => {
      await signOut();
    };
  
     const { status, data } = useSession();

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

            {status === "authenticated" && data?.user && (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 py-4">
              <Avatar>
                <AvatarFallback>
                  {data.user.name?.[0].toUpperCase()}
                </AvatarFallback>

                {data.user.image && <AvatarImage src={data.user.image} />}
              </Avatar>

              <div className="flex flex-col">
                <p className="font-medium">{data.user.name}</p>
              </div>
            </div>

            <Separator />
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {status === "unauthenticated" && (
            <Button
              onClick={handleLoginClick}
              className="w-full justify-start gap-2"
            >
              <LogInIcon size={16} />
              Fazer Login
            </Button>
          )}

          {status === "authenticated" && (
            <Button
              onClick={handleLogoutClick}
              className="w-full justify-start gap-2"
            >
              <LogOutIcon size={16} />
              Fazer Logout
            </Button>
            )}
            </div>

        </section>

        <Link href="/Cadastro1">
          <button id="botaonaoconta">
            NÃO TEM UMA CONTA? CLIQUE AQUI PARA CRIAR.
          </button>
        </Link>
      </section>

     <figure id="figure-padding-login">
    <img
        src="/images/tela-de-cadastro/imagem-tela-login-amarelo.png"
        alt="imagem-tela-login-amarelo"
            
    />
</figure>
    </main>
  );
}
