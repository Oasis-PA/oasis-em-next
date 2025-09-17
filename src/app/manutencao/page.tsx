import React from 'react';
import Image from 'next/image';
// Importando a folha de estilos diretamente no componente.
// Ajuste o caminho se o seu arquivo CSS estiver em outro lugar.
import '@/styles/pagina-em-manutencao.css'; 

const PaginaEmManutencao: React.FC = () => {
  return (
    // O elemento 'main' já é centralizado pelo CSS, então não precisamos de divs extras.
    <main>
      <img 
        id="Engrenagem" 
        src="/images/pagina-em-manutencao/engrenagem (2).png" 
        alt="Engrenagem girando, indicando manutenção" 
        width="259" 
        height="259" 
      />
      <p id="texto-1">MANUTENÇÃO EM ANDAMENTO!</p>
      <p id="texto-2">
        Estamos temporariamente fora do ar para manutenção. Pedimos desculpas 
        pelo inconveniente. Voltaremos a ficar online em breve.
      </p>
      
      {/* Imagem do logo com texto */}
      <img 
        src="/images/pagina-em-manutencao/logo-texto.png" 
        alt="Logo da empresa Oasis" 
      />
      
      {/* Imagem do ícone da Oasis */}
      <img 
        id="Oasis" 
        src="/images/pagina-em-manutencao/image 17 (1).png" 
        alt="Ícone da logo Oasis flutuando" 
      />
      
      <p>
        <strong id="texto-3">BELEZA E AUTOESTIMA</strong>
      </p>
    </main>
  );
};

export default PaginaEmManutencao;