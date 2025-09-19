import React from 'react';
import Link from 'next/link'; // Importando o componente Link do Next.js para navegação

// Importando todas as folhas de estilo necessárias para a página.
// Verifique se os caminhos correspondem à estrutura do seu projeto.

import '@/styles/avatar.css';
// A importação de fontes geralmente é feita em um layout global, mas mantive aqui para seguir a estrutura original.



const MeuAvatarPage: React.FC = () => {
  return (
    <>
      <section className="sec1">
        <div className="sec1-texto">
          <h1 className="titulo">Monte seu perfil único!</h1>
          <p className="texto">Porque cada detalhe seu importa — da pele ao estilo</p>
        </div>
      </section>

      <section className="sec2">
        <div className="sec2-texto">
          <h1 className="titulo">CRIE SEU PERFIL</h1>
          <p className="texto">Sua identidade, suas regras. Comece a montar agora!</p>
          {/* Usando o componente Link do Next.js para a navegação */}
          <Link href="/crie-agora">CRIE AGORA</Link>
        </div>

        <div className="sec2-imagem">
          {/* O caminho da imagem agora é absoluto a partir da pasta 'public' */}
          <img src="/images/Avatar/scorza.png" alt="Avatar" />
        </div>
      </section>
    </>
  );
};

export default MeuAvatarPage;