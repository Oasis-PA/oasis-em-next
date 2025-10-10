"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/pos_login.module.css";

interface PosLoginProps {
  userName?: string;
  userEmail?: string;
  userPhoto?: string;
  logoSrc?: string;
  onDarkModeToggle?: (isDarkMode: boolean) => void;
  onLogout?: () => void;
}

export default function PosLogin({
  userName = "Sofia Ferreira",
  userEmail = "ferreira.so97@gmail.com",
  userPhoto = "/images/pos-login/usuario.png",
  logoSrc = "/images/pos-login/logo.svg",
  onDarkModeToggle,
  onLogout,
}: PosLoginProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (onDarkModeToggle) {
      onDarkModeToggle(newDarkMode);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.uno}>
        <Image
          id="logo"
          src={logoSrc}
          alt="Logo"
          width={162}
          height={168}
          className={styles.logo}
        />
      </section>

      <section className={styles.dos}>
        <div className={styles.foto}>
          <Image
            id="usuario"
            src={userPhoto}
            alt="Foto do usuário"
            width={100}
            height={100}
            className={styles.usuario}
          />
        </div>

        <div className={styles.info}>
          <h1>{userName}</h1>
          <h2>{userEmail}</h2>
        </div>
      </section>

      <section className={styles.tres}>
        <div className={styles.textos1}>
          <Link href="/perfil">Meu Perfil</Link>
          <Link href="/perfil/conta">Minha Conta</Link>
          <Link href="/perfil/configuracoes">Configurações</Link>
        </div>

        <div className={styles.textos2}>
          <Link href="/contato/usuario">Entre em contato - Usuário</Link>
          <Link href="/contato/empresa">Entre em contato - Empresa</Link>
        </div>

        <div className={styles.textos3}>
          <div className={styles.esquerda}>
            <p>Modo Escuro</p>
            <Link href="/duvidas">Dúvidas Frequentes</Link>
            <Link href="/sobre">Sobre Nós</Link>
          </div>

          <div className={styles.direita}>
            <button
              onClick={toggleDarkMode}
              className={isDarkMode ? styles.active : ""}
              aria-label="Toggle dark mode"
            />
          </div>
        </div>

        <div className={styles.textos4}>
          <Link href="/login" onClick={handleLogout}>Sair</Link>
        </div>
      </section>
    </main>
  );
}
