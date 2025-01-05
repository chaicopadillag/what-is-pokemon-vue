<template>
  <main
    class="h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4"
  >
    <a
      class="fixed top-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 inline-block mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
      {{ rating }}
    </a>
    <div v-if="isLoading" class="w-full max-w-md">
      <h1 class="text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg">
        Cargando Pokémon...
      </h1>
    </div>

    <div v-else class="w-full max-w-md">
      <h1
        v-if="!isShowPicture"
        class="text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg"
      >
        ¿Quién es ese Pokémon?
      </h1>
      <h1
        v-if="isShowPicture"
        class="text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg capitalize"
      >
        Es {{ whatIsThePokemon.name }}!
      </h1>
      <PokemonPicture :pokemon="whatIsThePokemon" :is-show-picture="isShowPicture" />
      <PokemonOptions
        :pokemons="pokemonOptions"
        v-on:on-pokemon-select="validatePokemonSelection"
        :is-revelation="isShowPicture"
        :selected-pokemon="whatIsThePokemon.id"
      />

      <NextPokemon
        v-if="isShowPicture"
        :is-winner="isWinner"
        :handle-next-pokemon="nextPokemonOptions"
        :pokemon="whatIsThePokemon.name"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import NextPokemon from '../components/NextPokemon.vue'
import PokemonOptions from '../components/PokemonOptions.vue'
import PokemonPicture from '../components/PokemonPicture.vue'
import { usePokemonGame } from '../composables/usePokemonGame'

const {
  isShowPicture,
  isLoading,
  pokemonOptions,
  whatIsThePokemon,
  isWinner,
  rating,
  nextPokemonOptions,
  validatePokemonSelection,
} = usePokemonGame()
</script>
