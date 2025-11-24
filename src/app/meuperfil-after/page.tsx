"use client";

import { useState, useEffect } from "react";
import { Header, Footer } from "@/components"; // Certifique-se que este caminho está correto no seu projeto
import Link from "next/link";
import styles from "@/styles/meuperfil-after.module.css";
import { useRouter } from "next/navigation";

export default function MeuPerfilAfter() {
  const router = useRouter();
  const [nome, setNome] = useState("[nome]");
  const [respostas, setRespostas] = useState({
    tipo_cabelo: "X",
    porosidade: "X",
    tom_pele: "X",
    tipo_pele_facial: "X",
    problema_pele: "X",
    estado_cabelo: "X",
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await fetch("/api/usuarios/perfil/questionario", {
        method: "GET",
        credentials: "include",
      });

      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        if (response.status === 401) return;
        if (contentType.includes("application/json")) {
          const err = await response.json().catch(() => null);
          console.warn("Erro ao carregar perfil:", response.status, err);
        } else {
          console.warn("Resposta não-JSON ao carregar perfil:", response.status);
        }
        return;
      }

      let data: any = null;
      if (contentType.includes("application/json")) {
        data = await response.json().catch((e) => {
          console.warn("Falha ao parsear JSON:", e);
          return null;
        });
      } else {
        console.warn("Retorno não-JSON — ignorando.");
        return;
      }

      if (!data) return;

      if (data.success && data.data) {
        if (data.data.nome) setNome(data.data.nome);
        if (data.data.questionario) {
          setRespostas({
            tipo_cabelo: data.data.questionario.tipo_cabelo || "X",
            porosidade: data.data.questionario.porosidade || "X",
            tom_pele: data.data.questionario.tom_pele || "X",
            tipo_pele_facial: data.data.questionario.tipo_pele_facial || "X",
            problema_pele: data.data.questionario.problema_pele || "X",
            estado_cabelo: data.data.questionario.estado_cabelo || "X",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleEditarQuestionario = () => {
    router.push("/meu-perfil/questionario/meu-perfil");
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.mainDiv}>
          <h1>Seu perfil está pronto, {nome}!</h1>
          <p>aqui está o que preparamos para você.</p>
          <Link href='/' className={styles.mainButton}>EXPLORE</Link>
        </div>
      </main>

      <section className={styles.s1}>
        {/* Adicionado inline style para responsividade do header da seção via CSS (controlado pelo pai) ou classe auxiliar se preferir, mantive inline conforme original mas o media query do CSS vai sobrescrever o display flex se necessário */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap" /* Permite quebrar linha se tela for muito pequena */
        }}>
          <h1>suas informações</h1>
          <button onClick={handleEditarQuestionario} className={styles.botaoEditar}> ✏️ Editar Respostas </button>
        </div>
        
        <div className={styles.informacoes}>
          <div className={styles.bloco}>
            <h1>Seu tipo de cabelo é:</h1>
            <div className={styles.blocoRoxo}>
              <h3>tipo</h3>
              <h1>{respostas.tipo_cabelo}</h1>
            </div>
          </div>

          <div className={styles.bloco}>
            <h1>Nível de porosidade capilar</h1>
            <div className={styles.blocoRoxo}>
              <h3>nível</h3>
              <h1>{respostas.porosidade}</h1>
            </div>
          </div>

          <div className={styles.bloco}>
            <h1>Seu tom de pele é:</h1>
            <div className={styles.blocoRoxo}>
              <h3>pele</h3>
              <h1>{respostas.tom_pele}</h1>
            </div>
          </div>

          <div className={styles.bloco}>
            <h1>Seu tipo de pele é:</h1>
            <div className={styles.blocoRoxo}>
              <h3>tipo</h3>
              <h1>{respostas.tipo_pele_facial}</h1>
            </div>
          </div>

          <div className={styles.bloco}>
            <h1>Seu problema de pele é:</h1>
            <div className={styles.blocoRoxo}>
              <h3>pele</h3>
              <h1>{respostas.problema_pele}</h1>
            </div>
          </div>

          <div className={styles.bloco}>
            <h1>Estilo de cabelo atual:</h1>
            <div className={styles.blocoRoxo}>
              <h3>ele está</h3>
              <h1>{respostas.estado_cabelo}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.s2}>
        <h1>Pele, Cabelo e Corpo: sua rotina de autocuidado.</h1>
        <h4>
          Criamos um guia de cuidados sob medida para valorizar o que você tem
          de mais autêntico!
        </h4>
        
        <div className={styles.artigo1}>
          {/* Note: Adicionei classes e widths no CSS para controlar estas imagens */}
          <img src="/images/meuperfil-after/cronograma.png" alt="Cronograma Capilar" />
          <div className={styles.artigoDiv}>
            <h1>Vamos montar sua rotina ideal?</h1>
            <div className={styles.blocoTexto}>
            <p>agora que já temos todas as informações sobre seu cabelo, chegou a hora de dar o próximo passo: montar um cronograma capilar personalizado só pra você!</p>
            </div>
            <h4>Clique abaixo e descubra a rotina ideal para cuidar dos seus fios com carinho e poder.</h4>
            <Link href='/cronograma-capilar' className={styles.artigoButton}>CONHEÇA</Link>
          </div>
        </div>

        <div className={styles.artigo2}>
          <div className={styles.artigoDiv}>
            <h1>Seu Próximo Corte: O Início da Sua Beleza</h1>
            <div className={styles.blocoTexto}>
            <p>Mude o visual e renove a autoestima. Na página de Cortes, descubra as tendências do momento, entenda qual formato valoriza mais o seu rosto e inspire-se para a sua próxima transformação.</p>
            </div>
            <h4>Fortaleça e valorize sua coroa natural.</h4>
            <Link href='/corte' className={styles.artigoButton}>CONHEÇA</Link>
          </div>
          <img src="/images/meuperfil-after/corte.png" alt="Cortes de Cabelo" />
        </div>
      </section>

      <section>
        <div className={styles.monte}>
          <img src="/images/meuperfil-after/monte.png" alt="Monte sua rotina" />
          <Link href='/artigo' className={styles.conheca}>
            <img
              src="/images/Cronograma-capilar/conheça.png"
              alt="Conheça"
            />
          </Link>
        </div>
      </section>

      <section className={styles.s3}>
        <img src="/images/meuperfil-after/s3-artigo.png" alt="Skincare" />
        <div>
          <h1>Skincare para todos os tons</h1>
          <p>
            Nossa página de skincare foi criada pensando nas necessidades reais
            da pele negra. Aqui você encontra dicas, rotinas e produtos
            recomendados para o seu tipo de pele e tom, valorizando sua beleza
            natural e garantindo cuidados eficazes, saudáveis e inclusivos.
          </p>
          <Link href='/skincare' className={styles.s3Button}>DESCUBRA</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}