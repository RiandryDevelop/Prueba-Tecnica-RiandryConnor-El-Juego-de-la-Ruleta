import {  computed } from 'vue';
import {IFormData} from "../interfaces/IRoulette"
import createDebounce from '../helpers/debounce';
import { Router } from 'vue-router';

const apiUrl = import.meta.env.VITE_API_URL_PROD;

export  const FormLoginService = (formData:IFormData, router: string[] | Router) =>{

    const isFormComplete = computed(() => {
    return formData.name !== '' && formData.balance > 0;    
    });

    const submitForm = async () => {
    try {
        sessionStorage.setItem('userData', JSON.stringify(formData));
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
        const response = await fetch(`${apiUrl}/api/Roulette/initialize`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
        'Content-Type': 'application/json',
        },
});

        const data = await response.json();
        sessionStorage.setItem('userData', JSON.stringify(data));

        router.push("/roulette");
        } catch (error) {
        console.error('Error sending data:', error);
        }
};

return {
isFormComplete,
submitForm,
debounce: createDebounce(),
}
}
