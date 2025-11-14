"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/tinturas.css";

export default function tinturas() {
  return (
    <div className="page-tinturas-wrapper">

    <Header/>
    
    
    
        
      <main>
        
        <section className="representam">
          <h1>Cores que Representam</h1>
          <h5>Tinturas pensadas para realçar a sua beleza única — com tons vibrantes, profundos e que respeitam sua identidade.</h5>
        </section>
     

      <section id="s1">
        <h1>Tipos de Tintura para Cabelos</h1>
        <div id="tipos">
          <div id="card1" className="card-item">
            <div className="conteudo">
                <h1>TINTURA <br />TEMPORÁRIA</h1>
                <p>É uma coloração que age só na parte externa do fio e sai com poucas lavagens 
                  (1 a 3). Ideal para mudanças rápidas, como em festas ou testes de cor. 
                  Não contém amônia e não danifica o cabelo. Funciona melhor em cabelos claros 
                  ou descoloridos.</p>
                  <img className="numeros" src="/images/tinturas/1.png" alt="" />
            </div>
          </div>

          <div id="card2" className="card-item">
            <div className="conteudo">
                <h1>Tingimento <br />Natural</h1>
                <p>Usa ingredientes naturais, como henna, chá preto ou casca de noz. É menos 
                  agressivo e mais ecológico, mas tem cores limitadas e resultados que variam 
                  conforme o tom natural do cabelo. Pode durar algumas semanas.</p>
                  <img className="numeros" src="/images/tinturas/2.png" alt="" />
                  
                  
                  
            </div>
          </div>

          <div id="card3" className="card-item">
            <div className="conteudo" >
                <h1>Tintura Semi-<br />Permanente</h1>
                <p>Penetra levemente no fio e dura entre 6 a 12 lavagens. Não tem amônia, não 
                  clareia os fios e é boa para realçar tons, escurecer ou dar brilho. Ideal 
                  para quem quer mudar a cor sem danificar muito o cabelo.</p>
                  <img className="numeros" src="/images/tinturas/3.png" alt="" />
            </div>
          </div>
 
          <div id="card4" className="card-item">
            <div className="conteudo">
                <h1> Tintura <br />Permanente</h1>
                <p>Altera a estrutura do fio com amônia e oxidantes, permitindo uma mudança duradoura. 
                  Pode clarear, escurecer e cobre 100% dos fios brancos. Exige retoque da raiz a cada 
                  poucas semanas. É a mais eficaz, mas também a mais agressiva.</p>
                  <img className="numeros" src="/images/tinturas/4.png" alt="" />
            </div>
          </div>
        </div>
    </section>

    <section id="s2">
      <Link href='artigo/10-tons-fantasticos'>
        <div id="artigo1">
          <h1>10 TONS FANTÁSTICOS PARA SAIR DO BÁSICO</h1>
        </div>
      </Link>

      <div id="artigo2">
        <p>Descubra como equilibrar tintura e tratamento no seu cronograma capilar. Devolva brilho, 
          força e vida aos cabelos coloridos!</p>
      </div>
    </section>

    <section id="s3">
      <Link href='artigo/nago-colorida'>
        <div id="artigo3">
          <h1>NAGO COLORIDA: <br></br>15 ESTILOS <br></br>DIFERENTES</h1>
        </div>
      </Link>

      <Link href='artigo/produtos-indispensaveis' id="artigo4a">
        <div id="artigo4">
          <h1>PRODUTOS INDISPENSÁVEIS PARA CABELOS PINTADOS</h1>
        </div>
      </Link>
    </section>

    <div id="linha"></div>

    <section id="s4">
      <h1>artigos em alta</h1>
      <div>
        <Link href='artigo/cuidados-noturnos'>
          <div id="artigo5">
            <h1>Cuidados noturnos para cabelo e pele</h1>
          </div>
        </Link>

        <Link href='artigo/transicao-capilar'>
          <div id="artigo6">
            <h1>Transição capilar: primeiros cuidados essenciais</h1>
          </div>
        </Link>

        <Link href='artigo/acidificacao-no-cabelo'>
          <div id="artigo7">
            <h1>Acidificação capilar</h1>
          </div>
        </Link>

        <Link href='artigo/protetor-solar-para-peles-retintas'>
          <div id="artigo8">
            <h1>Protetor solar para pele retinta</h1>
          </div>
        </Link>

        <button><Link href='/artigos-geral'>VER MAIS</Link></button>

        <Link href='artigo/como-fazer-waves'>
          <div id="artigo9">
            <h1>Como fazer waves?</h1>
          </div>
        </Link>
      </div>
    </section>
    
     </main>
     
    <Footer/>    </div>
  );

  );
}