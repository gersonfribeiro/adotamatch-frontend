<script setup lang="ts">
// Ecossistema
import { useRouter, useRoute } from 'vue-router';

// PrimeVue e UI
import Button from 'primevue/button';

// Router
const router = useRouter();
const route = useRoute();

// Funções
function navigateTo(pPath: string): void {
  router.push(pPath);
}

function isActive(pPath: string): boolean {
  return route.path === pPath;
}
</script>

<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Marca e TCC Badge -->
      <div class="flex items-center gap-3 cursor-pointer" @click="navigateTo('/')">
        <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          <i class="pi pi-heart-fill"></i>
        </div>
        <div>
          <span class="font-extrabold text-lg text-slate-900 tracking-tight">Adota<span class="text-emerald-600">Match</span></span>
          <span class="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
            Adoção Ética & LLM • UNIFAGOC
          </span>
        </div>
      </div>

      <!-- Links de Navegação Principal -->
      <nav class="flex items-center gap-1 sm:gap-2">
        <Button
          label="Diagnóstico com IA"
          icon="pi pi-sparkles"
          :text="!isActive('/match')"
          :class="isActive('/match') ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:text-emerald-600 font-medium'"
          class="text-xs sm:text-sm rounded-xl px-3 py-2"
          @click="navigateTo('/match')"
        />
        <Button
          label="Catálogo"
          icon="pi pi-th-large"
          :text="!isActive('/pets')"
          :class="isActive('/pets') ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:text-emerald-600 font-medium'"
          class="text-xs sm:text-sm rounded-xl px-3 py-2"
          @click="navigateTo('/pets')"
        />
        <Button
          label="Área do Mantenedor"
          icon="pi pi-building"
          :text="!isActive('/shelter')"
          :class="isActive('/shelter') ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:text-emerald-600 font-medium'"
          class="text-xs sm:text-sm rounded-xl px-3 py-2"
          @click="navigateTo('/shelter')"
        />
      </nav>
    </div>
  </header>
</template>
