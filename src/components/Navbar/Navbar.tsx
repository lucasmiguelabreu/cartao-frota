"use client";

import { FC } from "react";
import Image from "next/image";
import { Menu as MenuIcon, X } from "lucide-react";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useEstabelecimentos } from "@/context/EstabelecimentosContext";

interface NavbarProps {
  isMobile: boolean;
  menuOpen: boolean;
  onMenuToggle: () => void;
}

const Navbar: FC<NavbarProps> = ({ isMobile, menuOpen, onMenuToggle }) => {
  const { markers, setSelectedMarker } = useEstabelecimentos();

  return (
    <nav className="w-full bg-white/95 backdrop-blur-lg shadow-md border-b border-slate-200/50 px-6 py-3 flex items-center justify-between">
      {/* Logo à esquerda (tamanho aumentado) */}
      <div className="flex-shrink-0">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16">
          <Image
            src="/icon.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* SearchBar centralizada */}
      <div className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <SearchBar
            isMobile={isMobile}
            markers={markers}
            onSelectMarker={setSelectedMarker}
          />
        </div>
      </div>

      {/* Botão de menu à direita */}
      <button
        onClick={onMenuToggle}
        className="flex-shrink-0 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <X size={isMobile ? 20 : 24} className="text-slate-600" />
        ) : (
          <MenuIcon size={isMobile ? 20 : 24} className="text-slate-600" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
