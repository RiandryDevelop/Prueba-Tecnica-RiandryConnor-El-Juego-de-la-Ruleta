import { setActivePinia, createPinia } from 'pinia';
import { useStore } from '../../store/store';
import { it, expect,describe, beforeEach } from 'vitest';

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initial state is correct', () => {
    const store = useStore();
    expect(store.canSpin).toBe(true);
    expect(store.balance).toBe(0);
    expect(store.username).toBe('');
  });

  it('toggleSpin changes canSpin', () => {
    const store = useStore();
    store.toggleSpin();
    expect(store.canSpin).toBe(false);
  });

  it('loadBalance sets state correctly', () => {
    sessionStorage.setItem('userData', JSON.stringify({ balance: 100, name: 'User' }));
    const store = useStore();
    store.loadBalance();
    expect(store.balance).toBe(100);
    expect(store.username).toBe('User');
    expect(store.canSpin).toBe(false);
  });

  it('newBalance sets balance correctly', () => {
    const store = useStore();
    store.newBalance(200);
    expect(store.balance).toBe(200);
  });

  it('saveState saves state to sessionStorage', () => {
    const store = useStore();
    store.username = 'User';
    store.balance = 300;
    store.saveState();
    const savedData = JSON.parse(sessionStorage.getItem('userData')!);
    expect(savedData.name).toBe('User');
    expect(savedData.balance).toBe(300);
  });
});
