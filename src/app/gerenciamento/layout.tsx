"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import "../../styles/editar-perfil.css";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="layout-container">
      {/* Botão menu toggle (mobile) */}
      <button
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Sidebar */}
      <aside id="aside-lateral" className={menuOpen ? "open" : ""}>
        <div className="conte-navbar">
          <a 
            href="../perfil" 
            className={pathname === "/editar-perfil" ? "active" : ""}
            id={pathname === "/editar-perfil" ? "Editar-perfil" : ""}
          >
            Editar Perfil
          </a>
          <a 
            href="../gerenciamento"
            className={pathname === "/gerenciamento-conta" ? "active" : ""}
            id={pathname === "/gerenciamento-conta" ? "Gerenciamento-conta" : ""}
          >
            Gerenciamento de Conta
          </a>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="layout-content">{children}</div>
    </div>
  );
}