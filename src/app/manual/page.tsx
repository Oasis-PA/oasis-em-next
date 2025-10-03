"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/questionario2.css";

const ManualPage: React.FC = () => {
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
            
            <Link id="voltando" href="/">
              <img src="/images/seta esquerda.png" alt="Seta para a esquerda" width={16} height={16} />Página Inicial
            </Link>
          </div>
          <Image id="img-principal" src="/images/questionario/img-1.png" alt="Imagem Principal" width={300} height={300} />
        </section>
        <section className="direita">
          <div className="conteudo">
            <div id="quiz">Personalizável</div>
            <h1>Manual</h1>
            <p>Prefere ter controle total? No cronograma manual, você escolhe cada etapa, define os dias e organiza como quiser. É ideal para quem já conhece as necessidades do próprio cabelo ou quer liberdade para experimentar e montar o próprio ritmo de cuidados.</p>
            <div className="leia">
              <h4>Leia mais</h4>
              <Image src="/images/seta direita.png" alt="Seta para a esquerda" width={16} height={16} />
            </div>
            <div className="abaixo">
              <Link href="/">
                <button>Faça Agora</button>
              </Link>
              <div className="beneficios">
                <h3>Benefícios</h3>
                <div className="textinhos">
                  <div className="em-cima">
                    <p>Total controle</p>
                    <p>Autonomia no cuidado</p>
                  </div>
                  <div className="em-baixo">
                    <p>Experiência personalizada</p>
                    <p>Flexibilidade total</p>
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

export default ManualPage;