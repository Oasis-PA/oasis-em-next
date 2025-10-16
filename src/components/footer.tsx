import React, { useState } from "react";
import '@/styles/componentes.css';

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <footer>
      <img src="images/logo-footer.png" alt="Logo principal da marca" className="footer-logo" />
      
      <div className="footer-links-container">
        
        <div className="footer-column">
          {/* Título original para Desktop */}
          <h1>Mapa do site</h1>
          {/* Botão clicável para Mobile */}
          <button className="accordion-header" onClick={() => toggleAccordion('mapa')}>
            <h1>Mapa do site</h1>
          </button>
          <div className={`accordion-content ${openAccordion === 'mapa' ? 'open' : ''}`}>
            <h2>QUEM SOMOS?</h2>
            <h2>PARCERIAS</h2>
            <h2>CONTATO</h2>
          </div>
        </div>

        <div className="footer-column">
          <h1>Usuário</h1>
          <button className="accordion-header" onClick={() => toggleAccordion('usuario')}>
            <h1>Usuário</h1>
          </button>
          <div className={`accordion-content ${openAccordion === 'usuario' ? 'open' : ''}`}>
            <h2>MINHA CONTA</h2>
            <h2>MEU PERFIL</h2>
            <h2>FAVORITOS</h2>
            <h2>PRODUTOS</h2>
            <h2>CADASTRE-SE</h2>
          </div>
        </div>

        <div className="footer-column">
          <h1>Precisa de suporte?</h1>
          <button className="accordion-header" onClick={() => toggleAccordion('suporte')}>
            <h1>Precisa de suporte?</h1>
          </button>
          <div className={`accordion-content ${openAccordion === 'suporte' ? 'open' : ''}`}>
            <h2>CENTRAL DE AJUDA</h2>
            <h2>POLÍTICA DE PRIVACIDADE</h2>
            <h2>TERMOS DE USO</h2>
          </div>
        </div>

      </div>

      {/* Ação necessária: adicione a classe 'footer-logo--secondary' aqui */}
      <img src="images/logo2-footer.png" alt="Logo secundário da marca" className="footer-logo footer-logo--secondary" />
    </footer>
  );
}