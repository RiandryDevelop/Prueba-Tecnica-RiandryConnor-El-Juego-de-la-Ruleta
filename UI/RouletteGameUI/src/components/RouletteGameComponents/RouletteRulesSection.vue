<template>
  <div class="flex to-indigo-500 p-4">
    <section class="bg-white rounded-lg shadow-lg p-6 md:p-8 min-h-fit p-4">
      <h1 class="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-indigo-700">Game Rules</h1>
      <p class="text-base md:text-lg leading-relaxed text-gray-700">
        You can place a bet on either a color, even or odd numbers of a given color, or a specific number and color.
      </p>
      <ul class="list-disc list-inside my-2 md:my-4 text-gray-700">
        <li>
          If you do not hit your bet, you will lose the amount wagered.
        </li>
        <li>
          If you bet on a given color and hit, you will win half the amount of your bet.
        </li>
        <li>
          If you bet on the even or odd numbers of a given color and hit, you will win an amount equal to the bet.
        </li>
        <li>
          If you bet on a specific number and color and hit, you will win triple the amount of the bet.
        </li>
      </ul>
      <p class="text-base md:text-lg leading-relaxed text-gray-700">
        Good luck and play responsibly!
      </p>
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
