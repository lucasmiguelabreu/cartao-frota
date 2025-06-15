"use client";
import { FC } from "react";
import { X, Mail } from "lucide-react";

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
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
        onClick={onClose}
      />

      {/* Painel */}
      <aside className="fixed top-0 right-0 h-full w-72 sm:w-80 bg-white/95 backdrop-blur-lg border-l border-slate-200/50 shadow-2xl flex flex-col z-40">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
          <h2 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 p-6 space-y-6">
          {/* Contato */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Mail className="text-emerald-600" size={20} />
              Contato FAC
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Entre em contato conosco para suporte e informações.
            </p>
            <a
              href="mailto:fac@megavalecard.com.br"
              className="flex items-center gap-3 bg-white text-slate-700 border border-emerald-200 px-4 py-3 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition duration-200 shadow-sm"
            >
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Mail size={16} className="text-emerald-600" />
              </div>
              <div>
                <div className="font-medium text-sm">Email</div>
                <div className="text-xs text-slate-500">fac@megavalecard.com.br</div>
              </div>
            </a>
          </div>

          {/* Sobre o Sistema */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Sobre o Sistema
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Localização em tempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Busca inteligente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Interface moderna</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
