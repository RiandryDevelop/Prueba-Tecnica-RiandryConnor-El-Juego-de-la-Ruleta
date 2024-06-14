/* __placeholder__ */
import { defineComponent, reactive } from 'vue';
import { FormLoginService, } from "../../composables/FormLoginService";
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'StartGame',
    setup() {
        const router = useRouter();
        const formData = reactive({
            name: '',
            balance: 0,
        });
        const { isFormComplete, submitForm, debounce } = FormLoginService(formData, router);
        return {
            isFormComplete,
            submitForm,
            formData,
            debounce
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-lg font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (...[$event]) => {
                __VLS_ctx.debounce(() => { __VLS_ctx.submitForm(); }, 500);
                // @ts-ignore
                [debounce, submitForm,];
            } }, ...{ class: ("max-w-sm mx-auto") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-5") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("name"), ...{ class: ("block mb-2 text-sm font-medium text-gray-900 dark:text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("text"), id: ("name"), value: ((__VLS_ctx.formData.name)), required: (true), ...{ class: ("block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500") }, });
    // @ts-ignore
    [formData,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-5") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("number"), ...{ class: ("block mb-2 text-sm font-medium text-gray-900 dark:text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("number"), id: ("number"), required: (true), ...{ class: ("block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500") }, });
    (__VLS_ctx.formData.balance);
    // @ts-ignore
    [formData,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), disabled: ((!__VLS_ctx.isFormComplete)), ...{ class: ("px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700") }, });
    // @ts-ignore
    [isFormComplete,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['text-lg'];
        __VLS_styleScopedClasses['font-semibold'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['max-w-sm'];
        __VLS_styleScopedClasses['mx-auto'];
        __VLS_styleScopedClasses['mb-5'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-900'];
        __VLS_styleScopedClasses['dark:text-white'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['text-gray-900'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['bg-gray-50'];
        __VLS_styleScopedClasses['text-base'];
        __VLS_styleScopedClasses['focus:ring-blue-500'];
        __VLS_styleScopedClasses['focus:border-blue-500'];
        __VLS_styleScopedClasses['dark:bg-gray-700'];
        __VLS_styleScopedClasses['dark:border-gray-600'];
        __VLS_styleScopedClasses['dark:placeholder-gray-400'];
        __VLS_styleScopedClasses['dark:text-white'];
        __VLS_styleScopedClasses['dark:focus:ring-blue-500'];
        __VLS_styleScopedClasses['dark:focus:border-blue-500'];
        __VLS_styleScopedClasses['mb-5'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-900'];
        __VLS_styleScopedClasses['dark:text-white'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['p-4'];
        __VLS_styleScopedClasses['text-gray-900'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['bg-gray-50'];
        __VLS_styleScopedClasses['text-base'];
        __VLS_styleScopedClasses['focus:ring-blue-500'];
        __VLS_styleScopedClasses['focus:border-blue-500'];
        __VLS_styleScopedClasses['dark:bg-gray-700'];
        __VLS_styleScopedClasses['dark:border-gray-600'];
        __VLS_styleScopedClasses['dark:placeholder-gray-400'];
        __VLS_styleScopedClasses['dark:text-white'];
        __VLS_styleScopedClasses['dark:focus:ring-blue-500'];
        __VLS_styleScopedClasses['dark:focus:border-blue-500'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['bg-blue-500'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['rounded'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['hover:bg-blue-700'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = 'StartGame';
    const __VLS_internalComponent = (await import('./FormLogin.vue')).default;
}
