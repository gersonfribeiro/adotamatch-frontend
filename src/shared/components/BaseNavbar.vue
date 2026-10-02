<script setup lang="ts">
// Ecossistema
import { useRouter } from 'vue-router';

// PrimeVue e UI
import Button from 'primevue/button';

// Router
const router = useRouter();

// Funções
function navigateTo(pPath: string): void {
  router.push(pPath);
}
</script>

<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3 cursor-pointer" @click="navigateTo('/')">
        <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          <i class="pi pi-heart-fill"></i>
        </div>
        <div>
          <span class="font-extrabold text-lg text-slate-900 tracking-tight">Adota<span class="text-indigo-600">Match</span></span>
          <span class="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
            Adoção Ética & LLM
          </span>
        </div>
      </div>

      <nav class="flex items-center gap-2">
        <Button
          label="Recomendação"
          icon="pi pi-sparkles"
          text
          class="text-slate-700 hover:text-indigo-600 text-sm font-medium"
          @click="navigateTo('/match')"
        />
        <Button
          label="Catálogo"
          icon="pi pi-th-large"
          text
          class="text-slate-700 hover:text-indigo-600 text-sm font-medium"
          @click="navigateTo('/pets')"
        />
      </nav>
    </div>
  </header>
</template>
