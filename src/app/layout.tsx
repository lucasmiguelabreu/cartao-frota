// src/app/layout.tsx
import "@/app/styles/globals.css";
import { ReactNode } from "react";
import MainLayout from "@/components/Layout/MainLayout";

export const metadata = {
  title: "Cartão Frota",
  description: "Encontre estabelecimentos que aceitam o Cartão Frota",
};

export default function RootLayout({ children }: { children: ReactNode; }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.png" sizes="64x64" />
      </head>
      <body className="bg-white text-slate-800 overflow-hidden">
        {/* Aqui o Navbar e Sidebar já vêm do MainLayout */}
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
