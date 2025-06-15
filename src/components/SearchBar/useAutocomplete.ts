"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";

export function useAutocomplete<T extends { nome: string; }>(
  items: T[],
  onSelect: (item: T) => void
) {
  const [search, setSearch] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  const suggestions = search
    ? items.filter((item) =>
      item.nome.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const handleBuscar = () => {
    if (suggestions.length > 0) {
      onSelect(suggestions[0]);
      setSearch("");
      setSuggestionsOpen(false);
    }
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    setSearch("");
    setSuggestionsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSuggestionsOpen(false);
      setSearch("");
    }
    if (e.key === "Enter") {
      handleBuscar();
    }
  };

  // Abre/fecha ao digitar/limpar
  useEffect(() => {
    setSuggestionsOpen(!!search);
  }, [search]);

  // Fecha ao clicar fora
  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSuggestionsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return {
    search,
    setSearch,
    suggestions,
    suggestionsOpen,
    inputRef,
    suggestionBoxRef,
    handleBuscar,
    handleSelect,
    handleKeyDown,
  };
}
