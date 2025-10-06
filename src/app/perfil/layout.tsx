"use client";

import React, { useState } from "react";

import "../../styles/editar-perfil.css";


export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const [menuOpen, setMenuOpen] = useState(false);

   return (
    <div className="layout-container">
      {/* Botão menu toggle (mobile) */}
      <button
        className="menu-toggle"
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
            <a href=".. /gerenciamento">Gerenciamento de Conta</a>
          </div>
        </aside>

      {/* Conteúdo principal */}
      <div className="layout-content">{children}</div>

      {/* Footer fixo */}
    
    </div>
  );
}
