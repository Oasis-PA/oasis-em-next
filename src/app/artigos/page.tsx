// Para a funcionalidade de dark mode (useState, useEffect), o componente precisa ser um Client Component.
"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link'; // Usando o Link do Next.js para navegação

// Importando a folha de estilos. Ajuste o caminho se necessário.
import '@/styles/artigo2.css'; 

const ArtigoAcidificacao: React.FC = () => {
  // Estado para controlar o tema (dark ou light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efeito para adicionar ou remover a classe 'dark' do body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <>
      <header>
        <aside>
          <div id="container-logo">
            <Link href="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>
          <div id="invi"></div>
          <div id="container-usuario">
            <Link href="/pesquisa"><img src="/images/lupa.png" alt="lupa" /></Link> 
            <Link href="/favoritos"><img src="/images/salvo.png" alt="salvo" /></Link>
            <Link href="/login"><img src="/images/perfil.png" alt="perfil" /></Link>
          </div>
        </aside>
        <nav>
            <Link className="texto-roxo" href="/cortes">CORTES</Link>
            <Link className="texto-roxo" href="#">PENTEADOS</Link>
            <Link className="texto-roxo" href="#">COLORAÇÃO</Link>
            <Link className="texto-roxo" href="/skincare">SKINCARE</Link>
            <Link className="texto-amarelo" href="#">CRONOGRAMA CAPILAR</Link>
            <Link className="texto-roxo" href="#">RECOMENDAÇÕES</Link>
        </nav>
      </header>
      
      {/* Dark Mode Toggle - Estrutura recriada do CSS */}
      <div className="label">
        <input 
            type="checkbox" 
            className="check" 
            id="check-toggle" 
            onChange={toggleDarkMode}
            checked={isDarkMode}
        />
        <label htmlFor="check-toggle" className="bolinha">
            <img id='sol' src='/images/sol.png' alt='Modo claro' />
            <img id='lua' src='/images/lua.png' alt='Modo escuro' />
        </label>
      </div>


      <main>
        <article>
          <h1>Como fazer acidificação no cabelo? Confira dicas</h1>
          
          <p>
            Tens ouvido bastante sobre acidificação? Esse procedimento ganhou um buzz nos últimos tempo por conta da sua ação nos cabelos, que equilibra o pH dos fios. 
          </p>
        
          <h3>O que é acidificação capilar?</h3>
          <p>
            A acidificação capilar é um procedimento realizado nos fios que sofrem com o aspecto áspero, opaco, sem brilho e desidratado. Ele é responsável por repor o pH do cabelo, que é ácido, evitando a abertura da cutícula capilar e assim, permitindo que o cabelo possa absorver e reter a água.
            Quando são feitos procedimentos químicos como coloração, descoloração, ou exposição excessiva a fontes de calor, o cabelo sofre agressões nos fios, ficando com a cutícula aberta, desta forma é importante adotar o uso do acidificante na sua rotina de cuidados com o cabelo.
          </p>
       
          <h3>Qual o produto para fazer acidificação no cabelo?</h3>
          <p>
            Existem duas formas de realizar a acidificação: com um produto especial para essa função ou com receitas caseiras. A receita caseira de acidificante consiste em misturar uma certa quantidade de vinagre de maçã ao creme de hidratação de sua preferência, assim o pH do fio pode ser estabilizado.
            Já o acidificante capilar cosmético, tem a mesma finalidade que é selar as cutículas e equilibrar o pH, porém é formulado com ativos e compostos que atuam com maior precisão nos fios, sem correr o risco de sofrer danos e ter maior praticidade no seu dia a dia.
          </p>
        
          <h3>Dicas de como fazer acidificação no cabelo</h3>
          <p>
            A acidificação pode ser feita com um produto industrializado, normalmente em formato de creme, que deve ser usado depois do shampoo e antes da máscara capilar.
            Portanto, se você está planejando fazer uma hidratação, faça depois que acidificar os fios. Assim, as cutículas dos fios vão estar fechadas e prontas para absorverem melhor o tratamento.            
            Lave o cabelo com shampoo, aplique o acidificante, deixe agir pelo tempo indicado na embalagem e enxágue. Depois finalize com a máscara capilar.
          </p>
       
          <h3>Quantas vezes por semana posso passar acidificante no cabelo?</h3>
          <p>
            De acordo com a Dra. Joana Darc, um cabelo que está muito poroso, que acabou de passar por uma descoloração intensa e agressiva nos cabelos, pode usar o acidificante seguido por um tratamento reconstrutor uma vez por semana.
            Já cabelos menos danificados, a cada 15 dias e cabelos levemente danificados, a cada 30 dias.
          </p>
        </article>
      </main>

      <footer>
        <div id="img-footer"> 
          <img id="logo-footer" src="/images/logo-footer copy.png" alt="logo do rodapé" />
          <div id="logos-apps">
            <img src="/images/insta copy.png" alt="instagram" />
            <img src="/images/x copy.png" alt="x" />
            <img src="/images/facebook-icone copy.png" alt="facebook" />
            <img src="/images/pinterest-icone copy.png" alt="pinterest" />
          </div>
        </div>
        <div id="invi-2"></div>
        <div className="grupos-footer" id="grupo-1" >
            <h2>Mapa do Site</h2>
            <p>Quem somos?</p>
            <p>Parcerias</p>
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
          <h6>Estamos disponíveis de segunda à sexta, das 9h às 17h, exceto feriados.</h6>
          <button> 
             <b>ATENDIMENTO</b>
          </button>
        </div> 
        <div id="logo-2">
            <img src="/images/logo2 copy.png" alt="logo homem" />
        </div>
      </footer>
    </>
  );
};

export default ArtigoAcidificacao;