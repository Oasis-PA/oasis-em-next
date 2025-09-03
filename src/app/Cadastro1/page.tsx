// src/app/TelaCadastro/page.tsx
import React from "react";
import Image from "next/image";
import "../../styles/tela de cadastro.css";
import "/assets/fontes.css";
import Link from "next/link";

export default function TelaCadastro() {
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

          <form>
            <label htmlFor="snome">Seu nome</label>
            <input
              type="text"
              id="snome"
              name="snome"
              autoComplete="name"
              className="padding-form"
            />

            <label htmlFor="mail">E-mail</label>
            <input
              type="email"
              id="mail"
              name="email"
              autoComplete="email"
              className="padding-form"
            />

            <a href="tela-de-cadastro-2.html">
              <input
                className="botaocontinue"
                type="button"
                value="CONTINUE"
              />
            </a>
          </form>

          <section className="div-linha-ou">
            <div className="lin"></div>
            <p className="div-ou">ou</p>
            <div className="lin"></div>
          </section>

          <section className="botaogoogle">
            <button>
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

          <a href="tela-login.html">
            <button id="botaojaconta">
              JÁ TEM UMA CONTA? CLIQUE AQUI PARA REGISTRAR.
            </button>
          </a>
        </section>
      </main>
    </div>
  );
}