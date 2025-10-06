"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/tinturas.css";

export default function tinturas() {
  return (
    <>
      <main>
        <h1>Cores que Representam</h1>
        <h5>Tinturas pensadas para realçar a sua beleza única — com tons vibrantes, profundos e que respeitam sua identidade.</h5>
      </main>

        <section id="s1">
        <div id="tipos">
          <div id="card1">
            <div className="conteudo">
                <h1>PROTETOR SOLAR É ESSENCIAL</h1>
                <p>A pele precisa de proteção diária contra manchas e envelhecimento precoce.</p>
            </div>
          </div>

          <div id="card2">
            <div className="conteudo">
                <h1>Hidrate logo após o banho</h1>
                <p>Isso ajuda a reter a umidade e manter a pele macia.</p>
            </div>
          </div>

          <div id="card3">
            <div className="conteudo">
                <h1>Evite sabonetes muito agressivos</h1>
                <p>Prefira fórmulas suaves que não ressequem a pele.</p>
            </div>
          </div>

          <div id="card4">
            <div className="conteudo">
                <h1>Inclua antioxidantes na rotina</h1>
                <p>Vitamina C, por exemplo, ajuda a uniformizar o tom da pele.</p>
            </div>
          </div>
        </div>
    </section>
   </>
  );
}