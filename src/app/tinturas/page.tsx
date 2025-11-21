"use client";

import { Header, Footer } from "@/components";
import Image from "next/image"; // Agora estamos usando isso corretamente
import Link from "next/link";
import "@/styles/tinturas.css";

export default function Tinturas() {
  return (
    <div className="page-tinturas-wrapper">
      <Header />

      <main>
        <section className="representam">
          <h1>Cores que Representam</h1>
          <h5>
            Tinturas pensadas para realçar a sua beleza única — com tons
            vibrantes, profundos e que respeitam sua identidade.
          </h5>
        </section>

        <section id="s1">
          <h1>Tipos de Tintura para Cabelos</h1>
          <div id="tipos">
            {/* CARD 1 */}
            <div id="card1" className="card-item">
              <div className="conteudo">
                <h1>TINTURA <br />TEMPORÁRIA</h1>
                <p>
                  É uma coloração que age só na parte externa do fio e sai com
                  poucas lavagens (1 a 3). Ideal para mudanças rápidas, como em
                  festas ou testes de cor. Não contém amônia e não danifica o
                  cabelo. Funciona melhor em cabelos claros ou descoloridos.
                </p>
                
                
              </div>
              {/* Ajustado para componente Image do Next.js */}
              <Image 
                  className="numeros" 
                  src="/images/tinturas/1.png" 
                  alt="Número 1"
                  width={50} 
                  height={50} 
                />
            </div>

            {/* CARD 2 */}
            <div id="card2" className="card-item">
              <div className="conteudo">
                {/* Padronizado para Caixa Alta */}
                <h1>TINGIMENTO <br />NATURAL</h1>
                <p>
                  Usa ingredientes naturais, como henna, chá preto ou casca de
                  noz. É menos agressivo e mais ecológico, mas tem cores
                  limitadas e resultados que variam conforme o tom natural do
                  cabelo. Pode durar algumas semanas.
                </p>
                <Image 
                  className="numeros" 
                  src="/images/tinturas/2.png" 
                  alt="Número 2"
                  width={50} 
                  height={50} 
                />
              </div>
            </div>

            {/* CARD 3 */}
            <div id="card3" className="card-item">
              <div className="conteudo">
                <h1>TINTURA SEMI-<br />PERMANENTE</h1>
                <p>
                  Penetra levemente no fio e dura entre 6 a 12 lavagens. Não tem
                  amônia, não clareia os fios e é boa para realçar tons,
                  escurecer ou dar brilho. Ideal para quem quer mudar a cor sem
                  danificar muito o cabelo.
                </p>
                <Image 
                  className="numeros" 
                  src="/images/tinturas/3.png" 
                  alt="Número 3"
                  width={50} 
                  height={50} 
                />
              </div>
            </div>

            {/* CARD 4 */}
            <div id="card4" className="card-item">
              <div className="conteudo">
                <h1>TINTURA <br />PERMANENTE</h1>
                <p>
                  Altera a estrutura do fio com amônia e oxidantes, permitindo
                  uma mudança duradoura. Pode clarear, escurecer e cobre 100%
                  dos fios brancos. Exige retoque da raiz a cada poucas semanas.
                  É a mais eficaz, mas também a mais agressiva.
                </p>
                <Image 
                  className="numeros" 
                  src="/images/tinturas/4.png" 
                  alt="Número 4"
                  width={50} 
                  height={50} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* ... Header e Section Representam continuam iguais ... */}

        <section id="s1">
           {/* ... O código do S1 (Cards verticais) continua igual ... */}
           {/* ... mantenha o código do S1 que te passei antes ... */}
        </section>

        {/* --- SEÇÃO S2 (REFEITA ESTILO REVISTA) --- */}
        <section id="s2">
          {/* Card Esquerda: Imagem Cheia */}
          <Link href="artigo/10-tons-fantasticos" className="card-link-wrapper" id="link-artigo1">
            <div id="artigo1">
              <div className="tags-wrapper">
                 <span className="pill-tag">Moda</span>
                 <span className="pill-tag">Marcas</span>
              </div>
              <h1>10 TONS FANTÁSTICOS PARA SAIR DO BÁSICO</h1>
            </div>
          </Link>

          {/* Card Direita: Card Branco "Sugestão" */}
          <div id="artigo2">
            <div className="card-header-row">
                <Image
                  src="/images/tinturas/oasis-logo.png"
                  alt="Oasis Logo"
                  width={65}
                  height={40}
                  className="oasis-logo"
                />
                <span className="tag-sugestao">SUGESTÃO</span>
            </div>
            
            {/* A imagem da mulher de trança vai aqui dentro */}
            <div className="image-container-s2">
                 <Image 
                    src="/images/tinturas/artigo2-bg.png" // Certifique-se que esta imagem é a da mulher de trança
                    alt="Destaque Sugestão"
                    width={500}
                    height={300}
                    style={{objectFit: "cover", width: "100%", height: "100%"}}
                 />
            </div>

            <p>
              Descubra como equilibrar tintura e tratamento no seu cronograma
              capilar. Devolva brilho, força e vida aos cabelos coloridos!
            </p>
          </div>
        </section>

        {/* --- SEÇÃO S3 (BANNERS HORIZONTAIS) --- */}
        <section id="s3">
          <Link href="artigo/nago-colorida" className="banner-link">
            <div id="artigo3" className="banner-item">
               {/* Se a imagem de fundo já tiver a foto, ok. Se não, precisaria ajustar */}
               <div className="banner-content right-align">
                  <h1>NAGÔ COLORIDA: <br />15 ESTILOS DIFERENTES</h1>
                  <div className="tags-wrapper">
                    <span className="pill-tag">Moda</span>
                    <span className="pill-tag">Marcas</span>
                  </div>
               </div>
            </div>
          </Link>

          <Link href="artigo/produtos-indispensaveis" className="banner-link">
            <div id="artigo4" className="banner-item">
               <div className="banner-content left-align">
                  <h1>PRODUTOS INDISPENSÁVEIS PARA CABELOS PINTADOS</h1>
                  <div className="tags-wrapper">
                    <span className="pill-tag">Moda</span>
                    <span className="pill-tag">Marcas</span>
                  </div>
               </div>
            </div>
          </Link>
        </section>

{/* ... O resto (Linha e S4) continua igual ... */}

        <div id="linha"></div>

        <section id="s4">
          <h1>artigos em alta</h1>
          <div>
            <Link href="artigo/cuidados-noturnos">
              <div id="artigo5">
                <h1>Cuidados noturnos para cabelo e pele</h1>
              </div>
            </Link>

            <Link href="artigo/transicao-capilar">
              <div id="artigo6">
                <h1>Transição capilar: primeiros cuidados essenciais</h1>
              </div>
            </Link>

            <Link href="artigo/acidificacao-no-cabelo">
              <div id="artigo7">
                <h1>Acidificação capilar</h1>
              </div>
            </Link>

            <Link href="artigo/protetor-solar-para-peles-retintas">
              <div id="artigo8">
                <h1>Protetor solar para pele retinta</h1>
              </div>
            </Link>

            {/* Correção de Link/Button para evitar erros de HTML */}
            <Link href="/artigos-geral">
                <button style={{ pointerEvents: "none" }}>VER MAIS</button>
            </Link>

            <Link href="artigo/como-fazer-waves">
              <div id="artigo9">
                <h1>Como fazer waves?</h1>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}