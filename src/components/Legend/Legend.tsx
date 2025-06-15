"use client";
import { FC, memo } from "react";

const Legend: FC = () => (
  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-lg border border-slate-200/50 rounded-xl p-4 shadow-lg">
    <h3 className="font-semibold text-slate-800 text-sm mb-3">Legenda</h3>
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
        <span className="text-xs text-slate-600">Postos de Combustível</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        <span className="text-xs text-slate-600">Sua Localização</span>
      </div>
    </div>
  </div>
);

export default memo(Legend);