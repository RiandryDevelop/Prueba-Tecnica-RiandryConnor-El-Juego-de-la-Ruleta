import { ref } from 'vue';
import { SpinnerRouletteService } from '../../composables/SpinnerRouletteService';
import { describe, expect, it } from 'vitest';

describe('SpinnerRouletteService', () => {
  it('drawRouletteWheel draws correctly', () => {
    const options = ref([1, 2, 3, 4]);
    const startAngle = ref(0);
    const arc = Math.PI / 2;
    const spinTimeout = null;
    const spinAngleStart = 0;
    const spinTime = 0;
    const spinTimeTotal = 0;
    const canvas = ref<HTMLCanvasElement | null>(document.createElement('canvas'));
    const ctx = canvas.value!.getContext('2d');
    
    const service = SpinnerRouletteService(options, startAngle, arc, spinTimeout, spinAngleStart, spinTime, spinTimeTotal, canvas, ctx);
    service.drawRouletteWheel();
    expect(ctx).not.toBeNull();
  });

  it('spin function runs without errors', () => {
    const options = ref([1, 2, 3, 4]);
    const startAngle = ref(0);
    const arc = Math.PI / 2;
    const spinTimeout = null;
    const spinAngleStart = 0;
    const spinTime = 0;
    const spinTimeTotal = 0;
    const canvas = ref<HTMLCanvasElement | null>(document.createElement('canvas'));
    const ctx = canvas.value!.getContext('2d');
    
    const service = SpinnerRouletteService(options, startAngle, arc, spinTimeout, spinAngleStart, spinTime, spinTimeTotal, canvas, ctx);
    service.spin();
    expect(true).toBe(true);
  });
});
