import React from "react";
import '@/styles/componentes.css';

export default function Footer() {
  return (
    <footer>
      <div className="cositas">
        <section className="uno">
          <div id="logo"></div>
          <div className="redes">
            <a id="instagram" href=""></a>
            <a id="twitter" href=""></a>
            <a id="facebuk" href=""></a>
            <a id="pintereste" href=""></a>
          </div>
        </section>
        <section className="dos">
          <h1>Mapa do Site</h1>
          <div className="textinho">
            <a href="">Quem somos</a>
            <a href="">Parceria</a>
            <a href="">Contato</a>
            <a href="">Segurança</a>
          </div>
        </section>
        <section className="dos">
          <h1>Usuário</h1>
          <div className="textinho">
            <a href="">Painel</a>
            <a href="">Minha conta</a>
            <a href="">Meu avatar</a>
            <a href="">Meus favoritos</a>
            <a href="">Produtos</a>
            <a href="">Cadastre-se</a>
          </div>
        </section>
        <section className="dos">
          <h1>Precisa de ajuda?</h1>
          <div className="textinho">
            <a href="">Central de ajuda</a>
            <a href="">Politica de privacidade</a>
            <a href="">Termos de uso</a>
            <a href="">Segurança</a>
          </div>
        </section>
        <section className="tres">
          <h1>Interação com o cliente</h1>
          <h2>Para maiores dúvidas ou esclarecimentos, entre em contato.</h2>
          <h3>Estamos disponíveis de segunda à sexta, das 9h às 17h, exceto feriados.</h3>
          <button>Atendimento</button>
        </section>
        <section className="cuatro"></section>
      </div>
    </footer>
  );
}