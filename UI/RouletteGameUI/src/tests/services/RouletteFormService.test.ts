import { ref } from 'vue';
import { useStore } from '../../store/store';
import { RouletteFormService } from '../../composables/RouletteFormService';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('RouletteFormService', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('putMoney updates selected correctly', () => {
    const selected = ref<(string | number)[]>([]);
    const betAmount = ref(100);
    const bet = ref({});
    const grid = ref([]);
    const store = useStore();
    
    const service = RouletteFormService(selected, betAmount, bet, grid, store);
    service.putMoney(5);
    expect(selected.value).toContain(5);
  });

  it('resetForm clears the form correctly', () => {
    const selected = ref<(string | number)[]>([5]);
    const betAmount = ref(100);
    const bet = ref({ number: 5, type: '', color: '' });
    const grid = ref([]);
    const store = useStore();
    
    const service = RouletteFormService(selected, betAmount, bet, grid, store);
    service.resetForm();
    expect(selected.value).toHaveLength(0);
    expect(bet.value).toEqual({ number: null, type: '', color: '' });
    expect(betAmount.value).toBe(0);
  });

  it('checkWin sends data and updates balance', async () => {
    const selected = ref<(string | number)[]>([5]);
    const betAmount = ref(100);
    const bet = ref({ number: 5, type: '', color: '' });
    const grid = ref([]);
    const store = useStore();
    sessionStorage.setItem('userData', JSON.stringify({ name: 'User' }));
    fetch.mockResponseOnce(JSON.stringify({ newBalance: 200 }));

    const service = RouletteFormService(selected, betAmount, bet, grid, store);
    await service.checkWin();
    expect(store.balance).toBe(200);
  });
});
