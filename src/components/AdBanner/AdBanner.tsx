// src/components/AdBanner/AdBanner.tsx
"use client";

import { useState, useEffect, FC } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface AdBannerProps {
  images: string[];
  position?: "bottom-left" | "bottom-right";
}

export const AdBanner: FC<AdBannerProps> = ({
  images,
  position = "bottom-right",
}) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mostrar ao montar
  useEffect(() => {
    if (images.length) {
      setVisible(true);
    }
  }, [images]);

  // Avançar slide automaticamente a cada 5 segundos
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % images.length);
      }, 4000); // Tempo do slide 4s
      return () => clearInterval(interval);
    }
  }, [images]);

  if (!visible) return null;

  const handleClose = () => setVisible(false);
  const posClass = position === "bottom-left" ? "left-4" : "right-4";

  return (
    <div
      className={`
        fixed ${posClass} bottom-4
        w-11/12 sm:w-64 md:w-80
        overflow-hidden
        z-50
      `}
    >
      {/* Fechar */}
      <button
        onClick={handleClose}
        className="absolute top-1 right-1 p-1 bg-white/60 rounded-full hover:bg-white transition z-10"
        aria-label="Fechar anúncio"
      >
        <X size={20} className="text-gray-800" />
      </button>

      {/* Imagem */}
      <div className="relative w-full h-56">
        <Image
          src={images[currentIndex]}
          alt={`Anúncio ${currentIndex + 1}`}
          fill
          className="object-contain bg-transparent"
        />
      </div>

      {/* Indicadores de slide */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-1 py-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`
                h-2 w-2 rounded-full
                ${idx === currentIndex ? "bg-gray-800" : "bg-gray-400"}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
};
