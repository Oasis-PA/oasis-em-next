import React from "react";
import '@/styles/componentes.css';

export default function Footer() {
  return (
    <footer>
      <img src="images/logo-footer.png" alt="Logo principal da marca" className="footer-logo" />
      <div>
        <div>
          <h1>Mapa do site</h1>
          <h2>QUEM SOMOS?</h2>
          <h2>PARCERIAS</h2>
          <h2>CONTATO</h2>
        </div>
        <div>
          <h1>Usuário</h1>
          <h2>MINHA CONTA</h2>
          <h2>MEU PERFIL</h2>
          <h2>FAVORITOS</h2>
          <h2>PRODUTOS</h2>
          <h2>CADASTRE-SE</h2>
        </div>
        <div>
          <h1>Precisa de suporte?</h1>
          <h2>CENTRAL DE AJUDA</h2>
          <h2>POLÍTICA DE PRIVACIDADE</h2>
          <h2>TERMOS DE USO</h2>
        </div>
      </div>
      <img src="images/logo2-footer.png" alt="Logo secundário da marca" className="footer-logo" />
    </footer>
  );
}