import { Header, Footer } from "@/components";

import Image from "next/image";
import Link from "next/link";

import styles from '@/styles/page.module.css';

export default function OasisHomepage() {
  return (
      <>
      <main className={styles.mainContainer}>
        <h2>Tratamentos inovadores</h2>
        <h1>Cuidado sem limites</h1>
        <button>CONHEÇA</button>
        <div>
          <Link href="#"><img src="/images/tela-principal/bolinha-marcada.svg" alt="" /></Link>
          <Link href="#"><img src="/images/tela-principal/bolinha-naomarcada.svg" alt="" /></Link>
          <Link href="#"><img src="/images/tela-principal/bolinha-naomarcada.svg" alt="" /></Link>
        </div>
      </main>
      </>
  );
}