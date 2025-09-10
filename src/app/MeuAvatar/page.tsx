
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../styles/avatar.css';
import { Footer} from '@/components';   

const AvatarPage = () => {
  return (
    <>
      <main>
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
            <Link href="/criar-perfil">CRIE AGORA</Link>
          </div>

          <div className="sec2-imagem">
            <img
              src="/images/Avatar/scorza.png" 
              alt="Avatar"
              width={400}
              height={400}
            />
          </div>
        </section>
      </main>
      <Footer />

      
    </>
  );
};

export default AvatarPage;