/* __placeholder__ */
import { defineComponent, ref, } from 'vue';
import { SpinnerRouletteService } from "../../composables/SpinnerRouletteService";
export default defineComponent({
    name: 'SpinnerRoulette',
    setup() {
        const options = ref([
            14, 5, 29, 9, 20, 1, 36, 18, 33, 22, 7, 30, 3, 25, 12, 8, 31, 17, 11, 26, 15, 2, 16, 35, 28, 19, 24, 0, 34, 10, 6, 21, 13, 27, 4, 23, 32
        ]);
        const startAngle = ref(0);
        const arc = Math.PI / (37 / 2);
        let spinTimeout = null;
        let spinAngleStart = 0;
        let spinTime = 0;
        let spinTimeTotal = 0;
        const canvas_s = ref(null);
        let ctx = null;
        const { canvas, spin } = SpinnerRouletteService(options, startAngle, arc, spinTimeout, spinAngleStart, spinTime, spinTimeTotal, canvas_s, ctx);
        return {
            canvas,
            spin
        };
    }
});
;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ ref: ("canvas"), width: ("800"), height: ("800"), ...{ class: ("w-full max-w-full h-auto") }, });
    // @ts-ignore
    (__VLS_ctx.canvas);
    // @ts-ignore
    [canvas,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-full'];
        __VLS_styleScopedClasses['h-auto'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = 'SpinnerRoulette';
    const __VLS_internalComponent = (await import('./SpinnerRoulette.vue')).default;
}
