<template>
  <div class="relative mb-8 w-96 h-96">
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`"
      alt="Who's that Pokémon?"
      :class="`inset-0 w-full h-full object-contain duration-300 ${
        isShowPicture ? '' : 'filter brightness-0 contrast-200 animate-pulse'
      }`"
    />
  </div>
</template>

<script setup lang="ts">
import type { PokemonGame } from '../interfaces/pokemon-game.interface'

defineProps<{
  pokemon: PokemonGame
  isShowPicture: boolean
}>()
</script>
