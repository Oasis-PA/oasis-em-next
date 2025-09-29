"use client";

import { Header, Footer } from "@/components"; 
import Link from "next/link";
import "@/styles/alimentacao.css";

export default function alimentacao() {
  return (
    <>
      <main>
        <section id="banner">
          <h1>NUTRIENTES CERTOS, <br />FIOS MAIS FORTES!</h1>
          <p>descubra como sua alimentação transforma <br />seu cabelo</p>
        </section>

        <section id="sec2">
          <img src="/images/alimentacao/imgsect2.png" alt="Mulher de cabelos crespos segurando vegetais e frutas" />
          <h1>Por que o que você come <br />impacta seus cabelos?</h1>

          <div className="resp">
            <p>Cabelos bonitos e fortes não dependem só de produtos. Nutrientes como biotina, ferro, ômega-3 e vitaminas do complexo B são essenciais para o crescimento e saúde dos fios.</p>
          </div>

          <h2>UMA BOA ALIMENTAÇÃO:</h2>

          <div className="cx" id="cx1">
            <img src="/images/alimentacao/svg-cx1.png" alt="Halteres" />
            <p>Fortalece <br /> os fios</p>
          </div>

          <div className="cx" id="cx2">
            <img src="/images/alimentacao/svg-cx2.png" alt="Seta Crescente" />
            <p>Aumenta o <br /> brilho natural</p>
          </div>

          <div className="cx" id="cx3">
            <img src="/images/alimentacao/svg-cx3.png" alt="DNA" />
            <p>Estimula o crescimento</p>
          </div>

          <div className="cx" id="cx4">
            <img src="/images/alimentacao/svg-cx4.png" alt="Coração Partido" />
            <p>Reduz queda <br /> e quebra</p>
          </div>
        </section>

        <section id="sec3">
          <h1>Alimentos aliados dos cabelos</h1>
          <div className="faixa amarelo"></div>
          <div className="faixa laranja"></div>
          <div className="faixa marrom"></div>
          <div id="sobreposto">
            <div className="fil1">
              <img className="ovo_aba" src="/images/alimentacao/ovo.png" alt="Ovo" />
              <div className="espi_cenou">
                <img id="espinafre" src="/images/alimentacao/espinafre.png" alt="Espinafre" />
                <img id="cenoura" src="/images/alimentacao/cenoura.png" alt="Cenoura" />
              </div>
              <img className="ovo_aba" src="/images/alimentacao/abacate.png" alt="Abacate" />
            </div>
            <div className="sal_mor">
              <img src="/images/alimentacao/salmão.png" alt="Salmão" />
              <img src="/images/alimentacao/morango.png" alt="Morango" />
            </div>
          </div>
        </section>

        <section id="sec4">
          <h1>Dicas práticas de alimentação</h1>
          <img src="/images/alimentacao/sec4.png" alt="Vegetais" />
          <ol>
            <li id="ol1"><p>1</p><div className="linha"></div>Evite alimentos ultraprocessados e muito salgados</li>
            <li id="ol2"><p>2</p><div className="linha"></div>Consuma vegetais verde-escuros com frequência</li>
            <li id="ol3"><p>3</p><div className="linha"></div>Inclua castanhas e sementes nas suas refeições</li>
            <li id="ol4"><p>4</p><div className="linha"></div>Reduza o estresse com práticas saudáveis</li>
            <li id="ol5"><p>5</p><div className="linha"></div>Beba ao menos 2L de água por dia</li>
            <li id="ol6"><p>6</p><div className="linha"></div>Varie frutas ricas em vitamina C</li>
            <li id="ol7"><p>7</p><div className="linha"></div>Mantenha bons níveis de cálcio</li>
            <li id="ol8"><p>8</p><div className="linha"></div>Inclua alho e cebola na dieta</li>
          </ol>
          <div className="repartição"></div>
        </section>

        <section id="sec5">
          <h2>Artigos fundamentais</h2>
          <h3>Tudo o que você precisa saber para ter cabelos mais fortes e saudáveis</h3>
          
          <section className="grade-cards">
            <article className="card">
              <img className="ftcard" src="/images/alimentacao/azul.png" alt="Imagem suplemento cabelo" />
              <div className="conteudo" id="card-1">
                <h1>Suplementos para cabelo: funcionam mesmo?</h1>
                <p>Saiba quando os suplementos para cabelo são eficazes, quais usar e como garantir resultados seguros.</p>
                <Link href="#" className="botao">SAIBA MAIS</Link>
              </div>
            </article>
            <article className="card">
              <img src="/images/alimentacao/sec5-salada1.png" alt="Imagem tigela saudável" />
            </article>
            <article className="card">
              <div className="conteudo">
                <h1>Alimentos que sabotam a saúde capilar</h1>
                <p>Nem só o que você come ajuda o cabelo — alguns alimentos podem prejudicar seus fios...</p>
                <Link href="#" className="botao">SAIBA MAIS</Link>
              </div>
            </article>
            <article className="card">
              <img src="/images/alimentacao/salada2-sec5.png" alt="Prato com salada saudável" />
            </article>
          </section>

          <section className="grade-cards">
            <article className="card">
              <img src="/images/alimentacao/sec5-olho.png" alt="Imagem de olho de peixe em um prato" />
            </article>
            <article className="card">
              <div className="conteudo">
                <h1>Receitas funcionais para cuidar dos cabelos de dentro para fora</h1>
                <p>Cuidar dos cabelos pode ser saboroso e prático! Que tal apostar em receitas nutritivas que fortalecem os fios e ainda são deliciosas? Neste artigo, você encontra ideias de preparações simples e funcionais para incluir no seu dia a dia e dar aquele boost na saúde capilar.</p>
                <Link href="#" className="botao">SAIBA MAIS</Link>
              </div>
            </article>
            <article className="card">
              <img src="/images/alimentacao/sec2-mulher.png" alt="Mulher de cabelos cacheados sorrindo" />
            </article>
            <article className="card">
              <img className="ftcard" src="/images/alimentacao/azul.png" alt="Imagem suplemento cabelo" />
              <div className="conteudo">
                <h1>Mitos e verdades sobre alimentação e crescimento capilar</h1>
                <p>Saiba quando os suplementos para cabelo são eficazes, quais usar e como garantir resultados seguros.</p>
                <Link href="#" className="botao">SAIBA MAIS</Link>
              </div>
            </article>
          </section>
        </section>
      </main>
    </>
  );
}