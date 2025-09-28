"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/quizzes.css";

export default function Page() {
  React.useEffect(() => {
    return () => {
    };
  }, []);
  return (
    <main>
      <div className="content">
        <section className="acima">
          <img src="/images/seta esquerda.png" alt="" />
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
                <Link href="/questionario" legacyBehavior>
                  <a>
                    <div id="quadrado">
                      <img src="/images/quizzes/img-1.png" alt="" />
                      <p>Você responde a perguntas e recebe um cronograma personalizado com base nas suas respostas.</p>
                    </div>
                    <h3>Questionário</h3>
                  </a>
                </Link>
              </div>

              <div className="b">
                <Link href="/manual" legacyBehavior>
                  <a>
                    <div id="quadrado">
                      <img src="/images/quizzes/img-2.png" alt="" />
                      <p>Você monta o cronograma do zero, definindo cada etapa conforme sua preferência.</p>
                    </div>
                    <h3>Manual</h3>
                  </a>
                </Link>
              </div>
            </div>

            <div className="desce">
              <div className="c">
                <Link href="/pre-pronto" legacyBehavior>
                  <a>
                    <div id="quadrado">
                      <img src="/images/quizzes/img-3.png" alt="" />
                      <p>Modelos prontos que servem como ponto de partida, ideais para quem quer praticidade e rapidez.</p>
                    </div>
                    <h3>Pré-Pronto</h3>
                  </a>
                </Link>
              </div>

              <div className="d">
                <Link href="/no-seu-perfil" legacyBehavior>
                  <a>
                    <div id="quadrado">
                      <img src="/images/quizzes/img-4.png" alt="" />
                      <p>Criado a partir de dados como hábitos, objetivos ou características pessoais, oferecendo uma experiência mais direcionada.</p>
                    </div>
                    <h3>Com base no seu perfil</h3>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
