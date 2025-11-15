"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation"; // 1. Importe o usePathname
import "@/styles/editar-perfil.css";


interface LayoutProps {
  children: React.ReactNode;
  onCancel?: () => void;
  onSave?: () => void;
  isLoading?: boolean;
}

export default function Layout({ children, onCancel, onSave, isLoading }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // 2. Obtenha o caminho da URL atual

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
            {/* 3. Verifique o pathname e aplique a classe 'active' dinamicamente */}
            <a
              href="/perfil" // É uma boa prática usar o caminho completo
              className={pathname === '/perfil' ? 'active' : ''}
            >
              Editar Perfil
            </a>
            <a
              href="/gerenciamento" // É uma boa prática usar o caminho completo
              className={pathname === '/gerenciamento' ? 'active' : ''}
            >
              Gerenciamento de Conta
            </a>
          </div>
        </aside>

      {/* Conteúdo principal */}
      <div className="layout-content">
        {children}
      </div>

      {/* Footer fixo - Oculto durante carregamento */}
      {!isLoading && (
        <footer>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancelar</button>
          <button type="button" onClick={onSave} className="btn btn-primary">Salvar</button>
        </footer>
      )}
    </div>
  );
}