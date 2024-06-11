<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-row">
      <SpinnerRoulette :canSpin="canSpin" class="mr-8" />
      <RouletteForm ref="rouletteForm" :player="player" :balance="balance" @formReady="handleFormReady" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import RouletteForm from './RouletteForm.vue';
import SpinnerRoulette from './SpinnerRoulette.vue';

export default defineComponent({
  name: 'GameScreen',
  components: {
    RouletteForm,
    SpinnerRoulette
  },
  setup() {
    const player = ref<string>('');
    const balance = ref<number>(0);
    const canSpin = ref<boolean>(false);
  
    const handleFormReady = (ready: boolean) => {
      canSpin.value = ready;
    };

    onMounted(() => {
      const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
      player.value = userData.name;
      balance.value = userData.balance;
    });

    return {
      player,
      balance,
      canSpin,
      handleFormReady,
    };
  }
});
</script>
