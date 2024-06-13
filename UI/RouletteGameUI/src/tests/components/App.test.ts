// __tests__/App.spec.ts
import { mount } from '@vue/test-utils';
import { describe, expect, it } from "vitest";
import { createRouter, createWebHistory } from 'vue-router';
import App from '../../../src/App.vue';

// Define tus rutas simuladas
const routes = [
  {
    path: '/',
    component: { template: '<div>Home</div>' }
  }
];

// Crea una instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('App.vue', () => {
  it('renders router view', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    // Necesario para asegurarse de que el router esté listo
    await router.isReady();
    
    expect(wrapper.toBeDefined('router-view').exists()).toBe(true);
  });
});
