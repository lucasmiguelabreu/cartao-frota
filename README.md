# Cartão Frota - Localizador de Estabelecimentos

Este projeto é uma aplicação web desenvolvida com **Next.js**, **React**, **Tailwind CSS** e integração com a **API do Google Maps**, com o objetivo de exibir no mapa os estabelecimentos que aceitam o **Cartão Frota**.

---

## 🔧 Tecnologias Utilizadas
- [Next.js 13+](https://nextjs.org/)
- [React 18+](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api)
- TypeScript

---

## 🗺️ Funcionalidades

### 1. **Geolocalização do Usuário**
- Ao acessar o site, o navegador solicita a permissão de localização.
- Se aceita, a posição atual do usuário é capturada com `navigator.geolocation.getCurrentPosition()`.
- Essa posição é usada como o centro do mapa.

### 2. **Exibição do Mapa com Google Maps**
- Utiliza a biblioteca `@react-google-maps/api`.
- Mostra o mapa centralizado na localização do usuário.
- Os estabelecimentos são representados por marcadores (pins).

### 3. **Busca por Estabelecimento**
- Um campo de pesquisa permite ao usuário filtrar estabelecimentos pelo nome.
- O filtro é feito em tempo real (com `useState` e `filter`).

### 4. **Responsividade e Interface**
- Layout limpo e responsivo com **Tailwind CSS**.
- Modo escuro por padrão (`bg-black text-white`).
- Logo exibida apenas em telas maiores.

### 5. **Favicon Personalizado**
- Ícone da aba personalizado com `icon.png`, definido em `layout.tsx`.

---

## 📁 Estrutura de Arquivos

```
/src
│
├── app
│   ├── page.tsx         ← Página principal com busca, mapa e geolocalização
│   └── layout.tsx       ← Layout base com favicon e estilos globais
│
├── components
│   └── Map.tsx          ← Componente de mapa Google Maps com marcadores
│
├── services
│   └── api.ts           ← Função para consumir a API de estabelecimentos
│
├── styles
│   └── globals.css      ← Estilos globais baseados em Tailwind
```

---

## 🔑 Como rodar o projeto

### 1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/cartao-frota.git
cd cartao-frota
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configure o ambiente:
Crie um arquivo `.env.local` com sua chave da API Google Maps:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_google
```

### 4. Execute o projeto:
```bash
npm run dev
```

Acesse `http://localhost:3000`

---

## 🔒 Requisitos da API
A API de estabelecimentos deve:
- Estar pública (ou habilitada para CORS)
- Retornar um array de objetos contendo ao menos:
```json
{
  "nome": "Posto BR",
  "lat": -23.5,
  "lng": -46.6
}
```

---

## 💡 Dicas para Devs Juniors

- Os hooks `useState`, `useEffect` e `useMediaQuery` são usados para lidar com estado, efeitos colaterais e responsividade.
- O `useEffect` com `navigator.geolocation` roda apenas uma vez para pegar a localização inicial.
- O filtro da busca usa `Array.prototype.filter()` comparando o nome do estabelecimento com o texto digitado.
- O componente `Map.tsx` recebe `markers` e `userLocation` como props.
- O mapa é carregado com `<LoadScript>` e os pins com `<Marker>`