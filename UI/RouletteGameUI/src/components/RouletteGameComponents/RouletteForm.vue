<template>
  <div id="game" class="flex flex-col items-center justify-center min-h-screen p-4">
    <table class="table-auto bg-white w-full max-w-full md:max-w-2xl rounded-lg shadow-lg border-separate border border-slate-400">
      <tbody>
        <tr v-for="row in grid" :key="row[0]" class="flex flex-wrap">
          <td v-for="cell in row" :key="cell" :id="cell.toString()" @click="putMoney(cell)" class="border border-slate-300 py-3 px-4 text-lg md:text-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300 flex-1">
            {{ cell }}
          </td>
        </tr>
        <tr class="flex flex-wrap">
          <td id="money" colspan="3" class="text-center py-2 flex-1" :class="{ 'text-green-600': store.balance > 0, 'text-red-600': store.balance <=  0 }">
            {{ store.username }}, You Have {{ store.balance <= 0 ? "YOU ARE BROKE" : store.balance }}$
          </td>
          <td id="bet" colspan="3" class="py-2 flex-1">
            <label for="bet" class="block mb-1 text-sm">Enter Bet Amount:</label>
            <input type="number" name="bet" id="betInput" v-model.number="betAmount" :max="store.balance" class="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
          </td>
          <td colspan="3" class="py-2 flex-1 flex justify-between">
            <button :disabled="!isReady" @click="continueGame()" class="px-3 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 mr-2">Continue</button>
            <button @click="saveBalance()" class="px-3 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-700">Save Balance</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref , computed,  onMounted, onBeforeUpdate} from 'vue';
import {RouletteFormService} from "../../composables/RouletteFormService"
import { useStore } from '../../helpers/store';
import {Grid} from "../../types/TRoulette"
import { IBet } from "../../interfaces/IRoulette";



export default defineComponent({
  name: 'RouletteForm',
  setup() {
    const store =  useStore();
    console.log("store balance",store.balance)
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
    const bet_s = ref<IBet>({ number: null, type: '', color: '' });
    const isReady = computed(() => {
      return (
        bet.value.color &&
        ((bet.value.number !== null && bet.value.number >= 0 && !bet.value.type) || (!bet.value.number && bet.value.type)) || bet.value.color
      );
    });
    
onMounted(async() => {
   store.loadBalance()
})

onBeforeUpdate(async() => {
  store.loadBalance()
})
  
  const {
        grid,
        selected,
        betAmount,
        bet,
        putMoney,
        updateCellStyle,
        continueGame,
        saveBalance,
      } =  RouletteFormService(selected_s,betAmount_s,bet_s ,grid_s,store)  

      return {
        grid,
        selected,
        betAmount,
        bet,
        isReady,
        putMoney,
        updateCellStyle,
        continueGame,
        saveBalance,
        store
        
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
