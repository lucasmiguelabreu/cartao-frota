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
      <Navbar
        isMobile={isMobile}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((o) => !o)}
      />

      <main className="w-full h-full relative">
        {children}
      </main>

      {/* Exibe o banner de ads usando as duas imagens em public/banners */}
      <AdBanner
        images={[
          "/banners/dia-dos-namorados.jpg",
          "/banners/Porque-usar-megavale.jpg",
        ]}
        //dailyLimit={3}
        position="bottom-right"
      />

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
    </EstabelecimentosProvider>
  );
}
