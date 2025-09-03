import Image from "next/image";
import Link from "next/link";

export default function Artigo1() {
  return (
    <> 
      <main>
        <article>
          <h1>
            Sérum Facial: dermatologista fala o que é, como usar e para que serve
          </h1>
          <p>
            O sérum facial é um produto que conquistou destaque na rotina de
            skincare...
          </p>
          {/* resto do conteúdo do artigo */}
          <h3>Passo a passo para aplicar o sérum facial</h3>
          <ul>
            <li>Faça a limpeza com um sabonete específico para o rosto;</li>
            <li>Hidrate a pele com um creme ou gel hidratante;</li>
            <li>Passe algumas gotas do sérum no rosto e espalhe suavemente;</li>
            <li>Espere alguns minutos para que os ativos sejam absorvidos;</li>
            <li>Finalize com protetor solar se for durante o dia.</li>
          </ul>
        </article>
      </main>

      <footer>
        <div id="img-footer">
          <Image src="/Imagens/logo-footer.png" alt="logo" width={150} height={50} />
          <div id="logos-apps">
            <Image src="/Imagens/insta.png" alt="instagram" width={30} height={30} />
            <Image src="/Imagens/x.png" alt="x" width={30} height={30} />
            <Image src="/Imagens/facebook-icone.png" alt="facebook" width={30} height={30} />
            <Image src="/Imagens/pinterest-icone.png" alt="pinterest" width={30} height={30} />
          </div>
        </div>

        <div className="grupos-footer" id="grupo-1">
          <h2>Mapa do Site</h2>
          <p>Quem somos?</p>
          <p>Parcerias</p>
          <p>Contato</p>
          <p>Segurança</p>
        </div>

        {/* resto do footer */}
      </footer>
</> 
 );
}
