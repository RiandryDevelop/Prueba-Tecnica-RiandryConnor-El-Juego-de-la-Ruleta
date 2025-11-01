<template>
  <div
    class="relative flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-black to-gray-950 rounded-2xl shadow-2xl border border-gray-800/70 backdrop-blur-md overflow-hidden"
  >
    <!-- Glow efecto circular -->
    <div
      class="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 opacity-20 blur-2xl"
    ></div>

    <!-- Halo exterior animado -->
    <div
      class="absolute w-[860px] h-[860px] rounded-full border-4 border-emerald-400/30 animate-pulse-slow"
    ></div>

    <!-- Contenedor Canvas -->
    <div class="relative z-10 flex flex-col items-center justify-center">
      <canvas
        ref="canvas"
        width="800"
        height="800"
        class="w-full max-w-[500px] md:max-w-[650px] h-auto drop-shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-transform duration-300 hover:scale-105"
      ></canvas>

      <button
        @click="spin"
        class="mt-8 px-8 py-3 text-lg font-bold rounded-xl text-white bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-400 hover:scale-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300"
      >
        🎰 Spin the Wheel
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { SpinnerRouletteService } from "../../composables/SpinnerRouletteService";

export default defineComponent({
  name: "SpinnerRoulette",
  setup() {
    const options = ref<number[]>([
      14, 5, 29, 9, 20, 1, 36, 18, 33, 22, 7, 30, 3, 25, 12, 8, 31, 17, 11, 26, 15, 2, 16, 35, 28, 19, 24, 0, 34, 10, 6, 21, 13, 27, 4, 23, 32,
    ]);
    const startAngle = ref<number>(0);
    const arc = Math.PI / (37 / 2);
    let spinTimeout: number | null = null;
    let spinAngleStart: number = 0;
    let spinTime: number = 0;
    let spinTimeTotal: number = 0;
    const canvas_s = ref<HTMLCanvasElement | null>(null);
    let ctx: CanvasRenderingContext2D | null = null;

    const { canvas, spin } = SpinnerRouletteService(
      options,
      startAngle,
      arc,
      spinTimeout,
      spinAngleStart,
      spinTime,
      spinTimeTotal,
      canvas_s,
      ctx
    );

    return { canvas, spin };
  },
});
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
