<script setup lang="ts">
// PrimeVue e UI
import Button from 'primevue/button';
import Tag from 'primevue/tag';

// Componentes
import ExplanationBanner from '@/features/recommendation/components/ExplanationBanner.vue';

// Types e Interfaces
import type { IRecommendationResult } from '@/features/recommendation/models/IRecommendationResult';

/**
 * @property {IRecommendationResult} match - Dados da recomendação com escores e explicações.
 */
type TProps = {
  match: IRecommendationResult;
};

/**
 * @property {[id: number]} contactShelter - Emitido quando o adotante deseja manifestar interesse no abrigo.
 */
type TEmits = {
  contactShelter: [id: number];
};

// Props
const props = defineProps<TProps>();

// Emits
const emit = defineEmits<TEmits>();

// Funções
function handleContact(): void {
  emit('contactShelter', props.match.petId);
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition duration-200 hover:shadow-md">
    <!-- Cabeçalho do Card -->
    <div class="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">
          {{ props.match.petName.charAt(0) }}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-bold text-slate-900">{{ props.match.petName }}</h3>
            <Tag :value="props.match.species === 'DOG' ? 'Cão' : 'Gato'" severity="secondary" rounded />
            <Tag :value="props.match.size" severity="info" rounded />
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Sob custódia de: <span class="font-medium text-slate-700">{{ props.match.shelterName }}</span> ({{ props.match.shelterCity }})
          </p>
        </div>
      </div>

      <!-- Selo de Compatibilidade -->
      <div class="flex items-center gap-3">
        <div class="text-right">
          <span class="block text-2xl font-black text-indigo-600">
            {{ Math.round(props.match.compatibilityScore) }}%
          </span>
          <span class="text-xs text-slate-400 font-medium">Compatibilidade</span>
        </div>
        <div class="text-right border-l pl-3 border-slate-200">
          <span class="block text-sm font-semibold text-emerald-600">
            {{ Math.round(props.match.semanticScore * 100) }}%
          </span>
          <span class="text-xs text-slate-400">Alinhamento LLM</span>
        </div>
      </div>
    </div>

    <!-- Corpo com Explicabilidade -->
    <div class="p-6">
      <ExplanationBanner
        :alignment-factors="props.match.alignmentFactors"
        :preventive-warnings="props.match.preventiveWarnings"
      />

      <div class="mt-6 flex justify-end gap-3">
        <Button
          label="Manifestar Interesse Responsável"
          icon="pi pi-heart"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition"
          @click="handleContact"
        />
      </div>
    </div>
  </div>
</template>
