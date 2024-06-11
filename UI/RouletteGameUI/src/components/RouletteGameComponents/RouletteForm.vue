<template>
  <div id="game" class="grid place-items-center h-screen">
    <table class="table-auto bg-white w-full md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-lg rounded-lg shadow-lg">
      <tr v-for="row in grid" :key="row[0]" class="grid grid-cols-6 md:grid-cols-8">
        <td v-for="cell in row" :key="cell" :id="cell.toString()" @click="putMoney(cell)" class="p-2 md:p-4 text-xl cursor-pointer hover:bg-gray-200 transition-colors duration-300">
          {{ cell }}
        </td>
      </tr>
      <tr>
        <td id="money" colspan="8" class="text-center py-2" :class="{ 'text-green-600': total > balance, 'text-red-600': total < balance }">
          {{ player }}, You Have {{ total || balance }}$
        </td>
        <td id="bet" colspan="8" class="py-2">
          <label for="bet" class="block mb-1 text-sm">Enter Bet Amount:</label>
          <input type="number" name="bet" id="betInput" v-model.number="betAmount" :max="balance" class="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
        </td>
        <td colspan="8" class="py-2">
          <button :disabled="!isReady" @click="saveBalance('continue')" class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 mr-2">Continue</button>
          <button :disabled="!isReady" @click="saveBalance('continueAndSave')" class="px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-700">Continue and Save</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;

type Grid = (string | number)[][];

interface Bet {
  number: number | null;
  type: 'EVEN' | 'ODD' | '';
  color: 'RED' | 'BLACK' | '';
}

export default defineComponent({
  name: 'RouletteForm',
  props: {
    player: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: true
    }
  },
  emits: ['formReady'],
  setup(props, { emit }) {
    const grid = ref<Grid>([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9, 0],
      [10, 11, 12],
      [13, 14, 15, 'EVEN'],
      [16, 17, 18],
      [19, 20, 21, 'ODD'],
      [22, 23, 24],
      [25, 26, 27, 'RED'],
      [28, 29, 30],
      [31, 32, 33, 'BLACK'],
      [34, 35, 36]
    ]);

    const selected = ref<(number | string)[]>([]);
    const betAmount = ref<number>(0);
    const total = ref<number>(props.balance);
    const bet = ref<Bet>({ number: null, type: '', color: '' });
    total.value = props.balance;
    const isReady = computed(() => {
      return (
        bet.value.color &&
        ((bet.value.number !== null && bet.value.number >= 0 && !bet.value.type) || (!bet.value.number && bet.value.type))
      );
    });

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

        const betData = JSON.parse(sessionStorage.getItem('betResult') || '{}');
        sessionStorage.setItem("betResult", JSON.stringify(data));
        total.value = betData.newBalance;

        resetForm(); 
      } catch (error) {
        console.error('Error sending data:', error);
      } 
    };

    const saveBalance = async (action: string) => {
      const betData = JSON.parse(sessionStorage.getItem('betResult') || '{}');
      await checkWin();
      if (action === 'continueAndSave') {
        try {
          const response = await fetch(`${apiUrl}/api/Roulette/saveLastBet`, {
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

          const response_2 = await fetch(`${apiUrl}/api/User/updateBalance`, {
            method: 'POST',
            body: JSON.stringify({
              name: props.player,
              balance: betData.prize
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data_2 = await response_2.json();
          const data = await response.json();
          sessionStorage.setItem('userData', JSON.stringify(data));
          console.log('Server response:', data);
          console.log('Server response:', data_2);
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
      isReady,
      putMoney,
      updateCellStyle,
      saveBalance
    };
  }
});
</script>

<style scoped>
td {
  text-align: center;
  border: 1px solid black;
  cursor: pointer;
}
</style>
