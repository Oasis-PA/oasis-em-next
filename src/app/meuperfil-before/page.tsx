"use client";

import React from 'react';
import Link from 'next/link'; 
import { Header, Footer } from "@/components";
import '@/styles/meuperfil-before.css';

const MeuAvatarPage: React.FC = () => {
  return (
    <>
      <Header/>
      <section className="sec1">
        <div className="sec1-texto">
          <h1 className="titulo">Monte seu perfil único!</h1>
          <p className="texto">Porque cada detalhe seu importa — da pele ao estilo</p>
        </div>
      </section>

      <section className="sec2">
        <div className="sec2-texto">
          <h1 className="titulo">CRIE SEU PERFIL</h1>
          <p className="texto">Sua identidade, suas regras. Comece a montar agora!</p>
          <Link href="/crie-agora">CRIE AGORA</Link>
        </div>

        <div className="sec2-imagem">
          <img src="/images/meuperfil-before/scorza.png" alt="Avatar" />
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default MeuAvatarPage;