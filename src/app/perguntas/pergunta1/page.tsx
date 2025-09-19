// Para gerenciar a seleção do input (useState), o componente precisa ser um Client Component.
"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Usando Link para navegação otimizada no Next.js

// Importando as folhas de estilo. Ajuste os caminhos se necessário.
import '@/styles/perguntas.css';


const Pergunta1Page: React.FC = () => {
    // Estado para controlar qual opção de resposta está selecionada
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // Função para atualizar o estado quando uma opção é selecionada
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <main>
            <section className="esquerda">
                <div className="content">
                    <Link href="/" legacyBehavior>
                        <a className="seta">
                            <img src="/images/perguntas/setinha.png" alt="Seta para a esquerda" />
                            <p>Página Inicial</p>
                        </a>
                    </Link>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h1>Pergunta 1/15</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <h2>Como está o nível de hidratação dos seus fios?</h2>
                            <h3>Selecione uma resposta</h3>
                        </div>
                    </div>

                    <img id="logo" src="/images/logo.png" alt="Logo Oasis" />
                </div>
            </section>

            <section className="direita">
                <img src="/images/perguntas/Img principal.png" alt="Imagem de uma mulher com cabelo cacheado" />

                <div className="respostas">
                    <label>
                        <input 
                            type="radio" 
                            name="opcao" 
                            value="extremamente_ressecados"
                            checked={selectedOption === 'extremamente_ressecados'}
                            onChange={handleOptionChange}
                        />
                        Extremamente ressecados, embaraçam facilmente e sem brilho.
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="opcao" 
                            value="ressecados_asperos"
                            checked={selectedOption === 'ressecados_asperos'}
                            onChange={handleOptionChange}
                        />
                        Ressecados e ásperos ao toque.
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="opcao" 
                            value="macios_brilho"
                            checked={selectedOption === 'macios_brilho'}
                            onChange={handleOptionChange}
                        />
                        Macios e com brilho natural.
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="opcao" 
                            value="ressecados_pontas"
                            checked={selectedOption === 'ressecados_pontas'}
                            onChange={handleOptionChange}
                        />
                        Um pouco ressecados nas pontas.
                    </label>
                </div>

                <div className="botoes">
                    <button id="number_one">Anterior</button>
                    <button id="number_two">Próximo</button>
                </div>
            </section>
        </main>
    );
};

export default Pergunta1Page;