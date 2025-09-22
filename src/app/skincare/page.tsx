<<<<<<< Updated upstream
<<<<<<< Updated upstream
// Como a página possui inputs, é uma boa prática marcá-la como um Client Component.
"use client";

import React from 'react';
import Link from 'next/link'; // Usando Link para navegação otimizada no Next.js
import Script from 'next/script'; // Usando Script para carregar JS de forma otimizada

// Importando a folha de estilos. Ajuste o caminho se necessário.
import '@/styles/skincare.css';

const SkincarePage: React.FC = () => {
  return (
    <>
      <main>
        <h1 id="h1-produtos">PRODUTOS POPULARES</h1>
        <p id="p1">SE JUNTE A MILHARES DE OUTROS USUÁRIOS SATISFEITOS COM ESSAS RECOMENDAÇÕES</p>
        <div id="linha1"></div>

        <section id="section-categoria">
          <aside id="aside-categoria">
            <h1 id="h1-categoria">Categoria</h1>
            <p className="p-aside">Blablabla1</p>
            <div className="linha2"></div> <br />

            {/* IDs duplicados foram corrigidos para serem únicos */}
            <div className="div-input">
              <input type="checkbox" id="blablabla1-1" value="blablabla" />
              <label htmlFor="blablabla1-1">Blablabla</label><br />
              <input type="checkbox" id="blablabla1-2" value="blablabla" />
              <label htmlFor="blablabla1-2">Blablabla</label><br />
              <input type="checkbox" id="blablabla1-3" value="blablabla" />
              <label htmlFor="blablabla1-3">Blablabla</label><br />
              <input type="checkbox" id="blablabla1-4" value="blablabla" />
              <label htmlFor="blablabla1-4">Blablabla</label><br />
              <input type="checkbox" id="blablabla1-5" value="blablabla" />
              <label htmlFor="blablabla1-5">Blablabla</label><br />
              <input type="checkbox" id="blablabla1-6" value="blablabla" />
              <label htmlFor="blablabla1-6">Blablabla</label><br />
            </div>
            
            <div className="div-input">
              <p className="p-aside">Blablabla2</p>
              <div className="linha2"></div> <br />
              <input type="range" id="range" />
            </div>
            
            <p className="p-aside">Blablabla3</p>
            <div className="linha2"></div> <br />
            <div className="div-input">
              <input type="checkbox" id="blablabla3-1" value="blablabla" />
              <label htmlFor="blablabla3-1">Blablabla</label><br />
              <input type="checkbox" id="blablabla3-2" value="blablabla" />
              <label htmlFor="blablabla3-2">Blablabla</label><br />
              <input type="checkbox" id="blablabla3-3" value="blablabla" />
              <label htmlFor="blablabla3-3">Blablabla</label><br />
              <input type="checkbox" id="blablabla3-4" value="blablabla" />
              <label htmlFor="blablabla3-4">Blablabla</label><br />
            </div>
            
            <p className="p-aside">Blablabla4</p>
            <div className="linha2"></div> <br />
            <div className="div-input">
              <input type="checkbox" id="blablabla4-1" value="blablabla" />
              <label htmlFor="blablabla4-1">Blablabla</label><br />
              <input type="checkbox" id="blablabla4-2" value="blablabla" />
              <label htmlFor="blablabla4-2">Blablabla</label><br />
            </div>
            
            <p className="p-aside">Blablabla5</p>
            <div className="linha2"></div> <br />
            <div className="div-input">
              <input type="checkbox" id="blablabla5-1" value="blablabla" />
              <label htmlFor="blablabla5-1">Blablabla</label><br />
              <input type="checkbox" id="blablabla5-2" value="blablabla" />
              <label htmlFor="blablabla5-2">Blablabla</label><br />
              <input type="checkbox" id="blablabla5-3" value="blablabla" />
              <label htmlFor="blablabla5-3">Blablabla</label><br />
              <input type="checkbox" id="blablabla5-4" value="blablabla" />
              <label htmlFor="blablabla5-4">Blablabla</label><br />
              <input type="checkbox" id="blablabla5-5" value="blablabla" />
              <label htmlFor="blablabla5-5">Blablabla</label><br />
            </div>
            <button id="button-filtrar">FILTRAR</button>
          </aside>
          
          <div id="linha3"></div>
          
          <section id="section-produtos">
            <Link href=""><img src="/images/skincare/produto (1).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (2).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (3).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (4).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (5).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (6).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (7).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (8).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (9).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (10).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (11).png" alt="imagem produto" /></Link>
            <Link href=""><img src="/images/skincare/produto (12).png" alt="imagem produto" /></Link>
          </section>
        </section>  
      </main>

      <section>
        <div className="linha4"></div>
        <div id="conteiner-barra">
          <Link href="#" className="barra-active"></Link>
          <Link href="#" className="barra-normal"></Link>
          <Link href="#" className="barra-normal"></Link>
          <Link href="#" className="barra-normal"></Link>
          <Link href="#" className="barra-normal"></Link>
          <Link href="#" className="barra-normal"></Link>
        </div>
        <div className="linha4"></div>

        <p id="p2">
          RECEBA MAIS AVISOS E NOTIFICAÇÕES SOBRE SUAS LOJAS E <br /> ARTIGOS FAVORITOS!
        </p>

        <div id="div-enviar">
          <input type="text" id="input-enviar" />
          <input type="submit" id="button-enviar" value="" />
        </div>
      </section>
      
      {/* Carrega o script da pasta /public de forma otimizada */}
      <Script src="/skincare.js" strategy="afterInteractive" />
    </>
  );
};

export default SkincarePage;
=======
=======
>>>>>>> Stashed changes
"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/skincare.css";

export default function skincare() {
  return (
    <>
    
    
    <main>

    </main>
    </>
  );
<<<<<<< Updated upstream
}
>>>>>>> Stashed changes
=======
}
>>>>>>> Stashed changes
"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/skincare.css";

export default function skincare() {
  return (
    <>
    
    
    <main>

    </main>
    </>
  );
}