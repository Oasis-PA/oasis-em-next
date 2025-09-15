"use client";

import React from "react";
import Image from "next/image";
import mulherImg from "../../../public/logo-oasis-icon.ico"; // ajuste o caminho real da imagem

export default function ConfiguracoesPage() {
  return (
    <main>
      <div className="informa">
        <h4>EDITE SEU PERFIL</h4>
        <p>
          Mantenha seus dados pessoais privados. As informações que você
          adiciona aqui ficam visíveis apenas para você.
        </p>
      </div>

      <figure id="perf">
        <Image src={mulherImg} alt="Foto de perfil" />
        <figcaption>
          <p id="foto">Foto</p>
          <p id="Alterar">Alterar</p>
        </figcaption>
      </figure>

      <form method="post" id="form">
        <div className="nome-sobre">
          <div className="campos-texto" id="caixa-nome">
            <p>Nome</p>
            <input type="text" placeholder="Sofia" className="req" />
            <span className="sp">Mínimo 3 caracteres</span>
          </div>

          <div className="campos-texto" id="caixa-sobrenome">
            <p>Sobrenome</p>
            <input type="text" placeholder="Ferreira" className="req" />
            <span className="sp">Mínimo 3 caracteres</span>
          </div>
        </div>

    

        <div className="campos-texto req" id="caixa-sobre">
          <p>Sobre</p>
          <input type="text" placeholder="Fale mais sobre você..." />
        </div>
      </form>
    </main>
  );
}
