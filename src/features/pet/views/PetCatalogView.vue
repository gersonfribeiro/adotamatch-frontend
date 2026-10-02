<script setup lang="ts">
// Ecossistema
import { useRouter } from 'vue-router';

// PrimeVue e UI
import Button from 'primevue/button';

// Router
const router = useRouter();

// Funções
function handleGoToMatch(): void {
  router.push('/match');
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12 text-center space-y-6">
    <div class="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto text-2xl">
      <i class="pi pi-filter"></i>
    </div>
    <h1 class="text-3xl font-extrabold text-slate-900">
      Catálogo Geral de Animais Acolhidos
    </h1>
    <p class="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
      Em vez de escolher apenas por fotos ou filtros estáticos que podem levar a devoluções,
      recomendamos que utilize o nosso motor de compatibilidade inteligente.
    </p>
    <div class="pt-4">
      <Button
        label="Ir para Recomendação Inteligente com LLM"
        icon="pi pi-sparkles"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition"
        @click="handleGoToMatch"
      />
    </div>
  </div>
</template>
