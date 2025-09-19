import React from 'react';

// Importando a folha de estilos. Ajuste o caminho se necessário.
import '@/styles/tinturas.css';

const TinturasPage: React.FC = () => {
  return (
    <>
      <section className="retangulo">
        <div className="sessao-1">
          <p className="seuvisual">Transforme seu visual com cores diferentes e cuidados especiais !</p>
          <img src="/images/tinturas/Line 89.png" alt="" id="linha1" />
          <div id="doisframe">
            <img src="/images/tinturas/Frame 123.png" alt="" id="frame123" />
            <img src="/images/tinturas/Frame 124.png" alt="" id="frame124" />
          </div>
          <img src="/images/tinturas/Line 89.png" alt="" id="linha2" />
        </div>
        <div>
          <img src="/images/tinturas/imagem capa.png" alt="" id="imgcapa" />
        </div>
      </section>

      <section>
        <div>
          <p>Tipos de Tintura para Cabelos</p>
        </div>
      </section>
    </>
  );
};

export default TinturasPage;