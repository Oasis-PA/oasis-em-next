"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '.@/styles/UserMenu.module.css'; // Criaremos este arquivo de estilo a seguir

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    // Chama a API de logout que já criamos
    await fetch('/api/usuarios/logout', { method: 'POST' });
    
    // Fecha o menu
    setIsOpen(false);
    
    // Redireciona para a página inicial e atualiza a página
    router.push('/');
    router.refresh(); 
  };

  return (
    <div className={styles.userMenuContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.iconButton}>
        <Image src="/logo-oasis-icon.ico" alt="Ícone do Usuário" width={40} height={40} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <Link href="/perfil" onClick={() => setIsOpen(false)} className={styles.dropdownItem}>
            Perfil e Configurações
          </Link>
          <Link href="/favoritos" onClick={() => setIsOpen(false)} className={styles.dropdownItem}>
            Meus Favoritos
          </Link>
          <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutButton}`}>
            Sair
          </button>
        </div>
      )}
    </div>
  );
}