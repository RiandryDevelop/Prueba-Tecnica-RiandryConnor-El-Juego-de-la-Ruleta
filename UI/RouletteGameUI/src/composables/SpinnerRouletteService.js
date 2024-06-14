import { onMounted, watchEffect } from 'vue';
import { useStore } from '../store/store';
export const SpinnerRouletteService = (options, startAngle, arc, spinTimeout, spinAngleStart, spinTime, spinTimeTotal, canvas, ctx) => {
    const store = useStore();
    const byte2Hex = (n) => {
        const nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
    };
    const RGB2Color = (r, g, b) => {
        return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    };
    const getColor = (item, maxitem) => {
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
        if (!canvas.value)
            return;
        const outsideRadius = 400; // Increase size for larger wheel
        const textRadius = 350; // Adjust text radius for larger text
        const insideRadius = 300; // Adjust inside radius accordingly
        ctx = canvas.value.getContext('2d');
        if (!ctx)
            return;
        ctx.clearRect(0, 0, 800, 800); // Clear larger canvas
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.font = 'bold 24px Helvetica, Arial'; // Increase font size
        for (let i = 0; i < options.value.length; i++) {
            const angle = startAngle.value + i * arc;
            ctx.fillStyle = getColor(i, options.value.length);
            ctx.beginPath();
            ctx.arc(400, 400, outsideRadius, angle, angle + arc, false); // Adjust coordinates for larger wheel
            ctx.arc(400, 400, insideRadius, angle + arc, angle, true); // Adjust coordinates for larger wheel
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'rgb(220,220,220)';
            ctx.fillStyle = 'black';
            ctx.translate(400 + Math.cos(angle + arc / 2) * textRadius, 400 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = options.value[i].toString();
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
    };
    const spin = async () => {
        if (!store.canSpin)
            return;
        try {
            const betData = JSON.parse(sessionStorage.getItem('betResult') || '{}');
            const winningColor = betData.generatedColor;
            const winningNumber = betData.generatedNumber;
            spinAngleStart = Math.random() * 10 + 10;
            spinTime = 0;
            spinTimeTotal = (Math.random() * 3 + 4) * 1000;
            rotateWheel(winningNumber, winningColor);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const rotateWheel = (winningNumber, winningColor) => {
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
    const stopRotateWheel = (winningNumber = 100, winningColor = "white") => {
        if (spinTimeout) {
            clearTimeout(spinTimeout);
        }
        if (!ctx)
            return;
        ctx.save();
        ctx.font = 'bold 56px Helvetica, Arial';
        if (!canvas.value)
            return;
        const outsideRadius = 400;
        const textRadius = 350;
        const insideRadius = 300;
        ctx = canvas.value.getContext('2d');
        if (!ctx)
            return;
        ctx.clearRect(0, 0, 800, 800);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.font = 'bold 124px Helvetica, Arial';
        for (let i = 0; i < options.value.length; i++) {
            const angle = startAngle.value + i * arc;
            ctx.fillStyle = winningColor || "white";
            ctx.beginPath();
            ctx.arc(400, 400, outsideRadius, angle, angle + arc, false);
            ctx.arc(400, 400, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'rgb(220,220,220)';
            ctx.fillStyle = 'black';
            ctx.translate(400 + Math.cos(angle + arc / 2) * textRadius, 400 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            ctx.restore();
        }
        ctx.fillText(winningNumber.toString(), 400 - ctx.measureText(winningNumber.toString()).width / 2, 400 + 10);
        ctx.restore();
    };
    const easeOut = (t, b, c, d) => {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    };
    if (store.canSpin)
        spin();
    onMounted(() => {
        drawRouletteWheel();
    });
    watchEffect(() => {
        const betData = JSON.parse(sessionStorage.getItem('betResult') || '{}');
        const winningColor = betData.generatedColor;
        const winningNumber = betData.generatedNumber;
        rotateWheel(winningNumber, winningColor);
        if (store.canSpin) {
            spin();
        }
        setTimeout(() => {
            store.canSpin = false;
        }, 1000);
    });
    return {
        canvas,
        spin,
        drawRouletteWheel
    };
};
