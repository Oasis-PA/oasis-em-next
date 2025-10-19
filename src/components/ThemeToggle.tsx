// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={isDark ? 'Mudar para claro' : 'Mudar para escuro'}
      aria-label="Alternar tema"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}