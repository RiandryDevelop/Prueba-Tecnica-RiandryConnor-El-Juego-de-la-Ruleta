<template>
  <div>
    <canvas ref="canvas" width="500" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue';
import { SpinnerRouletteService } from "../../composables/SpinnerRouletteService";

export default defineComponent({
  name: 'SpinnerRoulette',
  props: {
    canSpin: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      sessionValue: ''
    }
  },
  created() {
    this.sessionValue = sessionStorage.getItem('betResult') || '';
      window.addEventListener('storageChange', this.handleStorageChange);
  },
  beforeDestroy() {
    window.removeEventListener('storageChange', this.handleStorageChange);
  },
  methods: {
    handleStorageChange(event: { key: string; newValue: any; }) {
      if (event.key === 'betResult') {
        this.sessionValue = event.newValue;
        this.handleSessionStorageChange(event.newValue);
      }
    },
    handleSessionStorageChange(newValue) {
      console.log(`Session storage changed to ${newValue}`);
      this.spin
    },
    updateSessionStorage(newValue) {
      window.dispatchEvent(new Event('storageChange'));
    }
  }
,
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

    const {canvas, spin} = SpinnerRouletteService(options,startAngle,arc,spinTimeout,spinAngleStart,spinTime,spinTimeTotal,canvas_s,ctx, props);


    return {
      canvas,
      spin
    }
  }
});
</script>
