"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/questionario4.css";

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
          <Image id="img-principal" src="/images/questionario/img-3.png" alt="Imagem Principal" width={300} height={300} />
        </section>
        <section className="direita">
          <div className="conteudo">
            <div id="quiz">Escolha</div>
            <h1>Pré-pronto</h1>
            <p>Se você prefere começar agora, sem precisar responder perguntas, o cronograma pré-pronto é ideal. Ele segue uma estrutura padrão testada e eficaz, combinando hidratação, nutrição e reconstrução em uma sequência equilibrada. É perfeito para quem quer praticidade com bons resultados.</p>
            <div className="abaixo">
              <Link href="/">
                <button>Veja cronogramas</button>
              </Link>
              <div className="beneficios">
                <h3>Benefícios</h3>
                <div className="textinhos">
                  <div className="em-cima">
                    <p>Praticidade e agilidade</p>
                    <p>Menos preocupação</p>
                  </div>
                  <div className="em-baixo">
                    <p>Ideal para iniciantes</p>
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