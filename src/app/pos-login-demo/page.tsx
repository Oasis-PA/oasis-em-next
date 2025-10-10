"use client";

import PosLogin from "@/components/pos_login";
import { useRouter } from "next/navigation";

export default function PosLoginDemo() {
  const router = useRouter();

  const handleDarkModeToggle = (isDarkMode: boolean) => {
    console.log("Dark mode is now:", isDarkMode ? "ON" : "OFF");
    // Aqui você pode adicionar lógica para aplicar o tema escuro
  };

  const handleLogout = () => {
    console.log("Usuário está saindo...");
    // Limpar sessionStorage/localStorage
    sessionStorage.clear();
    // Redirecionar para login
    router.push("/login");
  };

  return (
    <div style={{ backgroundColor: "aqua", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <PosLogin
        userName="Sofia Ferreira"
        userEmail="ferreira.so97@gmail.com"
        userPhoto="/images/pos-login/usuario.png"
        logoSrc="/images/pos-login/logo.svg"
        onDarkModeToggle={handleDarkModeToggle}
        onLogout={handleLogout}
      />
    </div>
  );
}
