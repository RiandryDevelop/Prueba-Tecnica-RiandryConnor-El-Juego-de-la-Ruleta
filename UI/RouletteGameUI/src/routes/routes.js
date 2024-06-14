import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomeComponents/HomePage.vue';
import RouletteAPP from '../components/RouletteGameComponents/RouletteAPP.vue';
export const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/roulette', name: 'roulette', component: RouletteAPP },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
