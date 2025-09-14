import type { Metadata } from "next";

import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Oasis",
  description: "Plataforma Oasis",
  icons: {
    icon:  "logo-oasis-icon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app-body"  suppressHydrationWarning={true}>// Suprime avisos causados por extensões do navegador
        {children}
      </body>
    </html>
  );
}
