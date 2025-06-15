// src/components/Layout/MainLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { EstabelecimentosProvider } from "@/context/EstabelecimentosContext";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { AdBanner } from "@/components/AdBanner/AdBanner";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useMediaQuery("(max-width:1024px)");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <EstabelecimentosProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* 1. Navbar: apenas aqui */}
        <Navbar
          isMobile={isMobile}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((o) => !o)}
        />

        {/* 2. Conteúdo abaixo do navbar */}
        <div className="flex-1 relative overflow-hidden">
          {children}

          {/* AdBanner sobre o mapa */}
          <AdBanner
            images={[
              "/banners/dia-dos-namorados.jpg",
              "/banners/Porque-usar-megavale.jpg"
            ]}
            position="bottom-right"
          />

          {/* Sidebar controlada aqui */}
          <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </div>
    </EstabelecimentosProvider>
  );
}
