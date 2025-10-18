"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/questionario3.css";

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
          <Image id="img-principal" src="/images/questionario/img-4.png" alt="Imagem Principal" width={300} height={300} />
        </section>
        <section className="direita">
          <div className="conteudo">
            <div id="quiz">Personalizável</div>
            <h1>Com base no seu perfil</h1>
            <p>Esse modelo usa informações básicas obtidas com a análise de seu perfil após o login. Não é necessário responder perguntas, mas ainda assim você recebe um plano mais direcionado, pensado para perfis semelhantes ao seu.</p>
            <div className="abaixo">
              <Link href="/">
                <button>Descubra seu cronograma</button>
              </Link>
              <div className="beneficios">
                <h3>Benefícios</h3>
                <div className="textinhos">
                  <div className="em-cima">
                    <p>Escolha de tratamentos fácil</p>
                    <p>Personalização simplificada</p>
                  </div>
                  <div className="em-baixo">
                    <p>Rápido e eficaz</p>
                    <p>Ideal para necessidades específicas</p>
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