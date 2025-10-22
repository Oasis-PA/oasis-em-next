"use client";
import React from 'react';
import Link from 'next/link';
import { Header, Footer } from "@/components";


// Importando as folhas de estilo. Verifique se os caminhos estao corretos.
import '@/styles/alimentacao.css';


const AlimentacaoPage: React.FC = () => {
  return (
    <>
     <Header/> 
      <section id="banner">
        <div className="texto-banner">
          <h1>NUTRIENTES <span style={{ color: '#ECC46F' }}>CERTOS</span>, <br />FIOS MAIS <span style={{ color: '#ECC46F' }}>FORTES!</span></h1>
          <p>Descubra como sua alimentação transforma <br />seu cabelo</p>
        </div>
      </section>
      
      <section className="sec2">
        <div className="esquerda"></div>
        <div className="direita">
          <h1>Por que o que você come impacta seus cabelos?</h1>
          <div className="resp"> 
            <p>Cabelos bonitos e fortes não dependem só de produtos. Nutrientes como biotina, ferro, ômega-3 e vitaminas do complexo B são essenciais para o crescimento e saúde dos fios.</p>
          </div>
          <h2>UMA BOA ALIMENTAÇÃO:</h2>
          <div className="cx">
            <div id="cx1">
              <img src="/images/Alimentacao/svg-cx1.png" alt="Halteres" />
              <p>Fortalece <br /> os fios</p>
            </div>
            <div id="cx2">
              <img src="/images/Alimentacao/svg-cx2.png" alt="Seta Crescente" />
              <p>Aumenta o brilho natural</p>
            </div>
            <div id="cx3">
              <img src="/images/Alimentacao/svg-cx3.png" alt="DNA" />
              <p>Estimula o crescimento</p>
            </div>
            <div id="cx4">
              <img src="/images/Alimentacao/svg-cx4.png" alt="Coracao Partido" />
              <p>Reduz queda e quebra</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec3">
        <div className="indoali">
          <h1>Alimentos aliados dos cabelos</h1>
        </div>
        <div className="back">
          <div className="fil1">
            <div className="ovo"><div className="elementos"><h1>OVO</h1><p>Rico em biotina, ajuda no crescimento dos fios e previne a quebra.</p></div></div>
            <div className="espi_cenou">
              <div className="espinafre"><div className="elementos"><h1>ESPINAFRE</h1><p>Carregado de ferro e vitamina C, fortalece os fios e combate a queda.</p></div></div>
              <div className="cenoura"><div className="elementos"><h1>CENOURA</h1><p>Rica em vitamina A, mantém o couro cabeludo saudável e os fios resistentes.</p></div></div>
            </div>
            <div className="abacate"><div className="elementos"><h1>ABACATE</h1><p>Fonte de gorduras saudáveis, contribui para o brilho e maciez dos cabelos.</p></div></div>
          </div>
          <div className="fil2">
            <div className="salmao"><div className="elementos"><h1>SALMÃO</h1><p>Fonte de ômega-3, promove hidratação profunda e melhora a elasticidade capilar.</p></div></div>
            <div className="morango"><div className="elementos"><h1>MORANGO</h1><p>Rico em vitamina C, estimula a produção de colágeno, importante para a estrutura capilar.</p></div></div>
          </div>
        </div>
      </section>
      <img src="images/" alt="" />
      <section className="sec4">
        <div className="esquerdah">
          <h1>Dicas práticas de alimentação</h1>
          <ol className="esquerdeh">
            <li id="ol1"><p>1</p><div className="linha"></div>Evite alimentos ultraprocessados e muito salgados</li>
            <li id="ol2"><p>2</p><div className="linha"></div>Consuma vegetais verde-escuros com frequência</li>
            <li id="ol3"><p>3</p><div className="linha"></div>Inclua castanhas e sementes nas suas refeições</li>
            <li id="ol4"><p>4</p><div className="linha"></div>Reduza o estresse com práticas saudáveis</li>
            <li id="ol5"><p>5</p><div className="linha"></div>Beba ao menos 2L de água por dia</li>
            <li id="ol6"><p>6</p><div className="linha"></div>Varie frutas ricas em vitamina C</li>
            <li id="ol7"><p>7</p><div className="linha"></div>Mantenha bons níveis de cálcio</li>
            <li id="ol8"><p>8</p><div className="linha"></div>Inclua alho e cebola na dieta</li>
          </ol>
        </div>
        <div className="direitah"></div>
      </section>

      <div className="reparticao"></div>
<img id='linha' src="/images/alimentacao/linha.svg" alt="" />
      <section className="sec5">
        <div className="text">
          <h2>Artigos fundamentais</h2>
          <h3>Tudo o que você precisa saber para ter cabelos mais fortes e saudáveis</h3>
        </div>
        <section className="partedebaixo">
          <div className="secao1">
            <article className="card">
              <Link href='artigo/suplementos-para-cabelo-funcionam-mesmo'>
                <div className="conteudo">
                  <img className="ftcard" src="/images/Alimentacao/azul.png" alt="Imagem suplemento cabelo" />
                  <h1>Suplementos para cabelo: funcionam mesmo?</h1>
                  <p>Saiba quando os suplementos para cabelo são eficazes, quais usar e como garantir resultados seguros.</p>
                  <button type="button" className="botao" onClick={() => window.location.href='#'}>SAIBA MAIS</button>
                </div>
              </Link>
            </article>
            <article className="card"><img src="/images/Alimentacao/sec5-salada1.png" alt="Imagem tigela saudavel" /></article>
            <article className="card">
              <Link href='artigo/alimentacao-e-beleza'>
                <div className="conteudo">
                  <h1>Alimentação e beleza: nutrientes que fazem diferença</h1>
                  <p>Quer uma beleza que brilha de dentro para fora? Invista em você! Clique abaixo e descubra quais nutrientes transformam sua pele, cabelo e unhas. Alimentação certa é o segredo da beleza real!</p>
                   <button type="button" className="botao" onClick={() => window.location.href='#'}>SAIBA MAIS</button>
                </div>
              </Link>
            </article>
            <article className="card"><img src="/images/alimentacao/salada2-sec5.png" alt="Prato com salada saudavel" /></article>
          </div>
          <div className="secao2">
            <article className="card"><img src="/images/alimentacao/sec5-olho.png" alt="Prato com salada saudavel" /></article>
            <article className="card">
              <Link href='artigo/5-receitas-naturais'>
                <div className="conteudo">
                  <h1>Receitas funcionais para cuidar dos cabelos de dentro para fora</h1>
                  <p>Cuidar dos cabelos pode ser saboroso e prático! Que tal apostar em receitas nutritivas que fortalecem os fios e ainda são deliciosas? Neste artigo, você encontra ideias de preparações simples e funcionais para incluir no seu dia a dia e dar aquele boost na saúde capilar.</p>
                 <button type="button" className="botao" onClick={() => window.location.href='#'}>SAIBA MAIS</button>
                </div>
              </Link>
            </article>
            <article className="card"><img src="/images/alimentacao/sec2-mulher.png" alt="Prato com salada saudavel" /></article>
            <article className="card">
                <Link href='artigo/hidratacao-caseira-crespos'>
                  <div className="conteudo">
                  <img className="ftcard" src="/images/alimentacao/roxo.png" alt="Imagem suplemento cabelo" />
                  <h1>Hidratação caseira para cabelos crespos</h1>
                  <p>Seus cachos estão ressecados e sem vida? Invista em você! Clique abaixo e descubra receitas caseiras de hidratação que transformam cabelos crespos, deixando os fios macios, definidos e cheios de brilho!</p>
                  <button type="button" className="botao" onClick={() => window.location.href='#'}>SAIBA MAIS</button>
                  </div>
                </Link>
            </article>
          </div>
        </section>
      </section>
      <Footer/>
    </>
  );
};

export default AlimentacaoPage;