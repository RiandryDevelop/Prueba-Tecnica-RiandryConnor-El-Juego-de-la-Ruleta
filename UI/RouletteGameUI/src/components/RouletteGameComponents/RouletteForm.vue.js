/* __placeholder__ */
import { defineComponent, ref, computed, onMounted } from 'vue';
import { RouletteFormService } from "../../composables/RouletteFormService";
import { useStore } from '../../store/store';
export default defineComponent({
    name: 'RouletteForm',
    setup() {
        const store = useStore();
        const grid_s = ref([
            [0, 1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29],
            [30, 31, 32, 33, 34, 35],
            [36, "EVEN", "ODD", "BLACK", "RED"],
        ]);
        const selected_s = ref([]);
        const betAmount_s = ref(0);
        const bet_s = ref({ number: null, type: '', color: '' });
        const isReady = computed(() => {
            return (bet.value.color &&
                ((bet.value.number !== null && bet.value.number >= 0 && !bet.value.type) || (!bet.value.number && bet.value.type)) || bet.value.color);
        });
        onMounted(async () => {
            store.loadBalance();
        });
        const { grid, selected, betAmount, bet, putMoney, updateCellStyle, continueGame, saveBalance, } = RouletteFormService(selected_s, betAmount_s, bet_s, grid_s, store);
        return {
            grid,
            selected,
            betAmount,
            bet,
            isReady,
            putMoney,
            updateCellStyle,
            continueGame,
            saveBalance,
            store
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("game"), ...{ class: ("flex flex-col items-center  min-h-screen p-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({ ...{ class: ("table-auto bg-white w-full max-w-full md:max-w-2xl rounded-lg shadow-lg border-separate border border-slate-400") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [row] of __VLS_getVForSourceType((__VLS_ctx.grid))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((row[0])), ...{ class: ("flex") }, });
        for (const [cell] of __VLS_getVForSourceType((row))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ onClick: (...[$event]) => {
                        __VLS_ctx.putMoney(cell);
                        // @ts-ignore
                        [grid, putMoney,];
                    } }, key: ((cell)), id: ((cell.toString())), ...{ class: ("border border-slate-300 py-3 px-4 text-lg md:text-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300 flex-1") }, });
            (cell);
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ ...{ class: ("flex ") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ id: ("money"), colspan: ("3"), ...{ class: ("text-center py-2 flex-1") }, ...{ class: (({ 'text-green-600': __VLS_ctx.store.balance > 0, 'text-red-600': __VLS_ctx.store.balance <= 0 })) }, });
    __VLS_styleScopedClasses = ({ 'text-green-600': store.balance > 0, 'text-red-600': store.balance <= 0 });
    (__VLS_ctx.store.username);
    (__VLS_ctx.store.balance <= 0 ? "YOU ARE BROKE" : __VLS_ctx.store.balance);
    // @ts-ignore
    [store, store, store, store, store,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ id: ("bet"), colspan: ("3"), ...{ class: ("py-2 flex-1") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("bet"), ...{ class: ("block mb-1 text-sm") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("number"), name: ("bet"), id: ("betInput"), max: ((__VLS_ctx.store.balance)), ...{ class: ("block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500") }, });
    (__VLS_ctx.betAmount);
    // @ts-ignore
    [store, betAmount,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ colspan: ("3"), ...{ class: ("py-2 flex-1 flex justify-between") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.continueGame();
                // @ts-ignore
                [continueGame,];
            } }, disabled: ((!__VLS_ctx.isReady)), ...{ class: ("px-3 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 mr-2") }, });
    // @ts-ignore
    [isReady,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.saveBalance();
                // @ts-ignore
                [saveBalance,];
            } }, ...{ class: ("px-3 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-700") }, });
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['min-h-screen'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['table-auto'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-full'];
        __VLS_styleScopedClasses['md:max-w-2xl'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-lg'];
        __VLS_styleScopedClasses['border-separate'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-slate-400'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-slate-300'];
        __VLS_styleScopedClasses['py-3'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['md:text-lg'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['hover:bg-gray-200'];
        __VLS_styleScopedClasses['transition-colors'];
        __VLS_styleScopedClasses['duration-300'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:border-blue-500'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['bg-blue-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['hover:bg-blue-700'];
        __VLS_styleScopedClasses['mr-2'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['bg-green-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['hover:bg-green-700'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = 'RouletteForm';
    const __VLS_internalComponent = (await import('./RouletteForm.vue')).default;
}
