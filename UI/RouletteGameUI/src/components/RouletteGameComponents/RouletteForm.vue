<template>
  <div
    id="game"
    class="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white"
  >
    <div
      class="w-full max-w-3xl rounded-2xl  shadow-2xl border border-gray-700 bg-gray-900/80 backdrop-blur-xl"
    >
      <table class="table-auto w-full border-collapse">
        <tbody>
          <!-- 🎲 CELDAS DE LA RULETA -->
          <tr
            v-for="row in grid"
            :key="row[0]"
            class="flex justify-center text-center"
          >
            <td
              v-for="cell in row"
              :key="cell"
              :id="cell.toString()"
              @click="putMoney(cell)"
              class="flex-1 py-4 px-6 text-lg font-semibold border border-gray-700 cursor-pointer transition-all duration-300 select-none
                     hover:scale-105 hover:text-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]
                     bg-gray-800/60 hover:bg-gray-800 rounded-lg"
            >
              {{ cell }}
            </td>
          </tr>

          <!-- 🧾 INFORMACIÓN DEL JUGADOR -->
          <tr class="flex flex-wrap items-center items-stretch justify-between border-t border-gray-700 bg-gray-900/60 mt-4 px-4 py-3 rounded-b-xl">
            <td
              id="money"
              colspan="3"
              class="text-center py-3 flex-1 text-lg font-medium"
              :class="{
                'text-green-400': store.balance > 0,
                'text-red-500': store.balance <= 0
              }"
            >
              💰 {{ store.username }},
              <span v-if="store.balance > 0">
                you have <strong>{{ store.balance }}$</strong>
              </span>
              <span v-else class="font-semibold">YOU ARE BROKE 💀</span>
            </td>

<!-- 💵 APUESTA -->
<td id="bet" colspan="3" class="py-4 flex flex-col justify-center flex-1 space-y-2">
  <label
    for="bet"
    class="text-base font-medium text-gray-300 tracking-wide"
  >
    💵 Enter Your Bet:
  </label>

  <input
    type="number"
    name="bet"
    id="betInput"
    v-model.number="betAmount"
    :max="store.balance"
    placeholder="Place your bet..."
    class="w-full px-4 py-3 text-lg font-semibold text-gray-100 placeholder-gray-500 
           bg-gradient-to-r from-gray-800 to-gray-900 
           border border-gray-700 rounded-xl 
           focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent 
           transition-all duration-300 shadow-inner"
  />
</td>

<!-- 🎮 BOTONES DE CONTROL -->
<td colspan="3" class="py-4 flex flex-col items-center justify-center space-y-3">
  <button
    :disabled="!isReady"
    @click="continueGame()"
    class="w-40 px-6 py-3 font-semibold text-white text-center rounded-xl 
           bg-gradient-to-r from-cyan-500 to-blue-600 
           hover:scale-105 transition-all duration-300 
           shadow-lg shadow-cyan-500/30 
           disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Continue
  </button>

  <button
    @click="saveBalance()"
    class="w-40 px-6 py-3 font-semibold text-white text-center rounded-xl 
           bg-gradient-to-r from-green-500 to-emerald-600 
           hover:scale-105 transition-all duration-300 
           shadow-lg shadow-emerald-500/30"
  >
    Save Balance
  </button>
</td>
 
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref , computed,  onMounted} from 'vue';
import {RouletteFormService} from "../../composables/RouletteFormService"
import { useStore } from '../../store/store';
import {TGrid} from "../../types/TRoulette"
import { IBet } from "../../interfaces/IRoulette";



export default defineComponent({
  name: 'RouletteForm',
  setup() {
    const store =  useStore();
    const grid_s = ref<TGrid>([
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
