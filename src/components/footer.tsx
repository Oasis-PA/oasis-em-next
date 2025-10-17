import React, { useState } from "react";
import '@/styles/componentes.css';
import Link from 'next/link';

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <footer>
      <Link href='/'><img src="images/logo-footer.png" alt="Logo principal da marca" className="footer-logo" /></Link>
      
      <div className="footer-links-container">
        
        <div className="footer-column">
          <h1>Mapa do site</h1>
          <button className="accordion-header" onClick={() => toggleAccordion('mapa')}>
            <h1>Mapa do site</h1>
          </button>
          <div className={`accordion-content ${openAccordion === 'mapa' ? 'open' : ''}`}>
            <h2><Link href="https://www.canva.com/design/DAGUDgD6xDA/bBIs_ChnovCCuLiIotu_JQ/edit">QUEM SOMOS?</Link></h2>
            <h2><Link href="/parcerias-empresas">PARCERIAS</Link></h2>
          </div>
        </div>

        <div className="footer-column">
          <h1>Usuário</h1>
          <button className="accordion-header" onClick={() => toggleAccordion('usuario')}>
            <h1>Usuário</h1>
          </button>
          <div className={`accordion-content ${openAccordion === 'usuario' ? 'open' : ''}`}>
            <h2><Link href="/gerenciamento">MINHA CONTA</Link></h2>
            <h2><Link href="/perfil">MEU PERFIL</Link></h2>
            <h2><Link href="/favoritos">FAVORITOS</Link></h2>
            <h2><Link href="/produtos">PRODUTOS</Link></h2>
            <h2><Link href="/cadastro">CADASTRE-SE</Link></h2>
          </div>
        </div>

        <div className="footer-column">
          <h1>Precisa de suporte?</h1>
          <button className="accordion-header" onClick={() => toggleAccordion('suporte')}>
            <h1>Precisa de suporte?</h1>
          </button>
          <div className={`accordion-content ${openAccordion === 'suporte' ? 'open' : ''}`}>
            <h2><Link href="/central-ajuda">CENTRAL DE AJUDA</Link></h2>
            <h2><Link href="/central-ajuda">POLÍTICA DE PRIVACIDADE</Link></h2>
            <h2><Link href="/central-ajuda">TERMOS DE USO</Link></h2>
          </div>
        </div>

      </div>

      <img src="images/logo2-footer.png" alt="Logo secundário da marca" className="footer-logo footer-logo--secondary" />
    </footer>
  );
}