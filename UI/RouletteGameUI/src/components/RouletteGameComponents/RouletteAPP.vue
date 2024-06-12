<template>
<header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="#" class="flex items-center">
                    <img src="../../assets/roulette-icon.svg" class="mr-3 h-6 sm:h-9" alt="Casino Roulette Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Roulette Game</span>
                </a>
                <div class="flex items-center lg:order-2">
                    <a href="#" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                    <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get out</a>
                </div>
            </div>
        </nav>
    </header>

<div class="flex items-center justify-center min-h-screen p-4">
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
      <RouletteRulesSection />
      <SpinnerRoulette :canSpin="canSpin" class="md:mr-8" />
      <RouletteForm ref="rouletteForm" :player="player" :balance="balance" :canSpin="canSpin" />
    </div>
  </div>
  <footer> 
      <div class="m-5">
      <p class="text-center text-gray-600"> Riandry Develop. Copyright 2022 All Right Reserved</p>
      </div>
      </footer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, provide } from 'vue';
import RouletteForm from './RouletteForm.vue';
import SpinnerRoulette from './SpinnerRoulette.vue';
import RouletteRulesSection from './RouletteRulesSection.vue';


export default defineComponent({
  name: 'GameScreen',
  components: {
    RouletteForm,
    SpinnerRoulette,
    RouletteRulesSection
    
  },
  setup() {
    const player = ref<string>('');
    const balance = ref<number>();
    const canSpin = ref<boolean>(false);

    provide('canSpinData', canSpin);
 
    onMounted(() => {
      const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
      player.value = userData.name;
      balance.value = userData.balance;
    });

    return {
      player,
      balance,
      canSpin,
    };
  }
});
</script>
