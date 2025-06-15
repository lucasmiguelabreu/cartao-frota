"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MarkerType } from "@/types/marker";
import { fetchEstabelecimentos } from "@/services/estabelecimentos";

interface EstContextType {
  markers: MarkerType[];
  selectedMarker: MarkerType | null;
  setSelectedMarker: React.Dispatch<React.SetStateAction<MarkerType | null>>;
  loading: boolean;
}

const EstContext = createContext<EstContextType | undefined>(undefined);

export const EstabelecimentosProvider = ({ children }: { children: ReactNode; }) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEstabelecimentos()
      .then((data) => setMarkers(data))
      .catch(() => setMarkers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <EstContext.Provider
      value={{ markers, selectedMarker, setSelectedMarker, loading }}
    >
      {children}
    </EstContext.Provider>
  );
};

export function useEstabelecimentos() {
  const context = useContext(EstContext);
  if (!context)
    throw new Error(
      "useEstabelecimentos must be used within an EstabelecimentosProvider"
    );
  return context;
}
