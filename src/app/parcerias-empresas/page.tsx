// Para a funcionalidade de dark mode (useState, useEffect), o componente precisa ser um Client Component.
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Usando Link para navegação otimizada no Next.js
import Script from 'next/script'; // Usando Script para carregar JS de forma otimizada
import Image from 'next/image'; // Usando Image para otimização de imagens
// Importando a folha de estilos. Ajuste o caminho se necessário.
import '@/styles/parcerias-empresas.css';

const ParceriasEmpresasPage: React.FC = () => {

    return (
        <>

            <main>
                <article id="container">
                    <form action="" method="get">
                        <h1 className="titulo">COMO PODEMOS AJUDAR?</h1>
                        <p className="subtitulo">Nossa equipe vai te responder com a maior disponibilidade.</p>

                        <section id="caixas-texto">
                            <input type="text" name="nome" id="nome" placeholder="Nome e Sobrenome..." />
                            <input type="email" name="email" id="email" placeholder="Email Corporativo..." />
                            <div id="telefone">
                                <p>BR</p>
                                <img src="/images/parcerias-empresas/brasil.png" alt="Brasil" />
                                <p>+55</p>
                                <input type="tel" name="telefone" id="telefone-input" placeholder="00 00000-0000" />
                            </div>
                            <input
                                type="text"
                                name="empresa-que-representa"
                                id="empresa-que-representa"
                                placeholder="Empresa que representa..."
                            />
                            <input
                                type="text"
                                name="total-colaboradores"
                                id="total-colaboradores"
                                placeholder="Total de colaboradores..."
                            />
                            <input type="text" name="seu-cargo" id="seu-cargo" placeholder="Seu cargo..." />
                        </section>

                        <section id="contato">
                            <textarea name="motivo" id="motivo" placeholder=" Nos conte um pouco do que deseja"></textarea>
                        </section>

                        <section className="cliente">
                            <Link className="eusou2" href="/login">
                                <img src="/images/parcerias-empresas/usuario.png" alt="Ícone de usuário" />
                                <p className="eusoua">Eu sou um usuário</p>
                                <p className="eusoub">Dúvidas sobre o funcionamento do site, requisição de dados gerais, reportação de erros.</p>
                            </Link>
                            <Link className="eusou" href="/parcerias-empresas">
                                <img src="/images/parcerias-empresas/empresa.png" alt="Ícone de empresa" />
                                <p className="eusoua">Eu sou uma empresa</p>
                                <p className="eusoub">Contato para parcerias, dúvidas sobre regulamentos, reportação de queixas.</p>
                            </Link>
                        </section>

                        <button type="button" className="conheça" id="conheça">CONHEÇA</button>
                    </form>
                </article>

                <aside>
                    <figure>
                        <p id="data">13 jan 2025</p>
                        <p id="artigo">Algum artigo escrito aqui</p>
                        <section className="morcas">
                            <p className="moda">Moda</p>
                            <p className="moda">Marcas</p>
                        </section>
                    </figure>
                </aside>
            </main>

            {/* Carrega o script da pasta /public de forma otimizada */}
            <Script src="/parcerias.js" strategy="afterInteractive" />
        </>
    );
};

export default ParceriasEmpresasPage;