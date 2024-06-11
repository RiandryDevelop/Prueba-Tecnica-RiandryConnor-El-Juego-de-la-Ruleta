import { LooseRequired } from '@vue/shared';
import {  Ref, watchEffect } from 'vue';


const apiUrl = import.meta.env.VITE_API_URL;
export const RouletteFormService =(selected: Ref<(string | number)[]>,betAmount: Ref<number>,total: Ref<number>,bet: Ref<any>, emit: { (event: "formReady", ...args: any[]): void; (arg0: string, arg1: boolean): void; }, grid: Ref<(string | number)[][]>, props: LooseRequired<{ readonly player: string; readonly balance: number; readonly onFormReady?: ((...args: any[]) => any) | undefined; } & {}>)=>{
    emits: ['formReady']

      watchEffect(() => {
        setTimeout(() => {
          emit('formReady', true);
        },10000)  
      });
  
      

      const putMoney = (cell: number | string) => {
        if (!betAmount.value) {
          alert("Please enter a bet amount first.");
          return;
        }
  
        const isNumber = !isNaN(Number(cell));
        const isEvenOrOdd = cell === 'EVEN' || cell === 'ODD';
        const isColor = cell === 'RED' || cell === 'BLACK';
  
        if (isNumber && bet.value.number === null && bet.value.type === '') {
          bet.value.number = Number(cell);
        } else if (isEvenOrOdd && bet.value.type === '' && bet.value.number === null) {
          bet.value.type = cell as 'EVEN' | 'ODD';
        } else if (isColor && bet.value.color === '') {
          bet.value.color = cell as 'RED' | 'BLACK';
        } else {
          alert('Invalid selection. Please select a valid combination.');
          return;
        }
  
        selected.value.push(cell);
        updateCellStyle(cell, 'gray');
      };
  
      const updateCellStyle = (cell: number | string, color: string) => {
        const element = document.getElementById(cell.toString());
        if (element) {
          element.style.backgroundColor = color;
        }
      };
  
      const resetForm = () => {
        selected.value.forEach(cell => updateCellStyle(cell, 'white'));
        selected.value = [];
        bet.value = { number: null, type: '', color: '' };
        betAmount.value = 0;
      };
  
      const checkWin = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/Roulette/bet`, {
            method: 'POST',
            body: JSON.stringify({
              playerName: props.player,
              amount: betAmount.value,
              color: bet.value.color,
              Number: bet.value.number,
              type: bet.value.type
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log('Server response:', data);
          sessionStorage.setItem("betResult", JSON.stringify(data));  
          resetForm(); 
          total.value = data.newBalance;
        } catch (error) {
          console.error('Error sending data:', error);
        } 
      };
  
      const saveBalance = async (action: string) => {
        const newBalance = JSON.parse(sessionStorage.getItem('betResult') || '{}');
        await checkWin();
        if (action === 'continueAndSave') {
          try {
            const response = await fetch(`${apiUrl}/api/User/updateBalance`, {
              method: 'POST',
              body: JSON.stringify({
                name: props.player,
                balance: newBalance.newBalance,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json();
            console.log('Server response data:', data);
          } catch (error) {
            console.error('Error sending data:', error);
          }
        }
      };
  
      return {
        grid,
        selected,
        betAmount,
        total,
        bet,
        putMoney,
        updateCellStyle,
        saveBalance
      };
}