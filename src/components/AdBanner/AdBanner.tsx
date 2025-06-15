"use client";

import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface AdBannerProps {
  /** URLs das imagens para exibir no carrossel */
  images: string[];
  /** Posição fixa na tela */
  position?: "bottom-left" | "bottom-right";
}

export const AdBanner: FC<AdBannerProps> = ({
  images,
  position = "bottom-right",
}) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Exibe sempre que houver imagens
  useEffect(() => {
    if (images.length) setVisible(true);
  }, [images]);

  // Troca a imagem a cada 5 segundos
  useEffect(() => {
    if (!visible || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible, images.length]);

  if (!visible) return null;

  const handleClose = () => setVisible(false);
  const posClass = position === "bottom-left" ? "left-4" : "right-4";

  return (
    <div
      className={`
        fixed ${posClass} bottom-4
        w-[85vw]            /* Mobile: 85% viewport width */
        sm:w-[70vw]         /* ≥640px: 70% viewport width */
        md:w-[50vw]         /* ≥768px: 50% viewport width */
        lg:w-[40vw]         /* ≥1024px: 40% viewport width */
        xl:w-[30vw]         /* ≥1280px: 30% viewport width */
        2xl:w-[25vw]        /* ≥1536px: 25% viewport width */
        overflow-hidden
        z-50
      `}
    >
      {/* Botão fechar junto à borda */}
      <button
        onClick={handleClose}
        className="absolute top-1 right-1 p-1 bg-white/70 rounded-full hover:bg-white transition z-10"
        aria-label="Fechar anúncio"
      >
        <X size={20} className="text-gray-800" />
      </button>

      {/* Imagem responsiva, altura proporcional */}
      <div
        className={`
          relative w-full
          h-[60vw]           /* Mobile: 60% viewport height */
          sm:h-[50vw]        /* ≥640px: 50% vh */
          md:h-[35vw]        /* ≥768px: 35% vh */
          lg:h-[30vw]        /* ≥1024px:30% vh */
          xl:h-[25vw]        /* ≥1280px:25% vh */
          2xl:h-[20vw]       /* ≥1536px:20% vh */
        `}
      >
        <Image
          src={images[currentIndex]}
          alt={`Anúncio ${currentIndex + 1}`}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};
