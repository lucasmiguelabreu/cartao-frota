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

  useEffect(() => {
    if (images.length) setVisible(true);
  }, [images]);

  if (!visible) return null;

  const handleClose = () => setVisible(false);
  const posClass = position === "bottom-left" ? "left-4" : "right-4";

  return (
    <div
      className={`
        fixed ${posClass} bottom-4
        w-64               /* mobile: 16rem */
        sm:w-72            /* ≥640px: 18rem */
        md:w-80            /* ≥768px: 20rem */
        lg:w-96            /* ≥1024px:24rem */
        xl:w-[30rem]       /* ≥1280px:30rem */
        overflow-hidden
        z-50
      `}
    >
      {/* Fechar */}
      <button
        onClick={handleClose}
        className="absolute top-1 right-1 p-1 bg-white/70 rounded-full hover:bg-white transition z-10"
        aria-label="Fechar anúncio"
      >
        <X size={20} className="text-gray-800" />
      </button>

      {/* Conteúdo do banner */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
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