// src/services/estabelecimentos.ts
import { MarkerType } from "@/types/marker";

// mock de desenvolvimento
const postosTeste: MarkerType[] = [
  {
    nome: "Posto Ipiranga Rio Preto",
    endereco: "Av. Bady Bassitt, 1200 - Centro, São José do Rio Preto",
    lat: -20.813143,
    lng: -49.393437,
    tipo: "posto",
  },
  {
    nome: "Posto Shell Automotivo",
    endereco: "R. Bernardino de Campos, 450 - Centro, São José do Rio Preto",
    lat: -20.817541,
    lng: -49.379111,
    tipo: "posto",
  },
  {
    nome: "Posto BR Fuel",
    endereco: "Av. JK, 3240 - Boa Vista, São José do Rio Preto",
    lat: -20.81601,
    lng: -49.39805,
    tipo: "posto",
  },
];

/**
 * Por enquanto retorna o mock local.
 * Quando o back-end estiver disponível,
 * basta descomentar a chamada real e remover o mock.
 */
export async function fetchEstabelecimentos(): Promise<MarkerType[]> {
  // MOCK
  return Promise.resolve(postosTeste);

  // FUTURO (API real):
  // const res = await fetch("/api/estabelecimentos");
  // if (!res.ok) throw new Error("Erro ao buscar estabelecimentos");
  // return res.json();
}
