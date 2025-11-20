"use client";
import React from 'react';
import Link from 'next/link';
import { Header, Footer } from "@/components";


import styles from '@/styles/alimentacao.module.css';


const AlimentacaoPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <section className={styles.banner}>
        <div className={styles.textoBanner}>
          <h1>NUTRIENTES <span style={{ color: '#ECC46F' }}>CERTOS</span>, <br />FIOS MAIS <span style={{ color: '#ECC46F' }}>FORTES!</span></h1>
          <p>Descubra como sua alimentação transforma <br />seu cabelo</p>
        </div>
      </section>
      
      <section className={styles.sec2}>
        <div className={styles.esquerda}></div>
        <div className={styles.direita}>
          <h1>Por que o que você come impacta seus cabelos?</h1>
          <div className={styles.resp}>
            <p>Cabelos bonitos e fortes não dependem só de produtos. Nutrientes como biotina, ferro, ômega-3 e vitaminas do complexo B são essenciais para o crescimento e saúde dos fios.</p>
          </div>
          <h2>UMA BOA ALIMENTAÇÃO:</h2>
          <div className={styles.cx}>
            <div className={styles.cx1}>
              <img src="/images/Alimentacao/svg-cx1.png" alt="Halteres" />
              <p>Fortalece <br /> os fios</p>
            </div>
            <div className={styles.cx2}>
              <img src="/images/Alimentacao/svg-cx2.png" alt="Seta Crescente" />
              <p>Aumenta o brilho natural</p>
            </div>
            <div className={styles.cx3}>
              <img src="/images/Alimentacao/svg-cx3.png" alt="DNA" />
              <p>Estimula o crescimento</p>
            </div>
            <div className={styles.cx4}>
              <img src="/images/Alimentacao/svg-cx4.png" alt="Coracao Partido" />
              <p>Reduz queda e quebra</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sec3}>
        <div className={styles.indoali}>
          <h1>Alimentos aliados dos cabelos</h1>
        </div>
        <div className={styles.back}>
          <div className={styles.fil1}>
            <div className={styles.ovo}><div className={styles.elementos}><h1>OVO</h1><p>Rico em biotina, ajuda no crescimento dos fios e previne a quebra.</p></div></div>
            <div className={styles.espiCenou}>
              <div className={styles.espinafre}><div className={styles.elementos}><h1>ESPINAFRE</h1><p>Carregado de ferro e vitamina C, fortalece os fios e combate a queda.</p></div></div>
              <div className={styles.cenoura}><div className={styles.elementos}><h1>CENOURA</h1><p>Rica em vitamina A, mantém o couro cabeludo saudável e os fios resistentes.</p></div></div>
            </div>
            <div className={styles.abacate}><div className={styles.elementos}><h1>ABACATE</h1><p>Fonte de gorduras saudáveis, contribui para o brilho e maciez dos cabelos.</p></div></div>
          </div>
          <div className={styles.fil2}>
            <div className={styles.salmao}><div className={styles.elementos}><h1>SALMÃO</h1><p>Fonte de ômega-3, promove hidratação profunda e melhora a elasticidade capilar.</p></div></div>
            <div className={styles.morango}><div className={styles.elementos}><h1>MORANGO</h1><p>Rico em vitamina C, estimula a produção de colágeno, importante para a estrutura capilar.</p></div></div>
          </div>
        </div>
      </section>
      <img src="images/" alt="" />
      <section className={styles.sec4}>
        <div className={styles.esquerdah}>
          <h1>Dicas práticas de alimentação</h1>
          <ol className={styles.esquerdeh}>
            <li className={styles.ol1}><p>1</p><div className={styles.linha}></div>Evite alimentos ultraprocessados e muito salgados</li>
            <li className={styles.ol2}><p>2</p><div className={styles.linha}></div>Consuma vegetais verde-escuros com frequência</li>
            <li className={styles.ol3}><p>3</p><div className={styles.linha}></div>Inclua castanhas e sementes nas suas refeições</li>
            <li className={styles.ol4}><p>4</p><div className={styles.linha}></div>Reduza o estresse com práticas saudáveis</li>
            <li className={styles.ol5}><p>5</p><div className={styles.linha}></div>Beba ao menos 2L de água por dia</li>
            <li className={styles.ol6}><p>6</p><div className={styles.linha}></div>Varie frutas ricas em vitamina C</li>
            <li className={styles.ol7}><p>7</p><div className={styles.linha}></div>Mantenha bons níveis de cálcio</li>
            <li className={styles.ol8}><p>8</p><div className={styles.linha}></div>Inclua alho e cebola na dieta</li>
          </ol>
        </div>
        <div className={styles.direitah}></div>
      </section>

      <div className={styles.repartição}></div>
      <img className={styles.linha} src="/images/alimentacao/linha.svg" alt="" />
      <section className={styles.sec5}>
        <div className={styles.text}>
          <h2>Artigos fundamentais</h2>
          <h3>Tudo o que você precisa saber para ter cabelos mais fortes e saudáveis</h3>
        </div>
        <section className={styles.partedebaixo}>
          <div className={styles.secao1}>
            <article className={styles.card}>
              <Link href='artigo/suplementos-para-cabelo-funcionam-mesmo'>
                <div className={styles.conteudo}>
                  <img className={styles.ftcard} src="/images/Alimentacao/azul.png" alt="Imagem suplemento cabelo" />
                  <h1>Suplementos para cabelo: funcionam mesmo?</h1>
                  <p>Saiba quando os suplementos para cabelo são eficazes, quais usar e como garantir resultados seguros.</p>
                  <button type="button" onClick={() => window.location.href='#'}>SAIBA MAIS</button>
                </div>
              </Link>
            </article>
            <article className={styles.card}><img src="/images/Alimentacao/sec5-salada1.png" alt="Imagem tigela saudavel" /></article>
            <article className={styles.card}>
              <Link href='artigo/alimentacao-e-beleza'>
                <div className={styles.conteudo}>
                  <h1>Alimentação e beleza: nutrientes que fazem diferença</h1>
                  <p>Quer uma beleza que brilha de dentro para fora? Invista em você! Clique abaixo e descubra quais nutrientes transformam sua pele, cabelo e unhas. Alimentação certa é o segredo da beleza real!</p>
                  <button type="button" onClick={() => window.location.href='#'}>SAIBA MAIS</button>
                </div>
              </Link>
            </article>
            <article className={styles.card}><img src="/images/alimentacao/salada2-sec5.png" alt="Prato com salada saudavel" /></article>
          </div>
          <div className={styles.secao2}>
            <article className={styles.card}><img src="/images/alimentacao/sec5-olho.png" alt="Prato com salada saudavel" /></article>
            <article className={styles.card}>
              <Link href='artigo/5-receitas-naturais'>
                <div className={styles.conteudo}>
                  <h1>Receitas funcionais para cuidar dos cabelos de dentro para fora</h1>
                  <p>Cuidar dos cabelos pode ser saboroso e prático! Que tal apostar em receitas nutritivas que fortalecem os fios e ainda são deliciosas? Neste artigo, você encontra ideias de preparações simples e funcionais para incluir no seu dia a dia e dar aquele boost na saúde capilar.</p>
                  <button type="button" onClick={() => window.location.href='#'}>SAIBA MAIS</button>
                </div>
              </Link>
            </article>
            <article className={styles.card}><img src="/images/alimentacao/sec2-mulher.png" alt="Prato com salada saudavel" /></article>
            <article className={styles.card}>
              <Link href='artigo/hidratacao-caseira-crespos'>
                <div className={styles.conteudo}>
                  <img className={styles.ftcard} src="/images/alimentacao/roxo.png" alt="Imagem suplemento cabelo" />
                  <h1>Hidratação caseira para cabelos crespos</h1>
                  <p>Seus cachos estão ressecados e sem vida? Invista em você! Clique abaixo e descubra receitas caseiras de hidratação que transformam cabelos crespos, deixando os fios macios, definidos e cheios de brilho!</p>
                  <button type="button" onClick={() => window.location.href='#'}>SAIBA MAIS</button>
                </div>
              </Link>
            </article>
          </div>
        </section>
      </section>
      <Footer/>    </div>
  );

};

export default AlimentacaoPage;