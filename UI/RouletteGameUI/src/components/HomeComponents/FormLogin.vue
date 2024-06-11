<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Start Game</h2>
    <form @submit.prevent="submitForm" class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName:</label>
        <input type="text" id="name" v-model="formData.name" required class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="mb-5">
        <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Introduce your balance:</label>
        <input type="number" id="number" v-model="formData.balance" required class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <button type="submit" :disabled="!isFormComplete" class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700">Send</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const apiUrl = import.meta.env.VITE_API_URL;

interface FormData {
  name: string;
  balance: number;
}

export default defineComponent({
  name: 'StartGame',
  setup() {
    const router = useRouter();
    const formData = reactive<FormData>({
      name: '',
      balance: 0,
    });

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
        console.log('Server response:', data);
        router.push('/roulette');
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    return {
      formData,
      submitForm,
      isFormComplete,
    };
  },
});
</script>

