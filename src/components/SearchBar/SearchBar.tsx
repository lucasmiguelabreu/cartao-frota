"use client";

import { FC } from "react";
import { Search, X, Navigation, MapPin } from "lucide-react";
import { MarkerType } from "@/types/marker";
import { useAutocomplete } from "./useAutocomplete";

interface SearchBarProps {
  isMobile: boolean;
  markers: MarkerType[];
  onSelectMarker: (marker: MarkerType) => void;
}

const SearchBar: FC<SearchBarProps> = ({ isMobile, markers, onSelectMarker }) => {
  const {
    search,
    setSearch,
    suggestions,
    suggestionsOpen,
    inputRef,
    suggestionBoxRef,
    handleBuscar,
    handleSelect,
    handleKeyDown,
  } = useAutocomplete<MarkerType>(markers, onSelectMarker);

  return (
    <div className="relative w-full">
      {/* Input + botões com border-radius menor */}
      <div className="flex items-center w-full bg-white shadow-lg border border-slate-200/50 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg backdrop-blur-lg transition duration-300 hover:shadow-xl focus-within:shadow-xl focus-within:border-emerald-300">
        <Search className="text-slate-400 mr-2 sm:mr-3 flex-shrink-0" size={isMobile ? 18 : 20} />
        <input
          type="text"
          placeholder={isMobile ? "Buscar posto..." : "Encontre o posto mais próximo..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none text-slate-700 flex-1 placeholder:text-slate-400 font-medium text-sm sm:text-base"
          autoComplete="off"
          ref={inputRef}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="ml-1 sm:ml-2 p-1 text-slate-400 hover:text-red-500 transition duration-200 rounded-full hover:bg-red-50"
            aria-label="Limpar pesquisa"
          >
            <X size={14} />
          </button>
        )}
        <button
          onClick={handleBuscar}
          className="ml-1 sm:ml-2 p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition duration-200 shadow-lg hover:shadow-emerald-200"
          aria-label="Buscar"
        >
          <Navigation size={isMobile ? 14 : 16} />
        </button>
      </div>

      {/* Lista de sugestões permanece igual */}
      {suggestionsOpen && suggestions.length > 0 && (
        <div
          ref={suggestionBoxRef}
          className="absolute left-0 top-[115%] w-full bg-white/95 backdrop-blur-lg border border-slate-200/50 rounded-xl shadow-2xl z-30 max-h-48 overflow-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 px-3 sm:px-4 md:px-6 py-3 sm:py-4 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 cursor-pointer transition duration-200 border-b border-slate-100/50 last:border-b-0"
              onMouseDown={() => handleSelect(item)}
            >
              <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                <MapPin className="text-emerald-600" size={isMobile ? 14 : 16} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-slate-800 block text-sm sm:text-base truncate">
                  {item.nome}
                </span>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2">
                  {item.endereco}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;