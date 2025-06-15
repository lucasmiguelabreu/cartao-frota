"use client";

import { useState, useEffect, useRef } from "react";

export function useAutocomplete<T extends { nome: string; }>(
  items: T[],
  onSelect: (item: T) => void
) {
  const [search, setSearch] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionBoxRef = useRef<HTMLUListElement>(null);

  const suggestions = search
    ? items.filter((i) =>
      i.nome.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  const handleSelect = (item: T) => {
    onSelect(item);
    setSearch("");
    setSuggestionsOpen(false);
  };

  const handleBuscar = () => {
    if (suggestions.length > 0) handleSelect(suggestions[0]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSuggestionsOpen(false);
      setSearch("");
    }
    if (e.key === "Enter") {
      handleBuscar();
    }
  };

  useEffect(() => {
    setSuggestionsOpen(Boolean(search));
  }, [search]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
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