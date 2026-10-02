# AdotaMatch — Frontend SPA
> **Interface Reativa e Explicável para Adoção Responsável de Animais**

[![Vue 3](https://img.shields.io/badge/Vue_3-3.5+-4FC08D.svg?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3+-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0+-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PrimeVue](https://img.shields.io/badge/PrimeVue-4+-06B6D4.svg?logo=primevue&logoColor=white)](https://primevue.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-06B6D4.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-4+-FFE564.svg?logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![TLC Spec-Driven](https://img.shields.io/badge/Methodology-TLC_Spec--Driven-blue.svg)](#metodologia-tlc-spec-driven)

---

## 1. Visão Geral do Projeto

O **AdotaMatch Frontend** é a aplicação de interface do ecossistema AdotaMatch, projetada para proporcionar uma jornada fluida, acolhedora e consciente para quem deseja adotar um cão ou gato, além de apoiar os protetores e abrigos na triagem pré-adoção.

O sistema inova ao ir além da navegação tradicional por fotos e catálogos:
* **Formulário de Perfil Socioespacial:** Coleta dados estruturados (espaço de moradia, tempo livre diário, crianças e outros pets no lar).
* **Campo de Narrativa Livre:** Permite que o adotante descreva sua rotina e expectativas em texto livre, cuja semântica é processada por Modelos de Linguagem de Grande Porte (LLMs).
* **Exibição Ranqueada com Explicabilidade Preventiva:** Cada animal recomendado é apresentado com seu percentual de compatibilidade global, alinhamento contextual da LLM, **Fatores Positivos de Afinidade** e **Alertas Preventivos de Manejo e Adaptação** para mitigar devoluções.

---

## 2. Metodologia TLC Spec-Driven Development

Este repositório é governado pelo paradigma **Spec-Driven**:
* 📜 **[constitution.md](constitution.md):** Padrões de código TypeScript/Vue, organização de imports, ordem de `<script setup>` e regras de lock de requisições.
* 🤖 **[agents.md](agents.md):** Catálogo de papéis e diretrizes de orquestração para Agentes de IA.
* 📋 **Especificações Técnicas e de Negócio (`specs/`):**
  * `01-business-domain-spec.md`: Requisitos de negócio e impacto social contra o abandono.
  * `02-system-architecture-spec.md`: Arquitetura do sistema desacoplado e pipeline de dados.
  * `04-frontend-technical-spec.md`: Mapa de rotas, stores Pinia e componentes.
  * `05-recommendation-engine-spec.md`: Formalização matemática do recomendador e esquemas de prompt da LLM.

---

## 3. Padrão Arquitetural

* **Vertical Slice by Feature + MVC Convencional:**
  * Organizado em fatias por domínio (`features/recommendation`, `features/pet`, `features/adopter`, `shared`).
  * Fluxo unidirecional direto: `Component` $\rightarrow$ `Store (Pinia)` $\rightarrow$ `Service (Axios)` $\rightarrow$ `Backend API`.
  * **O Core Domain é a Recomendação Inteligente:** A feature de recomendação concentra a maior riqueza de componentes, stores e lógica reativa.

```txt
src/
├── features/
│   ├── recommendation/          # [CORE DOMAIN DA APLICAÇÃO]
│   │   ├── components/          # MatchCard.vue, ExplanationBanner.vue
│   │   ├── models/              # IRecommendationResult.ts, TRecommendationRequest.ts
│   │   ├── services/            # CRecommendationService.ts
│   │   ├── stores/              # useRecommendationStore.ts (com lock reativo)
│   │   └── views/               # RecommendationView.vue
│   ├── pet/                     # [FEATURE DE ANIMAIS]
│   │   └── views/               # PetCatalogView.vue
│   └── adopter/                 # [FEATURE DE ADOTANTES]
├── shared/                      # [COMPARTILHADOS]
│   ├── components/              # BaseNavbar.vue
│   ├── constants/               # C_API_CONFIG.ts
│   └── services/                # CHttpClient.ts (Axios)
├── assets/                      # main.css (Tailwind + PrimeIcons)
├── router/                      # index.ts (Vue Router)
├── App.vue                      # Raiz com Navbar, RouterView e Footer
└── main.ts                      # Setup de plugins (PrimeVue com tema Aura, Pinia, Router)
```

---

## 4. Requisitos e Pré-requisitos

* **Node.js:** Versão 20.x ou superior (testado na v24.19).
* **Gerenciador de Pacotes:** `npm` (versão 10+).

---

## 5. Como Executar

### 5.1 Instalar Dependências
```bash
npm install
```

### 5.2 Executar em Modo de Desenvolvimento
```bash
npm run dev
```

A aplicação estará acessível em `http://localhost:5173`.

### 5.3 Compilar para Produção (Build e Type-Check)
```bash
npm run build
```

Os arquivos estáticos otimizados serão gerados na pasta `dist/`.

---

## 6. Configuração de Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` caso deseje customizar a URL da API do backend:
```bash
cp .env.example .env
```

Configuração padrão:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 7. Licença

Este projeto é desenvolvido para fins acadêmicos e sociais no âmbito do Bacharelado em Ciência da Computação do **UNIFAGOC**.
