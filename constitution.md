# Constituição do Repositório Frontend — AdotaMatch
## Stack: Vue 3 + Vite + TypeScript + PrimeVue + Tailwind CSS | TLC Spec-Driven Development

---

## 1. Visão Geral e Responsabilidade

O módulo **Frontend do AdotaMatch** é uma Single Page Application (SPA) moderna, reativa, responsiva e acessível, desenvolvida para proporcionar uma experiência fluida tanto para **adotantes** (no preenchimento de seus perfis e visualização das recomendações explicáveis) quanto para **protetores e ONGs** (no cadastro e acompanhamento comportamental dos animais acolhidos).

Esta Constituição define os padrões inegociáveis de arquitetura, organização de componentes, tipagem estática e usabilidade aplicados a todo o código TypeScript e Vue da aplicação.

---

## 2. Stack Tecnológica e Bibliotecas Homologadas

* **Framework Base:** Vue 3 (versão mais recente) com Composition API e sintaxe estrita `<script setup>`.
* **Linguagem:** TypeScript (em modo estrito `strict: true`, sem tolerância a tipos `any`).
* **Ferramenta de Build e DevServer:** Vite (com suporte a aliases `@/` apontando para `src/`).
* **Design System & Componentes:** PrimeVue (versão mais recente) integrado e estilizado via utilitários do **Tailwind CSS**.
* **Gerenciamento de Estado Global:** Pinia (stores modulares desacopladas).
* **Roteamento SPA:** Vue Router 4 (com rotas tipadas e carregamento preguiçoso / *lazy loading*).
* **Comunicação HTTP:** Axios encapsulado em classes de serviço estáticas.
* **Ícones:** PrimeIcons ou Lucide Icons.

---

## 3. Padrão Arquitetural do Frontend

A aplicação organiza-se no fluxo estrito de responsabilidades:

```txt
Component (UI / PrimeVue) ──> Store (Pinia) ──> Composable (UX/Regras) ──> Service (HTTP/Axios) ──> Backend API
```

### 3.1 Estrutura de Diretórios (`src/`)
```txt
src/
├── assets/             # Estilos globais Tailwind, logos e imagens estáticas
├── components/         # Componentes Vue reutilizáveis
│   ├── base/           # Componentes atômicos e agnósticos de domínio
│   └── domain/         # Componentes vinculados a regras do AdotaMatch (Cards de Pet, Justificativas)
├── composables/        # Lógicas de estado reativo e controle de UX (usePets, useRecommendation)
├── constants/          # Constantes globais em UPPER_CASE
├── models/             # Tipos (T), Interfaces (I) e DTOs da aplicação
├── router/             # Definição e guardas das rotas do Vue Router
├── services/           # Classes estáticas (C) encapsulando requisições Axios
├── stores/             # Stores Pinia para estado compartilhado
├── views/              # Páginas completas associadas às rotas
├── App.vue             # Componente raiz mínimo (apenas RouterView e Toasts globais)
└── main.ts             # Ponto de entrada, registro do PrimeVue, Pinia e Router
```

---

## 4. Convenções de Código e Nomenclatura em TypeScript / Vue

### 4.1 Nomenclatura Global
* **Types:** Prefixados obrigatoriamente com `T` (ex.: `TPetFilters`, `TAdopterHabitation`).
* **Interfaces:** Prefixadas obrigatoriamente com `I` (ex.: `IPetResponse`, `IRecommendationResult`).
* **Classes:** Prefixadas obrigatoriamente com `C` (ex.: `CPetService`, `CFormatters`).
* **Constantes:** Em caixa alta com sublinhado (`UPPER_CASE`) (ex.: `API_BASE_URL`, `DEFAULT_PAGE_LIMIT`).
* **Parâmetros de Funções:** Devem iniciar obrigatoriamente com o prefixo `p` e declarar tipagem explícita:
  ```ts
  function formatCompatibilityScore(pScore: number): string {
    return `${Math.round(pScore)}%`;
  }
  ```

### 4.2 Estrutura Padronizada do `<script setup>`
O bloco `<script setup lang="ts">` de todo componente deve seguir a ordem canônica com seções comentadas:

```vue
<script setup lang="ts">
// Types e Interfaces
/**
 * @property {boolean} loading - Define se o botão está em estado de processamento.
 * @property {number} petId - Identificador único do animal selecionado.
 */
type TProps = {
  loading: boolean;
  petId: number;
};

/**
 * @property {[id: number]} select - Emitido quando o usuário confirma o interesse no animal.
 */
type TEmits = {
  select: [id: number];
};

// Props
const props = defineProps<TProps>();

// Emits
const emit = defineEmits<TEmits>();

// Constantes
const TOAST_DURATION_MS = 3000;

// Reativas - Model
const isFavorite = defineModel<boolean>();

// Reativas - Ref
const isProcessing = ref(false);

// Computadas
const canAdopt = computed(() => !props.loading && !isProcessing.value);

// Funções
function handleSelect(): void {
  if (!canAdopt.value) return;
  emit('select', props.petId);
}

// Observadores
watch(() => props.petId, (pNewId) => {
  // Tratamento reativo...
});

// Lifecycle Hooks
onMounted(() => {
  // Inicialização controlada...
});

// Expose
defineExpose({
  handleSelect,
});
</script>
```

### 4.3 Organização de Imports
Os imports no topo dos arquivos devem ser organizados por blocos comentados:
```ts
// Ecossistema Vue
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// PrimeVue e UI
import Button from 'primevue/button';
import Card from 'primevue/card';

// Stores
import { useAdopterStore } from '@/stores/useAdopterStore';

// Constantes
import { DEFAULT_PAGE_LIMIT } from '@/constants/DEFAULT_PAGE_LIMIT';

// Types e Interfaces
import type { IPetResponse } from '@/models/IPetResponse';
import type { TPetFilters } from '@/models/TPetFilters';

// Composables
import { useRecommendation } from '@/composables/useRecommendation';

// Services
import { CPetService } from '@/services/CPetService';
```

---

## 5. Diretrizes de Usabilidade, Lock de Requisições e UX

1. **Lock Obrigatório de Requisições:** Toda ação acionada pelo usuário (submissão de formulário, geração de recomendações, filtros) deve possuir lock visual e funcional (`loading` reativo) para impedir requisições duplicadas.
2. **Exibição Transparente da Explicabilidade:** A tela de resultados deve renderizar claramente os **Fatores de Afinidade** (destacados em tons harmoniosos de verde/azul) e os **Alertas Preventivos de Adaptação** (destacados em tons suaves de âmbar/laranja), garantindo que o adotante leia os desafios de adaptação antes de avançar para a solicitação de contato com a ONG.
3. **Acessibilidade e Responsividade:** A aplicação deve ser 100% responsiva (mobile-first), garantindo legibilidade e usabilidade tanto em smartphones quanto em desktops.
