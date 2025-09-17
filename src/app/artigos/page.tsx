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

      
    </>
  );
};

export default ArtigoAcidificacao;