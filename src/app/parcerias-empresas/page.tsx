"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Header, Footer } from "@/components";
import styles from '@/styles/parcerias-empresas.module.css';

const ParceriasEmpresasPage: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        empresaRepresentada: '',
        totalColaboradores: '',
        cargo: '',
        motivo: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/parcerias/empresas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: data.message
                });
                // Limpa o formulário
                setFormData({
                    nome: '',
                    email: '',
                    telefone: '',
                    empresaRepresentada: '',
                    totalColaboradores: '',
                    cargo: '',
                    motivo: ''
                });
            } else {
                setMessage({
                    type: 'error',
                    text: data.error || 'Erro ao enviar solicitação'
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Erro ao enviar solicitação. Tente novamente.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <Header />
        <div className={styles.wrapper}>
            {/* main agora recebe classe para flexbox */}
            <main className={styles.mainContent}>
                
                {/* id="container" virou classe formContainer */}
                <article className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h1 className={styles.titulo}>COMO PODEMOS AJUDAR?</h1>
                        <p className={styles.subtitulo}>Nossa equipe vai te responder com a maior disponibilidade.</p>

                        {message.text && (
                            <div className={`${styles.message} ${message.type === 'success' ? styles.success : styles.error}`}>
                                {message.text}
                            </div>
                        )}

                        {/* id="caixas-texto" virou classe caixasTexto */}
                        <section className={styles.caixasTexto}>
                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="Nome e Sobrenome..."
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Corporativo..."
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            
                            {/* id="telefone" virou classe telefoneWrapper */}
                            <div className={styles.telefoneWrapper}>
                                <p>BR</p>
                                <img src="/images/parcerias-empresas/brasil.png" alt="Brasil" />
                                <p>+55</p>
                                <input
                                    type="tel"
                                    name="telefone"
                                    id="telefone-input"
                                    placeholder="00 00000-0000"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <input
                                type="text"
                                name="empresaRepresentada"
                                id="empresa-que-representa"
                                placeholder="Empresa que representa..."
                                value={formData.empresaRepresentada}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="totalColaboradores"
                                id="total-colaboradores"
                                placeholder="Total de colaboradores..."
                                value={formData.totalColaboradores}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                            <input
                                type="text"
                                name="cargo"
                                id="seu-cargo"
                                placeholder="Seu cargo..."
                                value={formData.cargo}
                                onChange={handleChange}
                                required
                            />
                        </section>

                        {/* section id="contato" virou classe contatoLabel */}
                        <section className={styles.contatoLabel}>
                            {/* textarea id="motivo" virou classe motivoTextarea */}
                            <textarea
                                className={styles.motivoTextarea}
                                name="motivo"
                                id="motivo"
                                placeholder=" Nos conte um pouco do que deseja"
                                value={formData.motivo}
                                onChange={handleChange}
                                required
                            />
                        </section>

                        <section className={styles.cliente}>
                            <Link className={styles.euSou2} href="../parcerias-influenciadores">
                                <img src="/images/parcerias-empresas/usuario.png" alt="Ícone de usuário" />
                                <p className={styles.euSouA}>Eu sou um influenciador</p>
                                <p className={styles.euSouB}>Dúvidas sobre o funcionamento do site, requisição de dados gerais, reportação de erros.</p>
                            </Link>
                            <Link className={styles.euSou} href="../parcerias-empresas">
                                <img src="/images/parcerias-empresas/empresa.png" alt="Ícone de empresa" />
                                <p className={styles.euSouA}>Eu sou uma empresa</p>
                                <p className={styles.euSouB}>Contato para parcerias, dúvidas sobre regulamentos, reportação de queixas.</p>
                            </Link>
                        </section>

                        <button
                            type="submit"
                            className={styles.conheca}
                            disabled={isLoading}
                        >
                            {isLoading ? 'ENVIANDO...' : 'ENVIAR SOLICITAÇÃO'}
                        </button>
                    </form>
                </article>

                {/* aside agora tem classe para controle de layout */}
                <aside className={styles.aside}>
                    <figure className={styles.asideFigure}>
                    </figure>
                </aside>
            </main>

            <Script src="/parcerias.js" strategy="afterInteractive" />
            
        </div>
        <Footer />
        </>
    );
};

export default ParceriasEmpresasPage;