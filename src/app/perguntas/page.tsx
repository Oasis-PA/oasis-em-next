"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/styles/perguntas.css";

const PerguntaPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <main>
      <section className="esquerda">
        <div className="content">
          <button className="seta">
            <img src="/images/perguntas/setinha.png" alt="" />
            <p>Página Inicial</p>
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h1>Pergunta 1/15</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <h2>Como está o nível de hidratação dos seus fios?</h2>
              <h3>Selecione uma resposta</h3>
            </div>
          </div>

          <img id="logo" src="/images/logo.png" alt="" />
        </div>
      </section>

      <section className="direita">
        <div className="conteudo">
          <img src="/images/perguntas/Img principal.png" alt="" />

          <div className="respostas">
            <label>
              <input
                type="radio"
                name="opcao"
                value="1"
                checked={selectedOption === "1"}
                onChange={handleOptionChange}
              />
              Extremamente ressecados, embaraçam facilmente e sem brilho.
            </label>
            <label>
              <input
                type="radio"
                name="opcao"
                value="2"
                checked={selectedOption === "2"}
                onChange={handleOptionChange}
              />
              Ressecados e ásperos ao toque.
            </label>
            <label>
              <input
                type="radio"
                name="opcao"
                value="3"
                checked={selectedOption === "3"}
                onChange={handleOptionChange}
              />
              Macios e com brilho natural.
            </label>
            <label>
              <input
                type="radio"
                name="opcao"
                value="4"
                checked={selectedOption === "4"}
                onChange={handleOptionChange}
              />
              Um pouco ressecados nas pontas.
            </label>
          </div>

          <div className="botoes">

          <Link href="/perguntas/pergunta0" id="number_one">
            Anterior
          </Link>
          <Link href="/perguntas/pergunta2" id="number_two">
            Próximo
          </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PerguntaPage;