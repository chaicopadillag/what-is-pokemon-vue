import { computed, onMounted, ref } from 'vue'
import { pokemonApi } from '../api/pokemonApi'
import { confettiRatingCompleted, confettiWinner } from '../helpers/confetti.helper'
import type { PokemonListResponse } from '../interfaces/pokemon-api.interface'
import type { GameStatus, PokemonGame } from '../interfaces/pokemon-game.interface'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>('playing')
  const pokemons = ref<PokemonGame[]>([])
  const isLoading = computed(() => pokemons.value.length === 0)
  const isShowPicture = computed(() => gameStatus.value !== 'playing')
  const isWinner = computed(() => gameStatus.value === 'won')
  const pokemonOptions = ref<PokemonGame[]>([])
  const currentOffset = ref(0)
  const optionsSize = 4
  const rating = ref(0)

  const setGameStatus = (status: GameStatus) => (gameStatus.value = status)

  const whatIsThePokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length)
    return pokemonOptions.value[randomIndex]
  })

  const getPokemons = async (): Promise<PokemonGame[]> => {
    const { data } = await pokemonApi.get<PokemonListResponse>('/pokemon?limit=151&offset=0')

    const pokemonList = data.results.map((pokemon) => ({
      id: pokemon.url.split('/').slice(-2)[0] ?? '0',
      name: pokemon.name,
      url: pokemon.url,
    }))

    return pokemonList.sort(() => Math.random() - 0.5)
  }

  const nextPokemonOptions = () => {
    if (currentOffset.value >= pokemons.value.length) {
      currentOffset.value = 0
    }

    pokemonOptions.value = pokemons.value.slice(
      currentOffset.value,
      optionsSize + currentOffset.value,
    )
    currentOffset.value += optionsSize
    setGameStatus('playing')
  }

  const validatePokemonSelection = (pokemon: PokemonGame) => {
    const correctPokemon = whatIsThePokemon.value.id === pokemon.id
    if (correctPokemon) {
      setGameStatus('won')
      rating.value += 10

      if (rating.value === 100) {
        confettiRatingCompleted()
      } else {
        if (rating.value > 100) rating.value = 10
        confettiWinner()
      }
    } else {
      setGameStatus('lost')
    }
  }

  onMounted(async () => {
    pokemons.value = await getPokemons()
    nextPokemonOptions()
  })

  return {
    isLoading,
    rating,
    isShowPicture,
    pokemonOptions,
    pokemons,
    whatIsThePokemon,
    isWinner,
    validatePokemonSelection,
    nextPokemonOptions,
  }
}
