<template>
  <div class="gameScreen">
    <SpinnerRoulette @spinResult="handleSpinResult" :canSpin="canSpin" />
    <RouletteForm :player="player" :balance="balance" />
  </div>
</template>

<script>
import RouletteForm from './RouletteForm.vue';
import SpinnerRoulette from './SpinnerRoulette.vue';
const apiUrl = import.meta.env.VITE_API_URL;

export default {
  components: {
    RouletteForm,
    SpinnerRoulette
  },
  data() {
    return {
      player: '',
      balance: 0,
      canSpin: false
    };
  },
  methods: {
    handleSpinResult(result) {
      console.log(result);
      console.log(this.$refs.RouletteForm.selected);
      this.canSpin = false;
    }
  },
  mounted() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    this.player = userData.name;
    this.balance = userData.balance;
  }
};
</script>

<style scoped lang="css">
.gameScreen {
  display: flex;
}
</style>
