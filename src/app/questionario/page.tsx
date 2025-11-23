"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// IMPORTANTE: Importar 'styles' como um objeto
import styles from "@/styles/questionario1.module.css";

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
    // CSS: .pageQuestionario1Wrapper
    <div className={styles.pageQuestionario1Wrapper}>

      {/* CSS: .main */}
      <main className={styles.main}>
        
        {/* CSS: .esquerda */}
        <section className={styles.esquerda}>
          
          {/* CSS: .voltar */}
          <div className={styles.voltar}>
            <Link href="/" className={styles.voltando}>
              {/* CSS: .voltarIcon */}
              <img 
                src="/images/seta esquerda.png" 
                alt="Seta para a esquerda" 
                className={styles.voltarIcon}
                width={16} 
                height={16} 
              />
              {/* CSS: .voltarLink (Envolvi o texto em um span para aplicar o estilo de texto/hover) */}
              <span className={styles.voltarLink}>Página Inicial</span>
            </Link>
          </div>

          {/* CSS: .imgPrincipal */}
          <Image 
            className={styles.imgPrincipal} 
            src="/images/questionario/img-2.png" 
            alt="Imagem Principal" 
            width={300} 
            height={300} 
          />
        </section>

        {/* CSS: .direita */}
        <section className={styles.direita}>
          
          {/* CSS: .conteudo */}
          <div className={styles.conteudo}>
            
            {/* CSS: .quizTag (era id="quiz") */}
            <div className={styles.quizTag}>Quiz</div>
            
            {/* CSS: .title */}
            <h1 className={styles.title}>Questionário</h1>
            
            {/* CSS: .description */}
            <p className={styles.description}>
              Nesse tipo de cronograma, o primeiro passo é responder a uma série de perguntas sobre sua rotina, objetivos, tempo disponível e preferências. A partir dessas respostas, o sistema utiliza algoritmos para montar automaticamente um plano personalizado, ajustado às suas necessidades. Depois, você revisa o cronograma sugerido e pode fazer ajustes finos antes de começar a seguir.
            </p>

            {/* CSS: .abaixo */}
            <div className={styles.abaixo}>
              <Link href="/perguntas">
                {/* CSS: .startButton */}
                <button className={styles.startButton}>Faça Agora</button>
              </Link>

              {/* CSS: .beneficios */}
              <div className={styles.beneficios}>
                
                {/* CSS: .beneficiosTitle */}
                <h3 className={styles.beneficiosTitle}>Benefícios</h3>
                
                {/* CSS: .textinhos */}
                <div className={styles.textinhos}>
                  <div className="em-cima">
                    {/* CSS: .beneficiosText */}
                    <p className={styles.beneficiosText}>Personalização Rápida</p>
                    <p className={styles.beneficiosText}>Adaptação automática ao perfil</p>
                  </div>
                  <div className="em-baixo">
                    {/* CSS: .beneficiosText */}
                    <p className={styles.beneficiosText}>Economia de Tempo</p>
                    <p className={styles.beneficiosText}>Ideal para quem não sabe onde começar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QuestionarioPage;