import { LooseRequired } from '@vue/shared';
import {  Ref, onMounted, watchEffect } from 'vue';

export const SpinnerRouletteService = (
  options: Ref<number[]>, startAngle: Ref<number>, arc: number, 
  spinTimeout: number | null | undefined, spinAngleStart: number,  
  spinTime: number, spinTimeTotal: number,
  canvas: Ref<HTMLCanvasElement | null>, 
  ctx: CanvasRenderingContext2D | null, props: LooseRequired<{ readonly canSpin: boolean; } & {}>) =>{

    const byte2Hex = (n: number): string => {
        const nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
      };
  
      const RGB2Color = (r: number, g: number, b: number): string => {
        return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
      };
  
      const getColor = (item: number, maxitem: number): string => {
        const phase = 0;
        const center = 128;
        const width = 127;
        const frequency = Math.PI * 2 / maxitem;
  
        const red = Math.sin(frequency * item + 2 + phase) * width + center;
        const green = Math.sin(frequency * item + 0 + phase) * width + center;
        const blue = Math.sin(frequency * item + 4 + phase) * width + center;
  
        return RGB2Color(red, green, blue);
      };
  
      const drawRouletteWheel = () => {
        if (!canvas.value) return;
        const outsideRadius = 200;
        const textRadius = 160;
        const insideRadius = 125;
  
        ctx = canvas.value.getContext('2d');
        if (!ctx) return;
  
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.font = 'bold 12px Helvetica, Arial';
  
        for (let i = 0; i < options.value.length; i++) {
          const angle = startAngle.value + i * arc;
          ctx.fillStyle = getColor(i, options.value.length);
  
          ctx.beginPath();
          ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
          ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
          ctx.stroke();
          ctx.fill();
  
          ctx.save();
          ctx.shadowOffsetX = -1;
          ctx.shadowOffsetY = -1;
          ctx.shadowBlur = 0;
          ctx.shadowColor = 'rgb(220,220,220)';
          ctx.fillStyle = 'black';
          ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          const text = options.value[i].toString();
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.restore();
        }
      };
  
      const spin = async () => {
        if (!props.canSpin) return;
        try {
          const betData = JSON.parse(sessionStorage.getItem('betResult') || '{}');
          console.log("Spin Result", betData);
          const winningColor = betData.generatedColor;
          const winningNumber = betData.generatedNumber;
          
          spinAngleStart = Math.random() * 10 + 10;
          spinTime = 0;
          spinTimeTotal = (Math.random() * 3 + 4) * 1000;
          rotateWheel(winningNumber, winningColor);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      const rotateWheel = (winningNumber: number, winningColor: string) => {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
          stopRotateWheel(winningNumber, winningColor);
          return;
        }
        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle.value += (spinAngle * Math.PI / 180);
        drawRouletteWheel();
        spinTimeout = window.setTimeout(() => rotateWheel(winningNumber, winningColor), 30);
        
      };
  
      const stopRotateWheel = (winningNumber: number, winningColor: string) => {
        if (spinTimeout) {
          clearTimeout(spinTimeout);
        }
        if (!ctx) return;
        ctx.save();
        ctx.font = 'bold 30px Helvetica, Arial';
        if (!canvas.value) return;
        const outsideRadius = 200;
        const textRadius = 160;
        const insideRadius = 125;
  
        ctx = canvas.value.getContext('2d');
        if (!ctx) return;
  
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.font = 'bold 12px Helvetica, Arial';
  
        for (let i = 0; i < options.value.length; i++) {
          const angle = startAngle.value + i * arc;
          ctx.fillStyle = winningColor;
          ctx.beginPath();
          ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
          ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
          ctx.stroke();
          ctx.fill();
  
          ctx.save();
          ctx.shadowOffsetX = -1;
          ctx.shadowOffsetY = -1;
          ctx.shadowBlur = 0;
          ctx.shadowColor = 'rgb(220,220,220)';
          ctx.fillStyle = 'black';
          ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          ctx.restore();
        }
        ctx.fillText(winningNumber.toString(), 250 - ctx.measureText(winningNumber.toString()).width / 2, 250 + 10);
        ctx.restore();
      };
  
      const easeOut = (t: number, b: number, c: number, d: number): number => {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc
        + -3 * ts + 3 * t);
      };
  
  
      if(props.canSpin) spin();
  
      onMounted(() => {
        drawRouletteWheel();
      });
  
      watchEffect(() => {
    const betData = JSON.parse(sessionStorage.getItem('betResult') || '{}');
    const winningColor = betData.generatedColor;
    const winningNumber = betData.generatedNumber;
    rotateWheel(winningNumber, winningColor);
  });
  
      return {
        canvas,
        spin
      };
}