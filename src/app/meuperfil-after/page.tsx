"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/meuperfil-after.css";

export default function meuperfilafter() {
  return (
    <>
      <main>
        <div>
            <h1>Seu perfil está pronto, [nome]!</h1>
            <p>aqui está o que preparamos para você.</p>
            <button>EXPLORE</button>
        </div>
      </main>

      <section id="s1">
        <h1>suas informações</h1>
        <div id="informacoes">
            <div className="bloco">
                <h1>Seu tipo de cabelo é:</h1>
                <div className="blocoroxo">
                    <h3>tipo</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className="bloco">
                <h1>Nível de porosidade capilar</h1>
                <div className="blocoroxo">
                    <h3>nível</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className="bloco">
                <h1>Seu tom de pele é:</h1>
                <div className="blocoroxo">
                    <h3>pele</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className="bloco">
                <h1>Seu tipo de pele é:</h1>
                <div className="blocoroxo">
                    <h3>tipo</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className="bloco">
                <h1>Seu problema de pele é:</h1>
                <div className="blocoroxo">
                    <h3>pele</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className="bloco">
                <h1>Estilo de cabelo atual:</h1>
                <div className="blocoroxo">
                    <h3>ele está</h3>
                    <h1>X</h1>
                </div>
            </div>
        </div>
      </section>

      <section id="s2">
        <h1>Pele, Cabelo e Corpo: sua rotina de autocuidado.</h1>
        <h4>Criamos um guia de cuidados sob medida para valorizar o que você tem de mais autêntico!</h4>
        <div id="artigo1">
            <div>
                <h1>Vamos montar sua rotina ideal?</h1>
                <div className="blocotexto">
                    <p>agora que já temos todas as informações sobre seu cabelo, chegou a hora de dar o
                    próximo passo: montar um cronograma capilar personalizado só pra <span id="cor1">você!</span></p>
                </div>
                <h4>Clique abaixo e descubra a rotina ideal para cuidar dos seus fios com carinho e poder.</h4>
                <button id="botao1">CONHEÇA</button>
            </div>
        </div>

        <div id="artigo2">
            <div>
                <h1>Beleza começa com cuidado!</h1>
                <div className="blocotexto">
                    <p>dê ao seu cabelo o cuidado que ele merece. na página de <span id="cor2">Hair Care</span>, encontre dicas,
                        produtos e rituais feitos para o seu tipo de fio.</p>
                </div>
                <h4>Fortaleça e valorize sua coroa natural.</h4>
                <button id="botao2">CONHEÇA</button>
            </div>
        </div>
      </section>

      <section>
        <div className="monte">
          <img src="/images/meuperfil-after/monte.png" alt="" />
          <img className="conheca" src="/images/Cronograma-capilar/conheça.png" alt="Conheça" />
        </div>
      </section>

      <section id="s3">
        <img src="" alt="" />
        <div>
            <h1>Skincare para todos os tons</h1>
            <p>Nossa página de skincare foi criada pensando nas necessidades reais da pele negra. Aqui você encontra dicas, 
            rotinas e produtos recomendados para o seu tipo de pele e tom, valorizando sua beleza natural e garantindo 
            cuidados eficazes, saudáveis e inclusivos.</p>
            <button>DESCUBRA</button>
        </div>
      </section>
   </>
  );
}