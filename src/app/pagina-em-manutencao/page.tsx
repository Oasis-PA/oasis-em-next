"use client";

import Link from "next/link";
import "@/styles/pagina-em-manutencao.css";

export default function PaginaEmManutencao() {
  return (
    <>
      <main>
        <img 
          src="/images/pagina-em-manutencao/engrenagem.png" 
          alt="Ícone de uma engrenagem" 
          className="img1"
        />
        <h1>Página em manutenção!</h1>
        <p>
          Estamos temporariamente fora do ar para manutenção. Pedimos desculpas 
          pelo inconveniente. Voltaremos a ficar online em breve.
        </p>
        <Link href="/">
          <button>VOLTAR PARA A PÁGINA PRINCIPAL</button>
        </Link>
        <img 
          src="/images/pagina-em-manutencao/logo.png" 
          alt="Logo da Oasis - Beleza e Autoestima" 
          className="img2"
        />
      </main>
    </>
  );
}