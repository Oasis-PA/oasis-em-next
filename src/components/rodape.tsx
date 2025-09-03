
import React from 'react';
import "@/styles/rodape.css"; 
import "@/styles/globals.css";
export default function Footer() {
  return (
    <footer>
      <div id="img-footer">
        <a target="_blank" rel="noopener noreferrer" href="../../index.html">
          <img
            id="logo-footer"
            src="imagens rodape/logo-footer.png"
            alt="logo"
          />
        </a>

        <div id="logos-apps">
          <img src="imagens rodape/insta.png" alt="instagram" />
          <img src="imagens rodape/x.png" alt="x" />
          <img src="imagens rodape/facebook-icone.png" alt="facebook" />
          <img src="imagens rodape/pinterest-icone.png" alt="pinterest" />
        </div>
      </div>

      <div id="invi-2"></div>

      <div className="grupos-footer" id="grupo-1">
        <h2>Mapa do Site</h2>
        <p>Quem somos?</p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="../../Parcerias/Empresas/index.html"
        >
          <p>Parcerias</p>
        </a>
        <p>Contato</p>
        <p>Segurança</p>
      </div>

      <div className="grupos-footer" id="grupo-2">
        <h2>Usuário</h2>
        <p>Painel</p>
        <p>Minha conta</p>
        <p>Meu avatar</p>
        <p>Meus favoritos</p>
        <p>Minhas avaliações sobre</p>
        <p>Produtos</p>
        <p>Cadastre-se</p>
      </div>

      <div className="grupos-footer" id="grupo-3">
        <h2>Precisa de Suporte?</h2>
        <p>Central de Ajuda</p>
        <p>Política de Privacidade</p>
        <p>Termos de Uso</p>
        <p>Modo Escuro</p>
        <p>Segurança</p>
      </div>

      <div className="grupos-footer" id="grupo-4">
        <h1>Interação com o cliente</h1>
        <p>Para maiores dúvidas ou esclarecimentos, entre em contato.</p>
        <h6>
          Estamos disponíveis de segunda à sexta, das 9h às 17h, exceto feriados.
        </h6>
        <button>
          <b>ATENDIMENTO</b>
        </button>
      </div>

      <div id="logo-2">
        <img src="imagens rodape/logo2.png" alt="logo 2" />
      </div>
    </footer>
  );
};


