<template>
  <div class="gameScreen">
    <SpinnerRoulette />
    <RouletteForm />
  </div>
</template>

<script>
import RouletteForm from './RouletteForm.vue';
import SpinnerRoulette from './SpinnerRoulette.vue';

export default {
  data() {
  },
  methods: {
  mounted() {
  }
}
};
</script>

<style scoped lang="css">
.gameScreen{
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   height: 100vh;
   width: 100vw;
}
</style>