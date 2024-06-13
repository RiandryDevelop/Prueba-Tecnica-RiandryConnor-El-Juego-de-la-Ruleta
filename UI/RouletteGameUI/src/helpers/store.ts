import { defineStore } from 'pinia';

export const useStore = defineStore('spinner', {
  state: () => ({
    canSpin: true,
    balance: 0,
    username: '',
  }),
  getters: {},
  actions: {
    toggleSpin() {
      this.canSpin = !this.canSpin;
    },
    newBalance(newBalance: number) {
      this.balance = newBalance;
    },
    saveState() {
      const userData = {
        name: this.username,
        balance: this.balance,
      };
      sessionStorage.setItem('userData', JSON.stringify(userData));
    },
    async loadBalance() {
      const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
      if (userData) {
        this.balance = userData.balance;
        this.username = userData.name;
        this.canSpin = false; // Desactiva el spinner cuando se carga el balance
      }
    },
  },
});
