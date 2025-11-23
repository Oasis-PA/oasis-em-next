"use client";

import React from 'react';
import Link from 'next/link';
import { Header, Footer } from "@/components";
// Importação do CSS Module
import styles from '@/styles/cortes-geral.module.css';

export default function CorteGeral() {
  return (
    <div className={styles.wrapper}>
      <Header/>
      
      <section className={styles.voceProcura}>
        <img src="/images/cortes-geral/temos.png" alt="" />
        <div className={styles.textoProcura}>
          <h1 className={styles.temos}>Temos o que voce procura</h1>
          <p className={styles.mudarVisual}>
            Deseja mudar o visual mas não sabe o que fazer? Te apresentamos as melhores inspirações a seguir
          </p>
        </div>
      </section>
        
      <main className={styles.container}>
        
        <h1 className={styles.h1MelhoresCortes}>Melhores Cortes</h1>
        <p className={styles.p1}>
          Para aqueles que desejam mudar a aparência e só<br className={styles.desktopOnly} /> precisam de uma inspiração.
        </p>
        
        {/* Artigo 1 */}
        <section className={styles.sectionArtigos}>   
          <img src="/images/cortes-geral/imagem-artigo1.png" alt="imagem-artigo1" />
          <div className={styles.divArtigo}>
            <h1 className={styles.h1TituloArtigo}>
              Melhores tipos de <br className={styles.desktopOnly}/>finalização
            </h1>
            <p className={styles.p2}>
              Quer finalizar seus cachos como uma profissional? 
              Invista em você! Clique abaixo e descubra as melhores 
              técnicas de finalização que deixam os cabelos definidos, 
              soltos e lindos por muito mais tempo!
            </p>
            <button className={styles.button1}>
              <Link href='artigo/melhores-tipos-de-finalizacao'>DESCUBRA</Link>
            </button>
          </div>
        </section>
        
        {/* Artigo 2 - Note o uso de className para divArtigo2 em vez de ID */}
        <section className={styles.sectionArtigos}>
          <div className={styles.divArtigo2}>
            <h1 className={styles.h1TituloArtigo}>
              Cabelos masculinos crespos: <br className={styles.desktopOnly} />guia completo de cuidados
            </h1>
            <p className={styles.p2}>
             Está cansado de cabelos ressecados e sem forma? Invista em você! 
             Clique abaixo e descubra o guia completo para cabelos crespos 
             masculinos, com cuidados, produtos e técnicas para fios impecáveis!
            </p>
            <button className={styles.button1}>
              <Link href='artigo/cabelos-masculinos-crespos'>DESCUBRA</Link>
            </button>
          </div>
          <img src="/images/cortes-geral/imagem-artigo2.png" alt="imagem-artigo2" />
        </section>

        {/* Artigo 3 */}
        <section className={styles.sectionArtigos}>
          <img src="/images/cortes-geral/imagem-artigo3.png" alt="imagem-artigo3" />
          <div className={styles.divArtigo}>
            <h1 className={styles.h1TituloArtigo}>
              Cortes que valorizam <br className={styles.desktopOnly} />o rosto redondo
            </h1>
            <p className={styles.p2}>
             Não sabe qual corte combina com seu rosto? Invista em você! Clique abaixo 
             e descubra os cortes que valorizam o rosto redondo, alongam o visual e realçam 
             sua beleza natural. Transformação garantida!
            </p>
            <button className={styles.button1}>
              <Link href='artigo/cortes-que-valorizam-o-rosto-redondo'>DESCUBRA</Link>
            </button>
          </div>
        </section>
      </main>

      <section className={styles.sectionMaisVisitados}>
        <h1 className={styles.h1MaisVisitados}>Mais visitados</h1>
        <p className={styles.p3}>Veja o que mais bombou essa semana quando se trata de cortes de cabelo.</p>
        <div className={styles.divMaisVisitados}>
          <div className={styles.esquerda}>
            {/* IDs transformados em classes para layout de Grid/Flex */}
            <Link href="#" className={styles.img1}>
              <img src="/images/cortes-geral/corte1.png" alt="imagem-corte1" />
            </Link>
          </div>
          <div className={styles.direita}>
            <div className={styles.topo}>
              <Link href="#" className={styles.img2}>
                <img src="/images/cortes-geral/corte2.png" alt="imagem-corte2" />
              </Link>
              <Link href="#" className={styles.img3}>
                <img src="/images/cortes-geral/corte3.png" alt="imagem-corte3" />
              </Link>
            </div>
            <div className={styles.base}>
              <Link href="#" className={styles.img4}>
                <img src="/images/cortes-geral/corte4.png" alt="imagem-corte4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionSugestaoCortes}>
        <div className={styles.divTitulos}>
          <h1 className={styles.h1Cabelos}>
            CABELOS VOLUMOSOS, CURTOS OU <br className={styles.desktopOnly} />COM DREAD - SEJA SUA MELHOR VERSÃO EM 2025
          </h1>
        </div>
        <div className={styles.divImagens}>
          <Link href="#"><img src="/images/cortes-geral/sugestao-corte (1).png" alt="sugestaocorte1" /></Link>
          <Link href="#"><img src="/images/cortes-geral/sugestao-corte (2).png" alt="sugestaocorte2" /></Link>
          <Link href="#"><img src="/images/cortes-geral/sugestao-corte (3).png" alt="sugestaocorte3" /></Link>
          <Link href="#"><img src="/images/cortes-geral/sugestao-corte (4).png" alt="sugestaocorte4" /></Link>
        </div>
        <div className={styles.divBotaoseta}>
          <button className={styles.button2}>VEJA MAIS</button>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
}