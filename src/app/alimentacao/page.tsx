"use client";
import React from 'react';
import Link from 'next/link';

// Importando as folhas de estilo. Verifique se os caminhos estao corretos.
import '@/styles/alimentacao.css';


const AlimentacaoPage: React.FC = () => {
  return (
    <>
      {/* A secao HEADER foi removida conforme solicitado */}

      <section id="banner">
        <div className="texto-banner">
          <h1>NUTRIENTES <span style={{ color: '#ECC46F' }}>CERTOS</span>, <br />FIOS MAIS <span style={{ color: '#ECC46F' }}>FORTES!</span></h1>
          <p>Descubra como sua alimentacao transforma <br />seu cabelo</p>
        </div>
      </section>
      
      <section className="sec2">
        <div className="esquerda"></div>
        <div className="direita">
          <h1>Por que o que voce come impacta seus cabelos?</h1>
          <div className="resp"> 
            <p>Cabelos bonitos e fortes nao dependem so de produtos. Nutrientes como biotina, ferro, omega-3 e vitaminas do complexo B sao essenciais para o crescimento e saude dos fios.</p>
          </div>
          <h2>UMA BOA ALIMENTACAO:</h2>
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
              <div className="cenoura"><div className="elementos"><h1>CENOURA</h1><p>Rica em vitamina A, mantem o couro cabeludo saudavel e os fios resistentes.</p></div></div>
            </div>
            <div className="abacate"><div className="elementos"><h1>ABACATE</h1><p>Fonte de gorduras saudaveis, contribui para o brilho e maciez dos cabelos.</p></div></div>
          </div>
          <div className="fil2">
            <div className="salmao"><div className="elementos"><h1>SALMAO</h1><p>Fonte de omega-3, promove hidratacao profunda e melhora a elasticidade capilar.</p></div></div>
            <div className="morango"><div className="elementos"><h1>MORANGO</h1><p>Rico em vitamina C, estimula a producao de colageno, importante para a estrutura capilar.</p></div></div>
          </div>
        </div>
      </section>

      <section className="sec4">
        <div className="esquerdah">
          <h1>Dicas praticas de alimentacao</h1>
          <ol className="esquerdeh">
            <li id="ol1"><p>1</p><div className="linha"></div>Evite alimentos ultraprocessados e muito salgados</li>
            <li id="ol2"><p>2</p><div className="linha"></div>Consuma vegetais verde-escuros com frequencia</li>
            <li id="ol3"><p>3</p><div className="linha"></div>Inclua castanhas e sementes nas suas refeicoes</li>
            <li id="ol4"><p>4</p><div className="linha"></div>Reduza o estresse com praticas saudaveis</li>
            <li id="ol5"><p>5</p><div className="linha"></div>Beba ao menos 2L de agua por dia</li>
            <li id="ol6"><p>6</p><div className="linha"></div>Varie frutas ricas em vitamina C</li>
            <li id="ol7"><p>7</p><div className="linha"></div>Mantenha bons niveis de calcio</li>
            <li id="ol8"><p>8</p><div className="linha"></div>Inclua alho e cebola na dieta</li>
          </ol>
        </div>
        <div className="direitah"></div>
      </section>

      <div className="reparticao"></div>

      <section className="sec5">
        <div className="text">
          <h2>Artigos fundamentais</h2>
          <h3>Tudo o que voce precisa saber para ter cabelos mais fortes e saudaveis</h3>
        </div>
        <section className="partedebaixo">
          <div className="secao1">
            <article className="card">
              <div className="conteudo">
                <img className="ftcard" src="/images/Alimentacao/azul.png" alt="Imagem suplemento cabelo" />
                <h1>Suplementos para cabelo: funcionam mesmo?</h1>
                <p>Saiba quando os suplementos para cabelo sao eficazes, quais usar e como garantir resultados seguros.</p>
               {/*} <button type="button" className="botao" onClick={() => window.location.href='#'}>SAIBA MAIS</button> */}
              </div>
            </article>
            <article className="card"><img src="/images/Alimentacao/sec5-salada1.png" alt="Imagem tigela saudavel" /></article>
            <article className="card">
              <div className="conteudo">
                <h1>Alimentos que sabotam a saude capilar</h1>
                <p>Nem so o que voce come ajuda o cabelo — alguns alimentos podem prejudicar seus fios! Excesso de acucar, ultraprocessados e alimentos muito salgados podem enfraquecer os cabelos e aumentar a queda. Saiba quais alimentos evitar para manter os cabelos sempre bonitos e saudaveis.</p>
                {/* <button type="button" className="botao" onClick={() => window.location.href='#'}>SAIBA MAIS</button> */}
              </div>
            </article>
            <article className="card"><img src="/images/Alimentação/salada2-sec5.png" alt="Prato com salada saudavel" /></article>
          </div>
          <div className="secao2">
            <article className="card"><img src="/images/Alimentação/sec5-olho.png" alt="Prato com salada saudavel" /></article>
            <article className="card">
              <div className="conteudo">
                <h1>Receitas funcionais para cuidar dos cabelos de dentro para fora</h1>
                <p>Cuidar dos cabelos pode ser saboroso e pratico! Que tal apostar em receitas nutritivas que fortalecem os fios e ainda sao deliciosas? Neste artigo, voce encontra ideias de preparacoes simples e funcionais para incluir no seu dia a dia e dar aquele boost na saude capilar.</p>
                {/* <button type="button" className="botao" onClick={() => window.location.href='#'}>SAIBA MAIS</button> */}
              </div>
            </article>
            <article className="card"><img src="/images/Alimentação/sec2-mulher.png" alt="Prato com salada saudavel" /></article>
            <article className="card">
                <div className="conteudo">
                <img className="ftcard" src="/images/Alimentação/roxo.png" alt="Imagem suplemento cabelo" />
                <h1>Mitos e verdades sobre alimentacao e crescimento capilar</h1>
                <p>Saiba quando os suplementos para cabelo sao eficazes, quais usar e como garantir resultados seguros.</p>
                {/* <button type="button" className="botao" onClick={() => window.location.href='#'}>SAIBA MAIS</button> */}
                </div>
            </article>
          </div>
        </section>
      </section>

      
    </>
  );
};

export default AlimentacaoPage;