"use client";

import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface AdBannerProps {
  /** URLs das imagens para exibir no carrossel */
  images: string[];
  /** URLs de destino para cada imagem, na mesma ordem */
  links?: string[];
  /** Posição fixa na tela */
  position?: "bottom-left" | "bottom-right";
}

export const AdBanner: FC<AdBannerProps> = ({
  images,
  links = [],
  position = "bottom-right",
}) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Exibe assim que houver imagens
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
  // pega o link correspondente, ou fallback para '#'
  const dest = links[currentIndex] ?? "#";

  return (
    <div
      className={`
        fixed ${posClass} bottom-4
        w-[85vw] sm:w-[70vw] md:w-[50vw]
        lg:w-[40vw] xl:w-[30vw] 2xl:w-[25vw]
        overflow-hidden z-50
      `}
    >
      {/* Botão fechar */}
      <button
        onClick={handleClose}
        className="absolute top-1 right-1 p-1 bg-white/70 rounded-full hover:bg-white transition z-10"
        aria-label="Fechar anúncio"
      >
        <X size={20} className="text-gray-800" />
      </button>

      {/* Imagem clicável */}
      <a
        href={dest}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div
          className={`
            relative w-full
            h-[60vw] sm:h-[50vw] md:h-[35vw]
            lg:h-[30vw] xl:h-[25vw] 2xl:h-[20vw]
          `}
        >
          <Image
            src={images[currentIndex]}
            alt={`Anúncio ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
      </a>
    </div>
  );
};