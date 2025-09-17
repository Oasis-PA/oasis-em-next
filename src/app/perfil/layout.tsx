"use client";

import React, { useState } from "react";

import "../../styles/editar-perfil.css";

interface LayoutProps {
 children: React.ReactNode;
  onSave?: () => void;   // salvar
  onReset?: () => void;  // redefinir
}

export default function Layout({ children, onSave, onReset }: LayoutProps) {
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
            <a href="/gerenciamento-conta">Gerenciamento de Conta</a>
          </div>
        </aside>

      {/* Conteúdo principal */}
      <div className="layout-content">{children}</div>

      {/* Footer fixo */}
      <footer>
        <button type="button" onClick={onReset}>Redefinir</button>
        <button type="button" onClick={onSave}>Salvar</button>
      </footer>
    </div>
  );
}
