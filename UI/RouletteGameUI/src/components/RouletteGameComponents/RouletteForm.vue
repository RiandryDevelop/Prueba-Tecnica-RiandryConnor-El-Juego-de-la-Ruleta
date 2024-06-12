<template>
  <div id="game" class="grid place-items-center min-h-screen p-4">
    <table class="table-auto bg-white w-full max-w-full md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-lg rounded-lg shadow-lg">
      <tr v-for="row in grid" :key="row[0]" class="grid grid-cols-3 md:grid-cols-6">
        <td v-for="cell in row" :key="cell" :id="cell.toString()" @click="putMoney(cell)" class="p-2 text-sm md:text-xl cursor-pointer hover:bg-gray-200 transition-colors duration-300">
          {{ cell }}
        </td>
      </tr>
      <tr>
        <td id="money" colspan="3" md:colspan="9" class="text-center py-2" :class="{ 'text-green-600': total > balance, 'text-red-600': total < balance }">
          {{ player }}, You Have {{ total <= 0 ?"YOU ARE BROKE" : total}}$
        </td>
        <td id="bet" colspan="3" md:colspan="9" class="py-2">
          <label for="bet" class="block mb-1 text-sm">Enter Bet Amount:</label>
          <input type="number" name="bet" id="betInput" v-model.number="betAmount" :max="balance" class="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
        </td>
        <td colspan="3" md:colspan="9" class="py-2">
          <button :disabled="!isReady" @click="continueGame()" class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 mr-2">Continue</button>
          <button @click="saveBalance()" class="px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-700"> Save Balance</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref , computed,  onMounted} from 'vue';
import {RouletteFormService} from "../../composables/RouletteFormService"
import { store } from "../../helpers/store";
import {Grid} from "../../types/TRoulette"
import { IBet } from "../../interfaces/IRoulette";


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
    },
  },
  setup(props) {
    // const canSpin = inject('canSpinData');
    const grid_s = ref<Grid>([
      [0, 1, 2, 3, 4, 5 ],
      [6, 7, 8, 9, 10,11],
      [12,13,14,15,16,17],
      [18,19,20,21,22,23],
      [24,25,26,27,28,29],
      [30,31,32,33,34,35],
      [36,"EVEN","ODD","BLACK","RED"],
    ]);

    const selected_s = ref<(number | string)[]>([]);
    const betAmount_s = ref<number>(0);
    let total_s = ref<number>(props.balance);
    const bet_s = ref<IBet>({ number: null, type: '', color: '' });
    const isReady = computed(() => {
      return (
        bet.value.color &&
        ((bet.value.number !== null && bet.value.number >= 0 && !bet.value.type) || (!bet.value.number && bet.value.type)) || bet.value.color
      );
    });
    
    
onMounted(() => {
  total_s = ref<number>(props.balance);
})

  
  const {
        grid,
        selected,
        betAmount,
        total,
        bet,
        putMoney,
        updateCellStyle,
        continueGame,
        saveBalance,
      } =  RouletteFormService(selected_s,betAmount_s,total_s,bet_s, store, grid_s)  

      return {
        grid,
        selected,
        betAmount,
        total,
        bet,
        isReady,
        putMoney,
        updateCellStyle,
        continueGame,
        saveBalance
      }
  }
}
);
</script>

<style scoped>
td {
  text-align: center;
  border: 1px solid black;
  cursor: pointer;
}
</style>
