'use client';

import { Header, Footer} from "@/components";
import Image from "next/image";
import "@/styles/tendencias.css"


export default function tendencias() {

  return (
    <>
    
    

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

        <div className="banner-sec">
          <p id="data-1">19 jun 2024</p>
          <div className="butoes">
            <button>Cabelo</button>
            <button>Cremes e óleos</button>
            <button>Produtos</button>
          </div>
          <p id="tit-2">Os dilemas do século XXI: Qual creme comprar?</p>
          <Image 
          id="salvar" 
          src="/images/tendencias/Salvar.png"
          alt="imagem1"
          width={30}
          height={30}
           />

        </div>

        <div className="meio">
          <p>
            Preparamos <br /> tudo que você <br /> quer ver
          </p>
          <button>Conheça</button>
        </div>

        <div className="banner-terc">
          <p id="data-2">19 jun 2024</p>

          <div className="butoes-2">
            <button>Cabelo</button>
            <button>Cremes e óleos</button>
            <button>Produtos</button>
          </div>

          <p id="tit-3">Os dilemas do século XXI: Qual creme comprar?</p>
          <Image 
          id="salvar-2" 
          src="/images/tendencias/Salvar.png"
          alt="imagem2" 
          width={30}
          height={30}
           />

        </div>
      </section>
    </main>

    </>

  )}


