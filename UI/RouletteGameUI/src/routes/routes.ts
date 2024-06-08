// router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// RoutesRouletteAPP
import HomePage from '../components/HomeComponents/HomePage.vue';
import RouletteAPP from '../components/RouletteGameComponents/RouletteAPP.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomePage },
  { path: '/roulette', component: RouletteAPP },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
