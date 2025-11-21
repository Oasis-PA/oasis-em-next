"use client";

import React from 'react';
import Link from 'next/link'; 
import { Header, Footer } from "@/components";
import '@/styles/cortes-geral.css';

export default function cortegeral() {
  return (
    <div className="page-cortes-wrapper">
    <Header/>
    <section className='voce_procura'>
          <img src="/images/cortes-geral/temos.png" alt="" />
          <div className="texto-procura">
            <h1 className='temos'>Temos o que voce procura</h1>
            <p className='mudar_visual'>Deseja mudar o visual mas não sabe o que fazer? Te apresentamos as melhores inspirações a seguir</p>
          </div>
    </section>
        
      <main className="container">
        
        
        <h1 id="h1-melhorescortes">Melhores Cortes</h1>
        <p className="p1">
          Para aqueles que desejam mudar a aparência e só<br className="desktop-only" /> precisam de uma inspiração.
        </p>
        
        <section className="section-artigos">   
          <img src="/images/cortes-geral/imagem-artigo1.png" alt="imagem-artigo1" />
          <div className="div-artigo">
            <h1 className="h1-tituloartigo">Melhores tipos de <br className="desktop-only"/>finalização</h1>
            <p className="p2">
              Quer finalizar seus cachos como uma profissional? 
              Invista em você! Clique abaixo e descubra as melhores 
              técnicas de finalização que deixam os cabelos definidos, 
              soltos e lindos por muito mais tempo!
            </p>
            <button className="button1"><Link href='artigo/melhores-tipos-de-finalizacao'>DESCUBRA</Link></button>
          </div>
        </section>
        
        <section className="section-artigos">
          <div id="div-artigo2">
            <h1 className="h1-tituloartigo">Cabelos masculinos crespos: <br className="desktop-only" />guia completo de cuidados</h1>
            <p className="p2">
             Está cansado de cabelos ressecados e sem forma? Invista em você! 
             Clique abaixo e descubra o guia completo para cabelos crespos 
             masculinos, com cuidados, produtos e técnicas para fios impecáveis!
            </p>
            <button className="button1"><Link href='artigo/cabelos-masculinos-crespos'>DESCUBRA</Link></button>
          </div>
          <img src="/images/cortes-geral/imagem-artigo2.png" alt="imagem-artigo2" />
        </section>

        <section className="section-artigos">
          <img src="/images/cortes-geral/imagem-artigo3.png" alt="imagem-artigo3" />
          <div className="div-artigo">
            <h1 className="h1-tituloartigo">Cortes que valorizam <br className="desktop-only" />o rosto redondo</h1>
            <p className="p2">
             Não sabe qual corte combina com seu rosto? Invista em você! Clique abaixo 
             e descubra os cortes que valorizam o rosto redondo, alongam o visual e realçam 
             sua beleza natural. Transformação garantida!
            </p>
            <button className="button1"><Link href='artigo/cortes-que-valorizam-o-rosto-redondo'>DESCUBRA</Link></button>
          </div>
        </section>
      </main>

      <section id="section-maisvisitados">
        <h1 id="h1-maisvisitados">Mais visitados</h1>
        <p id="p3">Veja o que mais bombou essa semana quando se trata de cortes de cabelo.</p>
        <div id="div-maisvisitados">
          <div className="esquerda">
            <Link href="#" id="img1"><img src="/images/cortes-geral/corte1.png" alt="imagem-corte1" /></Link>
          </div>
          <div className="direita">
            <div className="topo">
              <Link href="#" id="img2" ><img src="/images/cortes-geral/corte2.png" alt="imagem-corte2" /></Link>
              <Link href="#" id="img3" ><img src="/images/cortes-geral/corte3.png" alt="imagem-corte3" /></Link>
            </div>
            <div className="base">
              <Link href="#" id="img4"><img src="/images/cortes-geral/corte4.png" alt="imagem-corte4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="section-sugestaocortes">
        <div id="div-titulos">
          <h1 id="h1-cabelos">CABELOS VOLUMOSOS, CURTOS OU <br className="desktop-only" />COM DREAD - SEJA SUA MELHOR VERSÃO EM 2025</h1>
        </div>
        <div id="div-imagens">
          <Link href="#"><img src="/images/cortes-geral/sugestao-corte (1).png" alt="sugestaocorte1" /></Link>
          <Link href="#"><img src="/images/cortes-geral/sugestao-corte (2).png" alt="sugestaocorte2" /></Link>
          <Link href="#"><img src="/images/cortes-geral/sugestao-corte (3).png" alt="sugestaocorte3" /></Link>
          <Link href="#"><img src="/images/cortes-geral/sugestao-corte (4).png" alt="sugestaocorte4" /></Link>
        </div>
        <div id="div-botaoseta">
          <button id="button2">VEJA MAIS</button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};