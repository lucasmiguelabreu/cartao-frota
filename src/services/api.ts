export async function fetchEstabelecimentos() {
  try {
    const res = await fetch("https://suaapi.com/estabelecimentos");
    if (!res.ok) throw new Error("Erro ao buscar estabelecimentos");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
