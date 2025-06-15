"use client";

import { FC } from "react";
import { Search } from "lucide-react";
import { MarkerType } from "@/types/marker";
import { useAutocomplete } from "./useAutocomplete";

interface SearchBarProps {
  isMobile: boolean;
  markers: MarkerType[];
  onSelectMarker: (marker: MarkerType) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  isMobile,
  markers,
  onSelectMarker,
}) => {
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
      <input
        type="text"
        placeholder="Buscar estabelecimento"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className={`
          w-full bg-gray-100 placeholder-gray-400 text-gray-800
          rounded-full pl-4 pr-10 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-400
        `}
      />
      <Search
        size={16}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        onClick={handleBuscar}
      />

      {suggestionsOpen && suggestions.length > 0 && (
        <ul
          ref={suggestionBoxRef}
          className="
            absolute z-20 mt-1 w-full
            bg-white rounded-lg shadow-lg
            max-h-60 overflow-auto
          "
        >
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onMouseDown={() => handleSelect(item)}
              className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              {item.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;