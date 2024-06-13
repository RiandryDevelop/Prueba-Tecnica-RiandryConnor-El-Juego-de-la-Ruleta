// __tests__/routes.spec.ts
import { createRouter, createWebHistory} from 'vue-router';
import routes from '../../routes/routes';
import HomePage from '../../components/HomeComponents/HomePage.vue';
import RouletteAPP from '../../components/RouletteGameComponents/RouletteAPP.vue';
import { describe, expect, it } from 'vitest';

describe('Router', () => {
  it('has the correct routes', () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    expect(router.getRoutes()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '/', name: 'home', component: HomePage }),
        expect.objectContaining({ path: '/roulette', name: 'roulette', component: RouletteAPP }),
      ])
    );
  });
});
