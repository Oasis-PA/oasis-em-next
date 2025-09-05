import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../../styles/tela de cadastro.css";

const Cadastro2: React.FC = () => {
  return (
    <div>
     <figure className="figure-padding-cadastro">
            <Image
              src="/images/tela-de-cadastro/imagem-tela-login-roxo.png"
              alt="imagem-tela-login-roxo"
              width={8250}
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

          <form>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              autoComplete="off"
              className="padding-form"
            />

            <label htmlFor="csenha">Confirme sua senha</label>
            <input
              type="password"
              id="csenha"
              name="csenha"
              autoComplete="off"
              className="padding-form"
            />

            <Link href="../index.html">
              <input
                className="botaocontinue"
                type="button"
                value="CRIE SUA CONTA"
              />
            </Link>

            <section id="section-checkbox-cadastro">
              <input type="checkbox" id="checkbox-cadastro" name="checkboxt" />
              <span>
                aceito os termos de condição para criação da conta
              </span>
            </section>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Cadastro2;
