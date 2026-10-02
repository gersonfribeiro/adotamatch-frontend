// Ecossistema
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Views das Features
import RecommendationView from '@/features/recommendation/views/RecommendationView.vue';
import PetCatalogView from '@/features/pet/views/PetCatalogView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/match',
  },
  {
    path: '/match',
    name: 'recommendation-match',
    component: RecommendationView,
  },
  {
    path: '/pets',
    name: 'pet-catalog',
    component: PetCatalogView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
