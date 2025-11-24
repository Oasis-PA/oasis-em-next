"use client";

import React from 'react';
import Link from 'next/link';
import { Header, Footer } from "@/components";
import styles from '@/styles/meuperfil-before.module.css';

const MeuAvatarPage: React.FC = () => {
  return (
    <>
      <Header/>
      <div className={styles.wrapper}>
        <section className={styles.sec1}>
          <div className={styles.sec1Texto}>
            <h1>Monte seu perfil único!</h1>
            <p>Porque cada detalhe seu importa — da pele ao estilo</p>
          </div>
        </section>
        <section className={styles.sec2}>
          <div className={styles.sec2Texto}>
            <h1>CRIE SEU PERFIL</h1>
            <p>Sua identidade, suas regras. Comece a montar agora!</p>
            <Link href="/meu-perfil/questionario/meu-perfil" className={styles.sec2Link}>CRIE AGORA</Link>
          </div>
          <div className={styles.sec2Imagem}>
            <img src="/images/meuperfil-before/scorza.png" alt="Avatar" />
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default MeuAvatarPage;