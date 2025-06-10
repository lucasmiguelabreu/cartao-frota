"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Map from "@/components/Map";
import { fetchEstabelecimentos } from "@/services/api";
import { useMediaQuery } from 'usehooks-ts';

export default function Home() {
  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null);
  const [search, setSearch] = useState("");

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Erro ao obter localização:", error),
      { enableHighAccuracy: true }
    );

    const loadData = async () => {
      const data = await fetchEstabelecimentos();
      setEstabelecimentos(data);
    };
    loadData();
  }, []);

  const estabelecimentosFiltrados = estabelecimentos.filter((e) =>
    e.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Cartão Frota
        </h1>
        {!isMobile && (
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="rounded"
          />
        )}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar estabelecimento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">
          Buscar
        </button>
      </div>

      <Map markers={estabelecimentosFiltrados} userLocation={userLocation} />
    </main>
  );
}