<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
    <div class="bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md text-center">
      <h2 class="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
        🎰 Start Roulette Game
      </h2>

      <form @submit.prevent="debounce(()=>{submitForm()}, 500)" class="space-y-6">
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-300 text-left"
          >
            Username
          </label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            placeholder="Enter your nickname"
            class="block w-full p-4 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-200"
          />
        </div>

        <div>
          <label
            for="number"
            class="block mb-2 text-sm font-medium text-gray-300 text-left"
          >
            Balance
          </label>
          <input
            type="number"
            id="number"
            v-model="formData.balance"
            required
            placeholder="Enter your balance"
            class="block w-full p-4 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
          />
        </div>

        <button
          type="submit"
          :disabled="!isFormComplete"
          class="relative w-full py-3 mt-2 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 hover:scale-[1.03] transition-transform shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span class="drop-shadow-md">Start Game</span>
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 blur transition-opacity duration-300 hover:opacity-30"
          ></div>
        </button>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive} from 'vue';
import { IFormData } from "../../interfaces/IRoulette";
import {FormLoginService, } from "../../composables/FormLoginService"
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'StartGame',
  setup() {
    const router = useRouter();
    const formData = reactive<IFormData>({
      name: '',
      balance: 0,
    });
    const {isFormComplete, submitForm, debounce} = FormLoginService(formData, router);

    return {
      isFormComplete,
      submitForm,
      formData, 
      debounce
    }
  },
});
</script>

