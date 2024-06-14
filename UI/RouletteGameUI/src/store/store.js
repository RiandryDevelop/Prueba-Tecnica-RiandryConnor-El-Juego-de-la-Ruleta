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
        newBalance() {
            const betResult = JSON.parse(sessionStorage.getItem('betResult') || '{}');
            this.balance = this.balance + betResult.prize;
            console.log('Updated Balance in State:', this.balance);
        },
        saveState() {
            const userData = {
                name: this.username,
                balance: this.balance,
            };
            console.log('Saving State:', userData);
            sessionStorage.setItem('userData', JSON.stringify(userData));
        },
        async loadBalance() {
            const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
            console.log('Loaded User Data:', userData);
            if (userData && userData.name) {
                this.balance = userData.balance;
                this.username = userData.name;
                this.canSpin = false;
                console.log('Balance Loaded:', this.balance);
            }
        },
    },
});
