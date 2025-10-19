"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

export default function ArtigosLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}