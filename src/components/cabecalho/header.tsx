import React from "react";
import Link from "next/link";
import '../../styles/componentes.css';

export default function Header() {
  return (
    <header>
      <section className="em_ciminha">
        <Link href="/" passHref legacyBehavior>
          <a id="imagi" aria-label="Página inicial"></a>
        </Link>
        <div className="emoticus">
          <Link href="/" passHref legacyBehavior>
            <a id="algo" aria-label="Buscar"></a>
          </Link>
          <Link href="/favoritos" passHref legacyBehavior>
            <a id="coracao" aria-label="Favoritos"></a>
          </Link>
          <Link href="/perfil" passHref legacyBehavior>
            <a id="user" aria-label="Perfil"></a>
          </Link>
        </div>
      </section>
      <section className="em_baixinho">
        <div className="coisas">
          <Link href="/corteS" passHref legacyBehavior>
            <a id="redirecionavel">Cortes</a>
          </Link>
          <Link href="/" passHref legacyBehavior>
            <a id="redirecionavel">Penteados</a>
          </Link>
          <Link href="/tinturas" passHref legacyBehavior>
            <a id="redirecionavel">Coloração</a>
          </Link>
          <Link href="/skincare" passHref legacyBehavior>
            <a id="redirecionavel">Skincare</a>
          </Link>
          <Link href="/cronograma-capilar" passHref legacyBehavior>
            <a id="redirecionavel2">Cronograma Capilar</a>
          </Link>
          <Link href="/artigos" passHref legacyBehavior>
            <a id="redirecionavel">Artigos</a>
          </Link>
        </div>
      </section>
    </header>
  );
}