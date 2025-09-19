import React from 'react';
import Link from 'next/link'; // Usando Link para navegação otimizada no Next.js
import Script from 'next/script'; // Usando Script para carregar JS de forma otimizada
import Image from 'next/image'; // Usando Image para otimização de imagens
// Importando a folha de estilos. Ajuste o caminho se necessário.
import '@/styles/atendimento-usuario.css';

const AtendimentoUsuarioPage: React.FC = () => {
  return (
    <>
      <main>
        <div id="container">
          <form action="" method="get">
            <h1 className="titulo">COMO PODEMOS AJUDAR?</h1>
            <p className="subtitulo">Nossa equipe vai te responder com a maior disponibilidade.</p>
            
            <div id="caixas-texto">
              <input type="text" name="nome" id="nome" placeholder="Sofia Ferreira" />
              <input type="email" name="email" id="email" placeholder="ferreira.so97@gmail.com" />
              <div id="telefone">
                <p>BR</p>
                <img src="/images/atendimento-usuario/brasil.png" alt="Brasil" />
                <p>+55</p>
                <input type="tel" name="telefone" id="telefone-input" placeholder="00 00000-0000" />
              </div>
            </div>
            
            <label htmlFor="motivo">
              <p className="contato">Qual o motivo do contato?</p>
            </label>
            <textarea name="motivo" id="motivo" placeholder=" Nos conte o que podemos fazer por você (outros)..."></textarea>

            <div className="eu">
              <Link className="eusou" href="/gerenciamento-conta">
                <img src="/images/atendimento-usuario/usuario.png" alt="Ícone de usuário" />
                <p className="eusoua">Eu sou um usuário</p>
                <p className="eusoub">Dúvidas sobre o funcionamento do site, requisição de dados gerais, reportação de erros.</p>
              </Link>
              <Link className="eusou2" href="/parcerias">
                <img src="/images/atendimento-usuario/empresa.png" alt="Ícone de empresa" />
                <p className="eusoua">Eu sou uma empresa</p>
                <p className="eusoub">Contato para parcerias, dúvidas sobre regulamentos, reportação de queixas.</p>
              </Link>
            </div>

            <button type="button" id="conheça">CONHEÇA</button>
          </form>
        </div>

        <aside>
          <figure>
            <p id="data">13 jan 2025</p>
            <p id="artigo">Algum artigo escrito aqui</p>
            <div className="morcas">
              <p className="moda">Moda</p>
              <p className="moda">Marcas</p>
            </div>
          </figure>
        </aside>
      </main>

      {/* Carrega o script da pasta /public de forma otimizada, 
          após a página se tornar interativa */}
      <Script src="/parcerias.js" strategy="afterInteractive" />
    </>
  );
};

export default AtendimentoUsuarioPage;