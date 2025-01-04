<template>
  <div class="mt-8 text-center" id="result">
    <p v-if="isWinner" class="text-2xl font-bold text-white mb-6">¡Correcto!</p>
    <p v-else class="text-2xl font-bold text-red-300 mb-6">¡Incorrecto!</p>
    <button
      @click="handleNextPokemon"
      class="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full text-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
    >
      Siguiente Pokémon
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  handleNextPokemon: () => void
  isWinner: boolean
  pokemon: string
}>()
</script>
