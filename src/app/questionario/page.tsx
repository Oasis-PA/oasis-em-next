"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/questionario1.css";

const QuestionarioPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setSelectedOption(null);
    };
  }, []);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <main>
        <section className="esquerda">
          <div className="voltar">
            
            <Link id="voltando" href="/"><img src="/images/seta esquerda.png" alt="Seta para a esquerda" width={16} height={16} />Página Inicial</Link>
          </div>
          <Image id="img-principal" src="/images/questionario/img-2.png" alt="Imagem Principal" width={300} height={300} />
        </section>
        <section className="direita">
          <div className="conteudo">
            <div id="quiz">Quiz</div>
            <h1>Questionário</h1>
            <p>Nesse tipo de cronograma, o primeiro passo é responder a uma série de perguntas sobre sua rotina, objetivos, tempo disponível e preferências. A partir dessas respostas, o sistema utiliza algoritmos para montar automaticamente um plano personalizado, ajustado às suas necessidades. Depois, você revisa o cronograma sugerido e pode fazer ajustes finos antes de começar a seguir.</p>
            <div className="leia">
              <h4>Leia mais</h4>
              <Image src="/images/seta direita.png" alt="Seta para a esquerda" width={16} height={16} />
            </div>
            <div className="abaixo">
              <Link href="/perguntas">
                <button>Faça Agora</button>
              </Link>
              <div className="beneficios">
                <h3>Benefícios</h3>
                <div className="textinhos">
                  <div className="em-cima">
                    <p>Personalização Rápida</p>
                    <p>Adaptação automática ao perfil</p>
                  </div>
                  <div className="em-baixo">
                    <p>Economia de Tempo</p>
                    <p>Ideal para quem não sabe onde começar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default QuestionarioPage;