import { useState, useEffect } from "react";
import { fetchEstabelecimentos } from "@/services/estabelecimentos";
import { MarkerType } from "@/types/marker";

export function useEstabelecimentos() {
  const [data, setData] = useState<MarkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEstabelecimentos()
      .then(setData)
      .catch(() => setError("Não foi possível carregar"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
