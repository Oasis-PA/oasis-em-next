// src/app/artigo1/page.tsx
import Link from "next/link";
import Image from "next/image";
import "../../styles/artigo1.css";

export default function Artigo1() {
  return (
    <main>
      <article>
        <h1>
          Sérum Facial: dermatologista fala o que é, como usar e para que serve
        </h1>

        <p>
          O sérum facial é um produto que conquistou destaque na rotina de
          skincare. O produto conta com textura fluída e fácil absorção da pele
          do rosto. Quando combinado com ativos dermatológicos, como o ácido
          hialurônico e retinol, ele pode trazer diversos benefícios para a pele
          como hidratação, prevenção do envelhecimento precoce e tratamento de
          marcas.
        </p>

        <p>
          Para tirar todas as suas dúvidas sobre o uso do sérum facial,
          convidamos as dermatologistas Fabiana Wanick e Annelise Marmore para
          detalhar sobre esse produto e seu uso e explicar como ele pode ser
          incluído na sua rotina de cuidados com o rosto.
        </p>

        <h3>O que é sérum facial?</h3>
        <p>
          A Dra. Fabiana Wanick explica o que é o sérum facial: “o sérum facial
          é um produto fluido, leve, fácil de aplicar e espalhar. Além disso,
          ele é versátil pois pode ser benéfico em diferentes tipos de pele”. O
          sérum é um veículo que vai entregar para a pele os benefícios de
          ativos dermatológicos, como ácido hialurônico ou ácido salicílico.
          <br />
          O sérum facial é formado por uma solução aquosa, ou seja, é diferente
          do óleo facial. Por conta dessas características, se adapta de forma
          fácil em diversos tipos de pele, tanto as mais secas quanto as mais
          oleosas. Por conta da facilidade, é possível incluir o sérum facial de
          forma simples em sua rotina de cuidados diários com a pele.
        </p>

        <h3>Para que serve o sérum facial?</h3>
        <p>
          O sérum facial tem a principal função de hidratação da pele. Porém, é
          possível que o sérum conte com outras funções dependendo dos ativos
          dermatológicos que ele é enriquecido. Por exemplo, o sérum facial com
          ácido hialurônico tem ação de hidratação profunda e antissinais,
          enquanto que o sérum com vitamina C tem ação antioxidante, de
          tratamento de manchas da pele e de iluminar o rosto. Por isso, a
          função exata do sérum facial vai depender da composição de cada
          produto.
        </p>

        <h3>Quando passar o sérum no rosto?</h3>
        <p>
          A Dra. Fabiana Wanick explica: “O sérum pode ser aplicado no rosto
          todos os dias. A pele sofre constantemente agressões de fatores
          externos como sabonetes, água quente, poluição e sol. Para que o
          benefício do produto seja mantido, e até para proteger a pele de todas
          essas agressões, o produto deve ser aplicado na rotina de skincare
          diurna e noturna.”
          <br /> Pode ser usado de manhã e/ou à noite, dependendo do tipo de
          pele e dos outros produtos.
          <br /> Não se esqueça de aplicar protetor solar após o uso do sérum.
        </p>

        <h3>Passo a passo para aplicar o sérum facial</h3>
        <p>O sérum facial tem uma aplicação muito simples. Para aplicar:</p>

        <ul>
          <li>Faça a limpeza com um sabonete específico para o rosto;</li>
          <li>Hidrate a pele com um creme ou gel hidratante;</li>
          <li>Passe algumas gotas do sérum no rosto e espalhe suavemente;</li>
          <li>Espere alguns minutos para que os ativos sejam absorvidos;</li>
          <li>Finalize com protetor solar se for durante o dia.</li>
        </ul>
      </article>
    </main>
  );
}
