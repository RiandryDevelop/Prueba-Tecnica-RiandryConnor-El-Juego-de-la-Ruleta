import { defineComponent } from 'vue';
import RouletteForm from './RouletteForm.vue';
import SpinnerRoulette from './SpinnerRoulette.vue';
import RouletteRulesSection from './RouletteRulesSection.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'GameScreen',
    components: {
        RouletteForm,
        SpinnerRoulette,
        RouletteRulesSection
    },
    setup() {
        const router = useRouter();
        const logout = () => {
            router.push("/");
            sessionStorage.clear();
        };
        return {
            logout
        };
    },
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-wrap justify-between items-center mx-auto max-w-screen-xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ ...{ class: ("flex items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("../../assets/roulette-icon.svg"), ...{ class: ("mr-3 h-6 sm:h-9") }, alt: ("Casino Roulette Logo"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("self-center text-xl font-semibold whitespace-nowrap dark:text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center lg:order-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.logout();
                // @ts-ignore
                [logout,];
            } }, ...{ class: ("text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("custom-background ") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-wrap justify-between items-center mx-auto max-w-screen-xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8") }, });
    const __VLS_0 = {}.RouletteRulesSection;
    ({}.RouletteRulesSection);
    __VLS_components.RouletteRulesSection;
    // @ts-ignore
    [RouletteRulesSection,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({}));
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    const __VLS_6 = {}.SpinnerRoulette;
    ({}.SpinnerRoulette);
    __VLS_components.SpinnerRoulette;
    // @ts-ignore
    [SpinnerRoulette,];
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("md:mr-8") }, }));
    const __VLS_8 = __VLS_7({ ...{ class: ("md:mr-8") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({ ...{ class: ("md:mr-8") }, }));
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    const __VLS_12 = {}.RouletteForm;
    ({}.RouletteForm);
    __VLS_components.RouletteForm;
    // @ts-ignore
    [RouletteForm,];
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({}));
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("m-5") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-center text-gray-600") }, });
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['border-gray-200'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['lg:px-6'];
        __VLS_styleScopedClasses['py-2.5'];
        __VLS_styleScopedClasses['dark:bg-gray-800'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-wrap'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['mx-auto'];
        __VLS_styleScopedClasses['max-w-screen-xl'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['mr-3'];
        __VLS_styleScopedClasses['h-6'];
        __VLS_styleScopedClasses['sm:h-9'];
        __VLS_styleScopedClasses['self-center'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['whitespace-nowrap'];
        __VLS_styleScopedClasses['dark:text-white'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['lg:order-2'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['bg-blue-700'];
        __VLS_styleScopedClasses['hover:bg-blue-800'];
        __VLS_styleScopedClasses['focus:ring-4'];
        __VLS_styleScopedClasses['focus:ring-blue-300'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['lg:px-5'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['lg:py-2.5'];
        __VLS_styleScopedClasses['mr-2'];
        __VLS_styleScopedClasses['dark:bg-blue-600'];
        __VLS_styleScopedClasses['dark:hover:bg-blue-700'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['dark:focus:ring-blue-800'];
        __VLS_styleScopedClasses['custom-background'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-wrap'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['mx-auto'];
        __VLS_styleScopedClasses['max-w-screen-xl'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['md:flex-row'];
        __VLS_styleScopedClasses['space-y-4'];
        __VLS_styleScopedClasses['md:space-y-0'];
        __VLS_styleScopedClasses['md:space-x-8'];
        __VLS_styleScopedClasses['md:mr-8'];
        __VLS_styleScopedClasses['m-5'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['text-gray-600'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {
        RouletteForm,
        SpinnerRoulette,
        RouletteRulesSection
    };
    const __VLS_name = 'GameScreen';
    const __VLS_internalComponent = (await import('./RouletteAPP.vue')).default;
}
