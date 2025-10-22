'use client';

import {Header, Footer} from "@/components";
import Image from "next/image";
import "@/styles/tendencias.css";
import Link from "next/link";


export default function tendencias() {

  return (
    <>
    <Header/>
    <main>
      <section className="primeiro">
        <div className="banner-principal">
          <p id="tit-1">
            Acompanhe o que está <br /> bombando nos últimos dias
          </p>
          <p id="text-1">
            Os assuntos mais comentados, a nova coleção, o novo tratamento - aqui você encontra de tudo sem precisar sair do conforto. Todas as principais tendências estão reunidas em um único lugar feito pensando especialmente em você.
          </p>
        </div>

        <Link href='/artigo/qual-creme-comprar'>
          <div className="banner-sec">
            <div className="butoes">
              <button>Cabelo</button>
              <button>Cremes e óleos</button>
              <button>Produtos</button>
            </div>
            <p id="tit-2">Os dilemas do século XXI: Qual creme comprar?</p>
          </div>
        </Link>

        <div className="meio">
          <p>
            Preparamos <br /> tudo que você <br /> quer ver
          </p>
          <button>Conheça</button>
        </div>

        <Link href='/artigo/acido-hialuronico'>
          <div className="banner-terc">
            <div className="butoes-2">
              <button>Cabelo</button>
              <button>Cremes e óleos</button>
              <button>Produtos</button>
            </div>
            <p id="tit-3">Ácido hialuronico: Descubra os seus principais benefícios!</p>
          </div>
        </Link>
      </section>
    

    <section className="segundo">
      <p id="tit-4">Coleção inverno - Cachos dos sonhos</p>

      <p id="text-2">
        Neste inverno, abrace seus cachos como nunca antes. A coleção Cachos dos Sonhos foi criada especialmente para cuidar, nutrir e proteger seus fios nos dias frios, quando o ressecamento e o frizz tentam roubar a cena.
      </p>

      <div className="produtss">

        <div className="produt1">
          <p>Spray Umidificador</p>
          <button id="but-2">Conheça</button>
          <button id="but-3">

            <Image 
            src="/images/tendencias/Favorito.png"
             alt="Favorito" 
             width={24} 
             height={24} 
             />

          </button>
        </div>

        <div className="produt2">
          <p>Máscara Nutri-Reparadora</p>
          <button id="but-4">Conheça</button>
          <button id="but-5">
            <Image 
            src="/images/tendencias/Favorito.png"
            alt="Favorito"
            width={24} 
            height={24} 
            />

          </button>
        </div>

        <div className="produt3">
          <p>Protetor Térmico</p>
          <button id="but-2">Conheça</button>
          <button id="but-3">
            <Image 
            src="/images/tendencias/Favorito.png" 
            alt="Favorito" 
            width={24}
            height={24} />
          </button>
        </div>

      </div>

      <Image 
      id="img-direita" 
      src="/images/tendencias/img-4.png" 
      alt="Imagem lateral" 
      width={400}
       height={300} 
       />

      <Link href='/artigo/melhores-tipos-de-finalizacao'>
        <p id="tit-5">Melhores tipos de finalização</p>
      </Link>

      <p id="text-3">
        A finalização é a etapa-chave para realçar a beleza natural dos cachos. A fitagem tradicional é ideal para quem busca definição intensa e controle do frizz. Já a fitagem rápida oferece praticidade e um visual mais leve e volumoso. Para cachos duradouros, a combinação de creme e gel é imbatível. Escolha a técnica que melhor se adapta à sua rotina e ao resultado que deseja!
      </p>

      <div id="divi">
        <p>Linha Produtos Tropicais - Hidratação Intensa</p>
      </div>

      <Image 
      id="img-produt-1" 
      src="/images/tendencias/produ-4.png" 
      alt="Produto tropical" 
      width={300}
       height={300} 
       />

      <button id="but-6">Veja Mais</button>
    </section>

     <section className="terceiro">

      <div className="esq">
        <p>O que usar no inverno</p>
      </div>

      <div className="dir">

        <p id="tit-6">Esteja sempre no estilo</p>

        <div id="uno">
          <Image
            src="/images/tendencias/Frame.png"
            alt="Couro repaginado"
            width={100}
            height={100}
          />
          <p>Couro repaginado</p>
        </div>

        <div id="uno">
          <Image
            src="/images/tendencias/frame-1.png"
            alt="Cachos com volume"
            width={100}
            height={100}
          />
          <p>Cachos com volume</p>
        </div>

        <div id="uno">
        <Image
          src="/images/tendencias/frame-2.png"
          alt="Acessórios com textura"
          width={100}
          height={100}
        />
          <p>Acessórios com textura</p>
        </div>

        <div id="uno">
          <Image
            src="/images/tendencias/frame-3.png"
            alt="Sobreposições"
            width={100}
            height={100}
          />
          <p>Sobreposições</p>
        </div>

      </div>

    </section>

    </main>

    <Footer/>

    </>

  )}


