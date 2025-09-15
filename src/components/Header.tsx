import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Header.module.css'


export default function Header() {
  return(
   <header className={styles.header}>
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
            <Link href="Cadastro1">
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
     </header>
  )
   
};


