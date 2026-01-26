# 🎮 Pokédex — Explore o Mundo Pokémon

A Pokédex é uma aplicação web interativa que permite explorar, buscar e descobrir informações detalhadas sobre todos os Pokémon. Com uma interface moderna e animada, você pode filtrar por tipos, buscar seus favoritos e visualizar estatísticas completas, habilidades e movimentos de cada criatura.

📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Ferramentas e Integrações](#ferramentas-e-integracoes)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Testes](#testes)
- [Licença](#licenca)
- [Contribuições](#contribuicoes)
- [Contato](#contato)
- [Autor](#autor)

## ☁️ Sobre o Projeto <a id="sobre-o-projeto"></a>

**O Desafio** 😬

_Encontrar informações sobre Pokémon pode ser:_

- ⏱️ Fragmentado e confuso, dados espalhados em múltiplas fontes
- 🧠 Difícil de navegar, interfaces desatualizadas e pouco intuitivas
- 🎨 Visualmente desinteressante, falta de animações e design moderno
- 📱 Não responsivo, experiência ruim em dispositivos móveis

**A Solução** 💡

_Com a Pokédex, você:_

- 🔍 Busca instantaneamente qualquer Pokémon pelo nome
- 🎯 Filtra por tipo (Fire, Water, Grass, etc.) com um clique
- 💎 Visualiza informações completas: stats, habilidades, movimentos
- 🌙 Alterna entre temas dark/light para melhor experiência
- 📱 Acessa de qualquer dispositivo com design 100% responsivo

## 🚀 Funcionalidades & Interatividades

#### 🎯 1. Sistema de Busca Inteligente

- Campo de busca com filtro em tempo real
- Busca case-insensitive e ignora acentos
- Funciona em conjunto com filtro de tipo
- Feedback visual quando nenhum resultado é encontrado

_Exemplo:_ Digite "char" e veja Charmander, Charmeleon e Charizard instantaneamente

#### 🎨 2. Filtro por Tipo

- 18 tipos de Pokémon disponíveis
- Cada tipo com cores únicas e gradientes
- Opção "All Types" para ver todos
- Atualização instantânea da lista

**Tipos disponíveis:**
Normal, Fire, Water, Electric, Grass, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy

#### 📊 3. Detalhes Completos do Pokémon

**Informações Exibidas:**

- **Básicas**: Nome, número da Pokédex, tipos, altura e peso
- **Estatísticas**: HP, Attack, Defense, Sp. Attack, Sp. Defense, Speed
- **Habilidades**: Nome e descrição de cada habilidade
- **Movimentos**: Lista de até 50 movimentos principais

**Interface de Detalhes:**

- Imagem oficial em alta qualidade
- Barras de progresso animadas para stats
- Cards glassmorphism com efeitos neon
- Design responsivo e acessível

#### ⚡ 4. Carregamento Progressivo

- Carrega 10 Pokémon por vez (otimização de performance)
- Botão "Load More" para carregar mais
- Indicador visual de loading
- Desabilita controles durante carregamento

#### 🌙 5. Temas Dark/Light

- Alternância suave entre temas
- Ícones animados (Sol/Lua)
- Cores otimizadas para cada tema
- Preferência mantida durante a sessão

#### 🎭 6. Animações e Efeitos

**Efeitos Visuais:**

- Splash screen animada no primeiro acesso
- Cards com hover effects e scale
- Gradientes neon e glassmorphism
- Floating animation nas imagens
- Transições suaves entre páginas

**Performance:**

- Lazy loading de imagens
- Stagger animations nos cards
- GPU acceleration para animações

#### 📱 7. Experiência Responsiva

- Layout adaptativo para mobile, tablet e desktop
- Touch-friendly em dispositivos móveis
- Grid responsivo (2 a 5 colunas)
- Sticky header com backdrop blur

## 🧠 Arquitetura da Aplicação

```
Usuário → Acessa aplicação
    ↓
Splash Screen → Exibida apenas no primeiro acesso
    ↓
Index Page → Lista de Pokémon carregada
    ↓
Hooks:
  - usePokemonList() → Busca lista da PokéAPI
  - usePokemonDetails() → Busca detalhes individuais
    ↓
Estados:
  - selectedType: string → Tipo selecionado
  - searchQuery: string → Texto de busca
  - pokemon: Pokemon[] → Lista filtrada
  - loading: boolean → Estado de carregamento
    ↓
Renderização:
  - TypeFilter → Dropdown de tipos
  - SearchInput → Campo de busca
  - PokemonCard → Grid de cards
  - LoadingSpinner → Indicador de loading
    ↓
Usuário clica em card → Navega para PokemonDetail
    ↓
PokemonDetail Page:
  - Busca dados completos do Pokémon
  - Renderiza stats, abilities, moves
  - Botão voltar para lista
```

## 🛠️ Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?logo=testinglibrary&logoColor=white)

### 🧩 _Frontend_

| Tecnologia       | Função                                           |
| ---------------- | ------------------------------------------------ |
| **React**        | Biblioteca para construção de UI com componentes |
| **TypeScript**   | Superset JavaScript com tipagem estática         |
| **Vite**         | Build tool ultra-rápido com HMR instantâneo      |
| **TailwindCSS**  | Framework CSS utility-first para estilização     |
| **React Router** | Roteamento client-side entre páginas             |

### 🔌 _API & HTTP_

| Tecnologia  | Função                                |
| ----------- | ------------------------------------- |
| **Axios**   | Cliente HTTP para requisições à API   |
| **PokéAPI** | API REST pública com dados de Pokémon |

### 🧪 _Testes_

| Tecnologia                      | Função                                       |
| ------------------------------- | -------------------------------------------- |
| **Vitest**                      | Framework de testes rápido (powered by Vite) |
| **@testing-library/react**      | Utilitários para testes de componentes       |
| **@testing-library/user-event** | Simulação de interações do usuário           |
| **jsdom**                       | DOM virtual para testes                      |

### 🎨 _UI & Ícones_

| Tecnologia       | Função                       |
| ---------------- | ---------------------------- |
| **Lucide React** | Biblioteca de ícones moderna |

## 🔧 Ferramentas e Integrações

#### _Desenvolvimento_

![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)

#### _APIs e Serviços_

![PokéAPI](https://img.shields.io/badge/PokéAPI-EF5350?logo=pokemon&logoColor=white)

**PokéAPI** — API REST pública e gratuita com informações de todos os Pokémon

- **Endpoints utilizados:**
  - `/pokemon` — Lista de Pokémon
  - `/pokemon/{id}` — Detalhes do Pokémon
  - `/type/{type}` — Pokémon por tipo
  - `/ability/{id}` — Descrição de habilidades

## 💻 Como Rodar o Projeto Localmente

_**Pré-requisitos**_

> - **Node.js** >= _18.0.0_
> - **npm** >= _9.0.0_

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/cledeocirmarafao/pokedex.git

# 2. Acesse a pasta do projeto
cd pokedex

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

## 🧪 Testes

A aplicação possui uma suíte completa de **testes unitários** focados em comportamento, não em implementação.

### Estrutura de Testes

```
src/__tests__/
├── components/
│   ├── SearchInput.test.tsx      ✅ 2 testes
│   ├── TypeFilter.test.tsx       ✅ 3 testes
│   ├── ThemeToggle.test.tsx      ✅ 1 teste
│   └── PokemonCard.test.tsx      ✅ 3 testes
├── hooks/
│   └── usePokemon.test.tsx       ✅ 8 testes
├── pages/
│   └── Index.test.tsx            ✅ 8 testes
└── contexts/
    └── ThemeContext.test.tsx     ✅ 3 testes
```

### Cobertura de Testes

| Componente/Hook       | Testes | Cobertura                                 |
| --------------------- | -----: | ----------------------------------------- |
| **SearchInput**       |      2 | onChange, valor controlado                |
| **TypeFilter**        |      3 | Seleção, tipos disponíveis                |
| **ThemeToggle**       |      1 | Alternância dark/light                    |
| **PokemonCard**       |      3 | Renderização, navegação, formatação       |
| **usePokemonList**    |      4 | Busca, filtro, loadMore, erros            |
| **usePokemonDetails** |      4 | Busca detalhes, habilidades, erros        |
| **Index Page**        |      8 | Loading, filtros, busca, interações       |
| **ThemeContext**      |      3 | Estado inicial, toggle, erro sem Provider |

**Total:** _28 testes unitários_ | **Framework:** Vitest + React Testing Library

### Executar Testes

```bash
# Todos os testes
npm test

# Com interface visual
npm run test:ui

# Com cobertura
npm run test:coverage

# Teste específico
npm test SearchInput
npm test usePokemon
npm test Index
```

### Princípios de Teste

✅ **Foco no comportamento** — Testa o que o usuário vê e faz  
✅ **Sem detalhes de implementação** — Não testa CSS, estrutura DOM  
✅ **Código limpo** — DRY, helpers de renderização, mocks focados  
✅ **Nomes descritivos** — Expressa intenção, não mecânica  
✅ **Cobertura estratégica** — Valida fluxos críticos e edge cases

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT) - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 🤝 Contribuições

> Contribuições são sempre bem-vindas! Siga os passos abaixo:

### 🤔 Como Contribuir

```bash
# Fork o projeto

# Crie uma branch para sua feature
git checkout -b feature/MinhaFeature

# Commit suas mudanças
git commit -m 'feat: adiciona nova feature'

# Push para a branch
git push origin feature/MinhaFeature

# Abra um Pull Request
```

### Padrão de Commits

Conventional Commits:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação de código
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas gerais

## 📬 Contato

<div align="center">

> ### Se quiser conversar sobre o projeto ou tecnologia, entre em contato:

  <a href="https://github.com/cledeocirmarafao" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/cledeocir-maraf%C3%A3o-267768193/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
</div>

## ✨ Autor

**Cledeocir Marafão** — `Desenvolvedor FullStack` _em formação_.

---

<div align="center">

**⭐ Gostou do projeto? Deixe uma estrela!**

Made with ☕ by Cledeocir Marafão

</div>
