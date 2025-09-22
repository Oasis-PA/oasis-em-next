"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/skincare.css";

export default function skincare() {
  return (
    <>
    <header>
      <h1>SKIN</h1>
      <h2>CARE</h2>
    </header>
    
    <main>
      <section id="s1">
        <h1>Skincare com Propósito: Cuidar de Todos os Tons de Beleza</h1>
        <div id="tons"></div>
      </section>
    </main>
    </>
  );
}