<template>
  <div
    class="flex justify-center items-center min-h-[60vh] p-6 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white"
  >
    <section
      class="relative bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-xl p-8 md:p-10 max-w-2xl w-full transition-transform duration-300 hover:scale-[1.02]"
    >
      <!-- Glow border effect -->
      <div
        class="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 opacity-20 blur-lg"
      ></div>

      <div class="relative z-10">
        <h1
          class="text-3xl md:text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
        >
          🎲 Game Rules
        </h1>

        <p class="text-base md:text-lg leading-relaxed text-gray-300 mb-4">
          You can place a bet on either a color, even or odd numbers of a given color, or a specific number and color.
        </p>

        <ul
          class="list-disc list-inside space-y-3 md:space-y-4 text-gray-200 text-base md:text-lg"
        >
          <li class="hover:text-emerald-400 transition-colors duration-200">
            If you do not hit your bet, you will lose the amount wagered.
          </li>
          <li class="hover:text-emerald-400 transition-colors duration-200">
            If you bet on a given color and hit, you will win half the amount of your bet.
          </li>
          <li class="hover:text-emerald-400 transition-colors duration-200">
            If you bet on the even or odd numbers of a given color and hit, you will win an amount equal to the bet.
          </li>
          <li class="hover:text-emerald-400 transition-colors duration-200">
            If you bet on a specific number and color and hit, you will win triple the amount of the bet.
          </li>
        </ul>

        <p class="text-base md:text-lg leading-relaxed text-gray-300 mt-6">
          🍀 <span class="text-emerald-400 font-semibold">Good luck</span> and play responsibly!
        </p>
      </div>
    </section>
  </div>
</template>

  <script>
  import { defineComponent} from 'vue';
 
  export default defineComponent({
    name: 'RouletteRulesSection',
  },
  
   
  
  
);
  </script>
