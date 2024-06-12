<template>
  <div>
    <canvas ref="canvas" width="500" height="500" class="w-full max-w-full h-auto"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, } from 'vue';
import { SpinnerRouletteService } from "../../composables/SpinnerRouletteService";


export default defineComponent({
  name: 'SpinnerRoulette',
  setup(props) {
    
    const options = ref<number[]>([
      14, 5, 29, 9, 20, 1, 36, 18, 33, 22, 7, 30, 3, 25, 12, 8, 31, 17, 11, 26, 15, 2, 16, 35, 28, 19, 24, 0, 34, 10, 6, 21, 13, 27, 4, 23, 32
    ]);
    const startAngle = ref<number>(0);
    const arc = Math.PI / (37 / 2);
    let spinTimeout: number | null = null;
    let spinAngleStart: number = 0;
    let spinTime: number = 0;
    let spinTimeTotal: number = 0;
    const canvas_s = ref<HTMLCanvasElement | null>(null);
    let ctx: CanvasRenderingContext2D | null = null;

    const canSpinData = inject('sharedData');
    const {canvas, spin} = SpinnerRouletteService(options,startAngle,arc,spinTimeout,spinAngleStart,spinTime,spinTimeTotal,canvas_s,ctx, canSpinData);
    

    return {
      canvas,
      spin
    }
  }
});
</script>
