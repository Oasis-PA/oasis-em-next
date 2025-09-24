"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/skincare.css";

export default function skincare() {
  return (
    <>
    <header>
      <h1>SKIN</h1>
      <h2>CARE</h2>
    </header>
    
    <main>
      <section id="s1">
        <h1>Skincare com Propósito: Cuidar de Todos os Tons de Beleza</h1>
      </section>
      <div id="tons"></div>

      <section id="s2">
          <div className="categ">
            <img src="/images/skincare/categ1.png" alt="ALIMENTAÇÃO" />
            <h2>ALIMENTAÇÃO</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ2.png" alt="CRONOGRAMA" />
            <h2>CRONOGRAMA</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ3.png" alt="HAIR-CARE" />
            <h2>HAIR-CARE</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ4.png" alt="PRODUTOS" />
            <h2>PRODUTOS</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ5.png" alt="INFANTIL" />
            <h2>INFANTIL</h2>
          </div>

          <div className="categ">
            <img src="/images/skincare/categ6.png" alt="TENDÊNCIAS" />
            <h2>TENDÊNCIAS</h2>
          </div>
      </section>
      
      <section id="s3">
        <div className="artigos">
            <img src="images/skincare/artigo1.png" alt="" />
            <div className="cont-artigo">
              <h1>Aposte em Maquiagens ousadas!</h1>
              <p>Está cansada das mesmas makes monótonas e sem
              brilho em toda festa? Veja agora mesmo 10 maquiagens 
              para inovar e arrasar no visual! Aposte também em 
              produtos que não danifiquem sua pele e preservem sua
              beleza natural.</p>
              <button></button>
            </div>
        </div>


      </section>
    </main>
    </>
  );
}