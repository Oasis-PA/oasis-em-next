"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/tinturas.css";

export default function tinturas() {
  return (
    <>
    <Header/>
      <main>
        <h1>Cores que Representam</h1>
        <h5>Tinturas pensadas para realçar a sua beleza única — com tons vibrantes, profundos e que respeitam sua identidade.</h5>
      </main>

      <section id="s1">
        <h1>Tipos de Tintura para Cabelos</h1>
        <div id="tipos">
          <div id="card1">
            <div className="conteudo">
                <h1>TINTURA TEMPORÁRIA</h1>
                <p>É uma coloração que age só na parte externa do fio e sai com poucas lavagens 
                  (1 a 3). Ideal para mudanças rápidas, como em festas ou testes de cor. 
                  Não contém amônia e não danifica o cabelo. Funciona melhor em cabelos claros 
                  ou descoloridos.</p>
            </div>
          </div>

          <div id="card2">
            <div className="conteudo">
                <h1>Tingimento Natural</h1>
                <p>Usa ingredientes naturais, como henna, chá preto ou casca de noz. É menos 
                  agressivo e mais ecológico, mas tem cores limitadas e resultados que variam 
                  conforme o tom natural do cabelo. Pode durar algumas semanas.</p>
            </div>
          </div>

          <div id="card3">
            <div className="conteudo">
                <h1>Tintura Semi-Permanente</h1>
                <p>Penetra levemente no fio e dura entre 6 a 12 lavagens. Não tem amônia, não 
                  clareia os fios e é boa para realçar tons, escurecer ou dar brilho. Ideal 
                  para quem quer mudar a cor sem danificar muito o cabelo.</p>
            </div>
          </div>

          <div id="card4">
            <div className="conteudo">
                <h1> Tintura Permanente</h1>
                <p>Altera a estrutura do fio com amônia e oxidantes, permitindo uma mudança duradoura. 
                  Pode clarear, escurecer e cobre 100% dos fios brancos. Exige retoque da raiz a cada 
                  poucas semanas. É a mais eficaz, mas também a mais agressiva.</p>
            </div>
          </div>
        </div>
    </section>

    <section id="s2">
      <div id="artigo1">
        <h1>10 TONS FANTÁSTICOS PARA SAIR DO BÁSICO</h1>
      </div>

      <div id="artigo2">
        <p>Descubra como equilibrar tintura e tratamento no seu cronograma capilar. Devolva brilho, 
          força e vida aos cabelos coloridos!</p>
      </div>
    </section>

    <section id="s3">
      <div id="artigo3">
        <h1>NAGÔ COLORIDA: <br></br>15 ESTILOS <br></br>DIFERENTES</h1>
      </div>

      <div id="artigo4">
        <h1>PRODUTOS INDISPENSÁVEIS PARA CABELOS PINTADOS</h1>
      </div>
    </section>

    <div id="linha"></div>

    <section id="s4">
      <h1>artigos em alta</h1>
      <div>
        <div id="artigo5">
          <h1>Coleção verão Farm 2025</h1>
        </div>

        <div id="artigo6">
          <h1>Coleção verão Farm 2025</h1>
        </div>

        <div id="artigo7">
          <h1>Coleção verão Farm 2025</h1>
        </div>

        <div id="artigo8">
          <h1>Coleção verão Farm 2025</h1>
        </div>

        <button>VER MAIS</button>

        <div id="artigo9">
          <h1>Coleção verão Farm 2025</h1>
        </div>
      </div>
    </section>
    <Footer/>
   </>
  );
}