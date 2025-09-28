"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/produtos.css";

export default function produtos() {
  return (
    <>
      <main>
        <h1>PRODUTOS RECOMENDADOS</h1>
        <p>Encontre itens de cuidado para cabelo, pele <br></br> e muito mais.</p>
      </main>

      <section id="s1">
        <img src="images/produtos/marca (1).png" alt="SalonLine" />
        <img src="images/produtos/marca (2).png" alt="Kolene" />
        <img src="images/produtos/marca (3).png" alt="WidiCare" />
        <img src="images/produtos/marca (4).png" alt="Nivea" />
        <img src="images/produtos/marca (5).png" alt="Principia" />
      </section>

      <figure>
        <img src="images/produtos/quiz.png" alt="quiz-cronograma-capilar" />
      </figure>

      <section id="s2">
        <div className="linha-texto">
          <h1>TIPOS DE CABELO</h1>
          <div id="linha"></div>
        </div>

        <div className="imagens-s2">
          <img src="images/produtos/cabelo (1).png" alt="Ondulados" />
          <img src="images/produtos/cabelo (2).png" alt="Cacheados" />
          <img src="images/produtos/cabelo (3).png" alt="Crespo" />
          <img src="images/produtos/cabelo (4).png" alt="C/Química" />
        </div>

        <div className="linha-texto">
          <div id="linha2"></div>
          <h1>TIPOS DE PELE</h1>
        </div>

        <div className="imagens-s2">
          <img src="images/produtos/pele (1).png" alt="" />
          <img src="images/produtos/pele (2).png" alt="" />
          <img src="images/produtos/pele (3).png" alt="" />
          <img src="images/produtos/pele (4).png" alt="" />
        </div>
      </section>
    </>
  );
}