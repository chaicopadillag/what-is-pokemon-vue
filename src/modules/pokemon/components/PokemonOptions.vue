<template>
  <div class="grid grid-cols-2 gap-4">
    <button
      v-for="(pokemon, index) in pokemons"
      @click="handlePokemonSelection(pokemon)"
      :key="index"
      :class="[
        'bg-yellow-500 bg-opacity-70 hover:bg-opacity-90 text-gray-700 py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 capitalize',
        {
          winner: isRevelation && pokemon.id === selectedPokemon,
          loser: isRevelation && pokemon.id !== selectedPokemon,
        },
      ]"
      :disabled="isRevelation"
    >
      {{ pokemon.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PokemonGame } from '../interfaces/pokemon-game.interface'

defineProps<{
  pokemons: PokemonGame[]
  isRevelation: boolean
  selectedPokemon: string
}>()

const emit = defineEmits({
  onPokemonSelect: (pokemon: PokemonGame) => pokemon,
})

const handlePokemonSelection = (pokemon: PokemonGame) => {
  emit('onPokemonSelect', pokemon)
}
</script>

<style scoped>
.winner {
  @apply cursor-not-allowed bg-green-200 text-gray-500;
}
.loser {
  @apply cursor-not-allowed bg-red-200 text-gray-500;
}
</style>
