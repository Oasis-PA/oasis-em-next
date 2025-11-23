"use client";

import React, { useState } from "react";
import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Helper para verificar se está aberto e limpar o JSX
  const isOpen = (section: string) => openAccordion === section;

  return (
    <footer className={styles.footer}>
      <Link href='/'>
        <img 
          src="images/logo-footer.png" 
          alt="Logo principal da marca" 
          className={styles.logo} 
        />
      </Link>
      
      <div className={styles.linksContainer}>
        
        {/* Coluna 1: Mapa do site */}
        <div className={styles.column}>
          <h1>Mapa do site</h1>
          <button 
            className={`${styles.accordionHeader} ${isOpen('mapa') ? styles.active : ''}`} 
            onClick={() => toggleAccordion('mapa')}
          >
            <h1>Mapa do site</h1>
          </button>
          <div className={`${styles.accordionContent} ${isOpen('mapa') ? styles.open : ''}`}>
            <h2><Link href="artigo/quem-somos">QUEM SOMOS?</Link></h2>
            <h2><Link href="/parcerias-empresas">PARCERIAS</Link></h2>
          </div>
        </div>

        {/* Coluna 2: Usuário */}
        <div className={styles.column}>
          <h1>Usuário</h1>
          <button 
            className={`${styles.accordionHeader} ${isOpen('usuario') ? styles.active : ''}`} 
            onClick={() => toggleAccordion('usuario')}
          >
            <h1>Usuário</h1>
          </button>
          <div className={`${styles.accordionContent} ${isOpen('usuario') ? styles.open : ''}`}>
            <h2><Link href="/gerenciamento">MINHA CONTA</Link></h2>
            <h2><Link href="/perfil">MEU PERFIL</Link></h2>
            <h2><Link href="/favoritos">FAVORITOS</Link></h2>
            <h2><Link href="/produtos">PRODUTOS</Link></h2>
            <h2><Link href="/cadastro">CADASTRE-SE</Link></h2>
          </div>
        </div>

        {/* Coluna 3: Suporte */}
        <div className={styles.column}>
          <h1>Precisa de suporte?</h1>
          <button 
            className={`${styles.accordionHeader} ${isOpen('suporte') ? styles.active : ''}`} 
            onClick={() => toggleAccordion('suporte')}
          >
            <h1>Precisa de suporte?</h1>
          </button>
          <div className={`${styles.accordionContent} ${isOpen('suporte') ? styles.open : ''}`}>
            <h2><Link href="/central-ajuda">CENTRAL DE AJUDA</Link></h2>
            <h2><Link href="artigo/politica-de-privacidade">POLÍTICA DE PRIVACIDADE</Link></h2>
            <h2><Link href="artigo/termos-de-uso">TERMOS DE USO</Link></h2>
          </div>
        </div>
      </div>

      <img 
        src="images/logo2-footer.png" 
        alt="Logo secundário da marca" 
        className={`${styles.logo} ${styles.logoSecondary}`} 
      />
    </footer>
  );
}