"use client";

import React, { useState } from "react";

import "../../styles/editar-perfil.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <body>
        {/* Botão menu toggle (mobile) */}
        <button
          className="menu-toggle"
          id="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Sidebar */}
        <aside id="aside-lateral" className={menuOpen ? "open" : ""}>
          <div className="conte-navbar">
            <a href="#" id="Editar-perfil">
              Editar Perfil
            </a>
            <a href="/gerenciamento-conta">Gerenciamento de Conta</a>
          </div>
        </aside>

        {/* Conteúdo principal (children da página) */}
        <div id="lol">{children}</div>

        {/* Footer fixo */}
        <footer>
          <button type="button">Redefinir</button>
          <button id="bt" type="button">
            Salvar
          </button>
        </footer>
      </body>
    </html>
  );
}
