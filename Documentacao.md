
# Documentação dos Componentes

Este projeto é organizado em componentes React modulares e um provedor de contexto para gerenciar dados de estabelecimentos. Abaixo, você encontrará uma documentação detalhada de cada componente, incluindo responsabilidades, props e exemplos de uso.

---

## 1. Contexto Global: `EstabelecimentosContext`

- 📁 **Localização**: `src/context/EstabelecimentosContext.tsx`
- 🛠️ **Descrição**: Utiliza React Context para compartilhar dados de postos de combustível (markers) e estado de seleção (`selectedMarker`) em toda a aplicação.
- 🎯 **Responsabilidades**:
  - Buscar dados de estabelecimentos (mock ou API real).
  - Gerenciar estados: `markers`, `selectedMarker`, `loading`.
  - Disponibilizar setters e valores via hook `useEstabelecimentos`.

### API

| Hook                   | Retorno                                        | Descrição                                     |
|------------------------|------------------------------------------------|-----------------------------------------------|
| `useEstabelecimentos`  | `{ markers, selectedMarker, setSelectedMarker, loading }` | Acessa o contexto de estabelecimentos.        |

### Exemplo de uso

\`\`\`tsx
import { useEstabelecimentos } from "@/context/EstabelecimentosContext";

function MeuComponente() {
  const { markers, selectedMarker, setSelectedMarker, loading } = useEstabelecimentos();
  // ...
}
\`\`\`

---

## 2. Layout Principal: `MainLayout`

- 📁 **Localização**: `src/components/Layout/MainLayout.tsx`
- 🛠️ **Descrição**: Componente Client-Side que envolve toda a aplicação com Navbar, Sidebar e provedor de contexto (`EstabelecimentosProvider`).
- 🎯 **Responsabilidades**:
  - Configurar provider de estabelecimentos.
  - Gerenciar estado de abertura do menu lateral (`menuOpen`).
  - Capturar viewport para responsividade (`isMobile`).

### Props

| Nome        | Tipo             | Obrigatório | Descrição                                |
|-------------|------------------|-------------|------------------------------------------|
| `children`  | `ReactNode`      | Sim         | Conteúdo da rota a ser renderizado.      |

### Estrutura

\`\`\`tsx
<EstabelecimentosProvider>
  <Navbar ... />
  {children}
  <Sidebar ... />
</EstabelecimentosProvider>
\`\`\`

---

## 3. Navbar: `Navbar`

- 📁 **Localização**: `src/components/Navbar/Navbar.tsx`
- 🛠️ **Descrição**: Barra de navegação superior fixa, responsiva, com logo, campo de busca central e botão de menu lateral.
- 🎯 **Responsabilidades**:
  - Exibir logo (imagem responsiva).  
  - Renderizar `SearchBar` no centro, repassando `markers` e `onSelectMarker`.  
  - Exibir botão de toggle do `Sidebar`.

### Props

| Nome           | Tipo                     | Obrigatório | Descrição                                          |
|----------------|--------------------------|-------------|----------------------------------------------------|
| `isMobile`     | `boolean`                | Sim         | Indica se viewport é mobile (usa em tamanhos/ícones). |
| `menuOpen`     | `boolean`                | Sim         | Estado de abertura do menu lateral.                |
| `onMenuToggle` | `() => void`             | Sim         | Função para alternar estado do menu lateral.       |

### Exemplo de uso

\`\`\`tsx
<Navbar
  isMobile={isMobile}
  menuOpen={menuOpen}
  onMenuToggle={() => setMenuOpen(o => !o)}
/>
\`\`\`

### Ponto de atenção
- **Removido** border extra ao redor da logo.  
- Logo utiliza `<Image fill>` e classes Tailwind para responsividade.  
- Layout com `flex justify-between` e classes `max-w` para centralizar `SearchBar`.

---

## 4. SearchBar: `SearchBar`

- 📁 **Localização**: `src/components/SearchBar/SearchBar.tsx`
- 🛠️ **Descrição**: Campo de busca com autocomplete, filtrando lista de `markers` e exibindo sugestões.
- 🎯 **Responsabilidades**:
  - Gerenciar estado de pesquisa (`search`), abrir/fechar sugestões, limpar input.  
  - Filtrar `markers` via `useAutocomplete`.  
  - Chamar `onSelectMarker` ao clicar ou pressionar Enter.

### Props

| Nome             | Tipo                                  | Obrigatório | Descrição                                              |
|------------------|---------------------------------------|-------------|--------------------------------------------------------|
| `isMobile`       | `boolean`                             | Sim         | Ajusta placeholder e tamanhos de ícones.               |
| `markers`        | `MarkerType[]`                        | Sim         | Lista de marcadores para filtrar sugestões.           |
| `onSelectMarker` | `(marker: MarkerType) => void`        | Sim         | Callback ao selecionar uma sugestão.                   |

### Hooks Internos

- `useAutocomplete<T>`: encapsula lógica de filtro, open/close, keyboard handling.

### Exemplo de uso

\`\`\`tsx
<SearchBar
  isMobile={false}
  markers={markers}
  onSelectMarker={setSelectedMarker}
/>
\`\`\`

### Estilização
- Bordas com `rounded-lg` (menos arredondado).  
- Classes Tailwind: `shadow-lg`, `border-slate-200/50`, `backdrop-blur-lg`, `transition`.

---

## 5. Sidebar: `Sidebar`

- 📁 **Localização**: `src/components/Sidebar/Sidebar.tsx`
- 🛠️ **Descrição**: Menu lateral overlaid com opções de contato e informações adicionais.
- 🎯 **Responsabilidades**:
  - Exibir overlay escurecido (`bg-black/20`).  
  - Renderizar painel com seções de contato e sobre o sistema.  
  - Fechar ao clicar no overlay ou botão.

### Props

| Nome      | Tipo           | Obrigatório | Descrição                          |
|-----------|----------------|-------------|------------------------------------|
| `open`    | `boolean`      | Sim         | Controla visibilidade do painel.   |
| `onClose` | `() => void`   | Sim         | Callback para fechar o painel.     |

### Seções internas

1. **Contato FAC**: ícone `Mail`, título, descrição e link `mailto:`.  
2. **Sobre o Sistema**: bullet points com legendas de funcionalidades.

---

## 6. Legend: `Legend`

- 📁 **Localização**: `src/components/Legend/Legend.tsx`
- 🛠️ **Descrição**: Legenda fixa indicando cores de marcadores no mapa (postos e usuário).
- 🎯 **Responsabilidades**: Exibição estática de ícones coloridos e texto.

### Props
- Nenhum. Componente puro.

### Exemplo de uso
\`\`\`tsx
<Legend />
\`\`\`

---

## 7. LocationIndicator: `LocationIndicator`

- 📁 **Localização**: `src/components/LocationIndicator/LocationIndicator.tsx`
- 🛠️ **Descrição**: Badge fixa informando ao usuário onde sua localização é exibida, com animação de pulso.
- 🎯 **Responsabilidades**: Renderização pura de UI.

### Props
- Nenhum.

### Exemplo de uso
\`\`\`tsx
<LocationIndicator />
\`\`\`

---

## 8. MapContainer: `MapContainer`

- 📁 **Localização**: `src/components/MapContainer/MapContainer.tsx`
- 🛠️ **Descrição**: Container principal do mapa; carrega script Google Maps, exibe marcadores, InfoWindow, cluster opcional e marcadores customizados.
- 🎯 **Responsabilidades**:
  - Carregar script com `useLoadScript`.  
  - Obter geolocalização do usuário.  
  - Gerenciar InfoWindow via estado `openInfoWindowIdx`.  
  - Renderizar `<GoogleMap>` com opções, marcadores e janelas de informação.

### Contexto
- Usa `useEstabelecimentos` para dados de `markers`, `selectedMarker` e `loading`.

### Exemplo de uso
\`\`\`tsx
<MapContainer />
\`\`\`

---

> **Atualização:** Sempre mantenha este README sincronizado com mudanças nos componentes.
