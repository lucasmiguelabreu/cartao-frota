"use client";
import { FC, memo } from "react";

const LocationIndicator: FC = () => (
  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-lg border border-slate-200/50 rounded-xl p-3 shadow-lg">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      <span className="text-sm font-medium text-slate-700">Sua localização</span>
    </div>
  </div>
);

export default memo(LocationIndicator);