import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Header.module.css'
import { jwtDecode } from "jwt-decode";


interface TokenPayload {
  id: number;         // id do usuário
  hasProfile: boolean; // se já tem perfil preenchido ou não
  exp: number;         // timestamp de expiração do token (vem do JWT)
}


export default function Header() {  
     const [profileHref, setProfileHref] = useState("/Cadastro1");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);

        // se já tem perfil, vai para editar
        if (decoded.hasProfile) {
          setProfileHref("/editar-perfil");
        } else {
          setProfileHref("/Cadastro1");
        }
      }
    } catch (err) {
      console.error("Erro ao ler token:", err);
      setProfileHref("/login");
    }
  }, []);

      return(<header className={styles.header}>
      <div className={styles.tudinho}>
        <section className={styles.emCiminha}>
          <div >
            <Link href="/">
           <Image className={styles.logo} src="/images/logo.png" alt="Salvos" width={400} height={400} />
            </Link>
          </div>

          <div className={styles.interagivel}>
            <Link href="/pesquisa">
              <Image src="/images/lupa.png" alt="Buscar" width={50} height={50} />
            </Link>
            <Link href="favoritos">
              <Image src="/images/salvo.png" alt="Salvos" width={50} height={50} />
            </Link>
            <Link href={profileHref}>
              <Image src="/images/perfil.png" alt="Perfil" width={50} height={50} />
            </Link>
          </div>
        </section>

        <section className={styles.emBaixinho}>
          <p className={styles.headerTit1}>Cortes</p>
          <p className={styles.headerTit1}>Penteados</p>
          <p className={styles.headerTit1}>Coloração</p>
          <p className={styles.headerTit1}>Skincare</p>
          <p className={styles.headerTit2}>Cronograma Capilar</p>
          <p className={styles.headerTit1}>Recomendações</p>
        </section>
      </div>
      </header>)
    
};


