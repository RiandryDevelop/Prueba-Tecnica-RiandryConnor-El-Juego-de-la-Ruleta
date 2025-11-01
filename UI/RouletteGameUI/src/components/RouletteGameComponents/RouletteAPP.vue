<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">
    <!-- 🔹 HEADER -->
    <header class="border-b border-gray-800/60 backdrop-blur-md bg-gray-900/80 shadow-lg">
      <nav class="px-6 lg:px-10 py-4">
        <div class="flex justify-between items-center max-w-screen-xl mx-auto">
          <a class="flex items-center space-x-3 select-none">
            <img src="../../assets/roulette-icon.svg" class="h-8 sm:h-10 drop-shadow-lg" alt="Casino Roulette Logo" />
            <span class="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 tracking-wide">
              Roulette Game
            </span>
          </a>
          <div class="flex items-center space-x-3">
            <a
              @click.prevent="logout()"
              class="relative overflow-hidden px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-red-500 via-pink-600 to-purple-700 hover:scale-105 transition-transform duration-200 shadow-md shadow-red-500/40 focus:ring-2 focus:ring-red-400 focus:outline-none"
            >
              <span class="relative z-10">Get out</span>
              <span
                class="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 opacity-0 blur transition-opacity duration-300 hover:opacity-30"
              ></span>
            </a>
          </div>
        </div>
      </nav>
    </header>

    <!-- 🔹 MAIN -->
    <main class="flex-grow py-10">
      <div class="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10">
        <RouletteRulesSection class="md:w-1/3 animate-fadeInUp" />
        <SpinnerRoulette class="md:w-1/3 animate-fadeInUp delay-100" />
        <RouletteForm class="md:w-1/2 animate-fadeInUp delay-200" />
      </div>
    </main>

    <!-- 🔹 FOOTER -->
    <footer class="mt-auto py-6 border-t border-gray-800 text-center bg-gray-900/60 backdrop-blur-md">
      <p class="text-sm text-gray-400 tracking-wide">
        © <span class="text-emerald-400 font-medium">Riandry Develop</span>. All Rights Reserved.
      </p>
    </footer>
  </div>
</template>



<script lang="ts">
import { defineComponent} from 'vue';
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
    }
},
  
});
</script>
