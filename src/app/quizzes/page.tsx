"use client";

import React from "react";
import Link from "next/link";
import "@/styles/quizzes.css";

export default function Page() {
  return (
    <main>
      <div className="content">
        <section className="acima">
          <img src="/images/seta esquerda.png" alt="Voltar" />
          <a href="">Página inicial</a>
        </section>

        <section className="abaixo">
          <div className="titulos">
            <h1>Tipos de Quiz</h1>
            <h2>Ache a combinação perfeita para você</h2>
          </div>

          <div className="tit-principal">Qual tipo de cronograma você prefere?</div>

          <div className="tipos">
            <div className="sobe">
              <div className="a">
                <Link href="/questionario">
                    <div id="quadrado">
                      <img src="/images/quizzes/img-1.png" alt="Ilustração de um questionário" />
                      <p>Você responde a perguntas e recebe um cronograma personalizado com base nas suas respostas.</p>
                    </div>
                    <h3>Questionário</h3>
                </Link>
              </div>

              <div className="b">
                <Link href="/manual">
                    <div id="quadrado">
                      <img src="/images/quizzes/img-2.png" alt="Ilustração de ferramentas de construção" />
                      <p>Você monta o cronograma do zero, definindo cada etapa conforme sua preferência.</p>
                    </div>
                    <h3>Manual</h3>
                </Link>
              </div>
            </div>

            <div className="desce">
              <div className="c">
                <Link href="/pre-pronto">
                    <div id="quadrado">
                      <img src="/images/quizzes/img-3.png" alt="Ilustração de caixas prontas para entrega" />
                      <p>Modelos prontos que servem como ponto de partida, ideais para quem quer praticidade e rapidez.</p>
                    </div>
                    <h3>Pré-Pronto</h3>
                </Link>
              </div>

              <div className="d">
                <Link href="/no-seu-perfil">
                    <div id="quadrado">
                      <img src="/images/quizzes/img-4.png" alt="Ilustração de um perfil de usuário" />
                      <p>Criado a partir de dados como hábitos, objetivos ou características pessoais, oferecendo uma experiência mais direcionada.</p>
                    </div>
                    <h3>Com base no seu perfil</h3>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}