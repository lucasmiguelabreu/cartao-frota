"use client";

import { FC } from "react";
import Image from "next/image";
import { FiX, FiInstagram, FiFacebook, FiHeadphones } from "react-icons/fi";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/25 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-2xl flex flex-col z-50 overflow-y-auto">
        {/* Header com logo e título */}
        <div className="flex items-center justify-between px-6 py-4 border-none">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/icon.png"
                alt="Logo Megavale"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Megavale</h2>
          </div>
          <button
            aria-label="Fechar sidebar"
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 px-6 py-4 space-y-6">
          {/* Atendimento e Suporte */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-2">
              <FiHeadphones className="text-blue-600" size={20} />
              Atendimento e Suporte
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              Em caso de dúvidas, fale com nosso time de suporte.
            </p>
            <a
              href="mailto:support@megavalecard.com.br"
              className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
            >
              Enviar email
            </a>
          </div>

          {/* Importante */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Importante</h3>
            <p className="text-sm text-slate-700">
              Este sistema está em fase de testes. As informações podem sofrer alterações.
            </p>
          </div>
        </div>

        {/* Rodapé com redes sociais */}
        <footer className="px-6 py-4 border-none flex justify-around">
          <a
            href="https://instagram.com/megavalecard"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiInstagram size={24} className="text-pink-500" />
          </a>
          <a
            href="https://facebook.com/megavalecard"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiFacebook size={24} className="text-blue-600" />
          </a>
          <a
            href="mailto:support@megavalecard.com.br"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiHeadphones size={24} className="text-blue-600" />
          </a>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;