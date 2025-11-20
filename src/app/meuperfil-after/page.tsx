"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/meuperfil-after.module.css";

export default function meuperfilafter() {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <main className={styles.main}>
        <div className={styles.mainDiv}>
            <h1>Seu perfil está pronto, [nome]!</h1>
            <p>aqui está o que preparamos para você.</p>
            <button className={styles.mainButton}>EXPLORE</button>
        </div>
      </main>

      <section className={styles.s1}>
        <h1>suas informações</h1>
        <div className={styles.informacoes}>
            <div className={styles.bloco}>
                <h1>Seu tipo de cabelo é:</h1>
                <div className={styles.blocoRoxo}>
                    <h3>tipo</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className={styles.bloco}>
                <h1>Nível de porosidade capilar</h1>
                <div className={styles.blocoRoxo}>
                    <h3>nível</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className={styles.bloco}>
                <h1>Seu tom de pele é:</h1>
                <div className={styles.blocoRoxo}>
                    <h3>pele</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className={styles.bloco}>
                <h1>Seu tipo de pele é:</h1>
                <div className={styles.blocoRoxo}>
                    <h3>tipo</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className={styles.bloco}>
                <h1>Seu problema de pele é:</h1>
                <div className={styles.blocoRoxo}>
                    <h3>pele</h3>
                    <h1>X</h1>
                </div>
            </div>

            <div className={styles.bloco}>
                <h1>Estilo de cabelo atual:</h1>
                <div className={styles.blocoRoxo}>
                    <h3>ele está</h3>
                    <h1>X</h1>
                </div>
            </div>
        </div>
      </section>

      <section className={styles.s2}>
        <h1>Pele, Cabelo e Corpo: sua rotina de autocuidado.</h1>
        <h4>Criamos um guia de cuidados sob medida para valorizar o que você tem de mais autêntico!</h4>
        <div className={styles.artigo1}>
            <div className={styles.artigoDiv}>
                <h1>Vamos montar sua rotina ideal?</h1>
                <div className={styles.blocoTexto}>
                    <p>agora que já temos todas as informações sobre seu cabelo, chegou a hora de dar o
                    próximo passo: montar um cronograma capilar personalizado só pra <span className={styles.cor1}>você</span>!</p>
                </div>
                <h4>Clique abaixo e descubra a rotina ideal para cuidar dos seus fios com carinho e poder.</h4>
                <button className={styles.artigoButton}>CONHEÇA</button>
            </div>
        </div>

        <div className={styles.artigo2}>
            <div className={styles.artigoDiv}>
                <h1>Beleza começa com cuidado!</h1>
                <div className={styles.blocoTexto}>
                    <p>dê ao seu cabelo o cuidado que ele merece. na página de <span className={styles.cor2}>Hair Care</span>, encontre dicas,
                        produtos e rituais feitos para o seu tipo de fio.</p>
                </div>
                <h4>Fortaleça e valorize sua coroa natural.</h4>
                <button className={styles.artigoButton}>CONHEÇA</button>
            </div>
        </div>
      </section>

      <section>
        <div className={styles.monte}>
          <img src="/images/meuperfil-after/monte.png" alt="" />
          <img className={styles.conheca} src="/images/Cronograma-capilar/conheça.png" alt="Conheça" />
        </div>
      </section>

      <section className={styles.s3}>
        <img src="/images/meuperfil-after/s3-artigo.png" alt="" />
        <div>
            <h1>Skincare para todos os tons</h1>
            <p>Nossa página de skincare foi criada pensando nas necessidades reais da pele negra. Aqui você encontra dicas,
            rotinas e produtos recomendados para o seu tipo de pele e tom, valorizando sua beleza natural e garantindo
            cuidados eficazes, saudáveis e inclusivos.</p>
            <button className={styles.s3Button}>DESCUBRA</button>
        </div>
      </section>
      <Footer/>
    </div>
  );
}