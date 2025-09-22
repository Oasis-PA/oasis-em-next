import React from 'react';
import Link from 'next/link'; // Usando o componente Link para navegação otimizada

// Importando a folha de estilos. Ajuste o caminho se necessário.
import '@/styles/CorteS.css';

const CortesPage: React.FC = () => {
  return (
    <>
      <main className="container">
        <h1 id="h1-melhorescortes">Melhores Cortes</h1>
        <p className="p1">
          Para aqueles que desejam mudar a aparência e só<br className="desktop-only" /> precisam de uma inspiração.
        </p>
        
        <section className="section-artigos">   
          <img src="/images/corteS/imagem-artigo1.png" alt="imagem-artigo1" />
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
          <img src="/images/corteS/imagem-artigo2.png" alt="imagem-artigo2" />
        </section>

        <section className="section-artigos">
          <img src="/images/corteS/imagem-artigo3.png" alt="imagem-artigo3" />
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
          <Link href="#" id="img1"><img src="/images/corteS/corte1.png" alt="imagem-corte1" /></Link>
          <Link href="#"><img src="/images/corteS/corte2.png" alt="imagem-corte2" /></Link>
          <Link href="#"><img src="/images/corteS/corte3.png" alt="imagem-corte3" /></Link>
          <Link href="#" id="img4"><img src="/images/corteS/corte4.png" alt="imagem-corte4" /></Link>
        </div>
      </section>

      <section id="section-sugestaocortes">
        <div id="div-titulos">
          <h1 id="h1-cabelos">CABELOS VOLUMOSOS, CURTOS OU<br className="desktop-only" />COM DREAD - SEJA SUA MELHOR VERSÃO EM 2025</h1>
        </div>
        <div id="div-imagens">
          <Link href="#"><img src="/images/corteS/sugestao-corte (1).png" alt="sugestaocorte1" /></Link>
          <Link href="#"><img src="/images/corteS/sugestao-corte (2).png" alt="sugestaocorte2" /></Link>
          <Link href="#"><img src="/images/corteS/sugestao-corte (3).png" alt="sugestaocorte3" /></Link>
          <Link href="#"><img src="/images/corteS/sugestao-corte (4).png" alt="sugestaocorte4" /></Link>
        </div>
        <div id="div-botaoseta">
          <button id="button2">VEJA MAIS</button>
        </div>
      </section>
    </>
  );
};

export default CortesPage;