import Link from "next/link";
import Header from "@/components/header";

export default function PaginaEmManutencao() {
  return (
    <>
      <Header />
      <main style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "2rem",
        textAlign: "center",
        gap: "1rem"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚧</h1>
        <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Página em Manutenção</h2>
        <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px" }}>
          Esta página está temporariamente indisponível. Estamos trabalhando para trazer novidades em breve!
        </p>
        <Link
          href="/"
          style={{
            marginTop: "2rem",
            padding: "1rem 2rem",
            backgroundColor: "#8B4789",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "background-color 0.3s"
          }}
        >
          Voltar para a Página Inicial
        </Link>
      </main>
    </>
  );
}
