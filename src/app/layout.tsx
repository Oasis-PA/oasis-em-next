import type { Metadata } from "next";

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";


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
      <body className="app-body"  suppressHydrationWarning={true}>
       

      <SessionProvider/>

        {children}
      </body>
    </html>
  );
}
