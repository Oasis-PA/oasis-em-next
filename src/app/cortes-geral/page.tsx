import React from 'react';
import Link from 'next/link'; 

import '@/styles/cortes-geral.css';

export default function cortegeral() {
  return (
    <>
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
            <h1 className="h1-tituloartigo">APOSTE EM MAQUIAGENS <br className="desktop-only" />OUSADAS!</h1>
            <p className="p2">
              Está cansada das mesmas makes monótonas e sem
              brilho em toda festa? Veja agora mesmo 10 maquiagens
              para inovar e arrasar no visual! Aposte também em 
              produtos que não danifiquem sua pele e preservem sua 
              beleza natural.
            </p>
            <button className="button1">DESCUBRA</button>
          </div>
        </section>
        
        <section className="section-artigos">
          <div id="div-artigo2">
            <h1 className="h1-tituloartigo">APOSTE EM MAQUIAGENS <br className="desktop-only" />OUSADAS!</h1>
            <p className="p2">
              Está cansada das mesmas makes monótonas e sem
              brilho em toda festa? Veja agora mesmo 10 maquiagens
              para inovar e arrasar no visual! Aposte também em 
              produtos que não danifiquem sua pele e preservem sua 
              beleza natural.
            </p>
            <button className="button1">DESCUBRA</button>
          </div>
          <img src="/images/cortes-geral/imagem-artigo2.png" alt="imagem-artigo2" />
        </section>

        <section className="section-artigos">
          <img src="/images/cortes-geral/imagem-artigo3.png" alt="imagem-artigo3" />
          <div className="div-artigo">
            <h1 className="h1-tituloartigo">APOSTE EM MAQUIAGENS <br className="desktop-only" />OUSADAS!</h1>
            <p className="p2">
              Está cansada das mesmas makes monótonas e sem
              brilho em toda festa? Veja agora mesmo 10 maquiagens
              para inovar e arrasar no visual! Aposte também em
              produtos que não danifiquem sua pele e preservem sua 
              beleza natural.
            </p>
            <button className="button1">DESCUBRA</button>
          </div>
        </section>
      </main>

      <section id="section-maisvisitados">
        <h1 id="h1-maisvisitados">Mais visitados</h1>
        <p id="p3">Veja o que mais bombou essa semana quando se trata de cortes de cabelo.</p>
        <div id="div-maisvisitados">
          <div className="esquerda">
            <Link href="#" id="img1"><img src="/images/corteS/corte1.png" alt="imagem-corte1" /></Link>
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
          <h1 id="h1-cabelos">CABELOS VOLUMOSOS, CURTOS OU<br className="desktop-only" />COM DREAD - SEJA SUA MELHOR VERSÃO EM 2025</h1>
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
    </>
  );
};