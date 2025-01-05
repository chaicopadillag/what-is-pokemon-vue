import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import { flushPromises } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'
import { mockPokemons } from '../../../mock/mock-poke-data'
import { setupTest } from '../../../utils/setupTest'

const mockPokeApi = new MockAdapter(pokemonApi)

mockPokeApi.onGet('/pokemon?limit=151&offset=0').reply(200, { results: mockPokemons })

describe('usePokemonGame', () => {
  it('should return initial data pokemon game', async () => {
    const { result } = setupTest(usePokemonGame)

    expect(result).toBeDefined()
    expect(result.isLoading.value).toBeTruthy()
    expect(result.isShowPicture.value).toBeFalsy()
    expect(result.isWinner.value).toBeFalsy()
    expect(result.pokemonOptions.value).toEqual([])
    expect(result.rating.value).toBe(0)
    expect(result.pokemons.value).toEqual([])
    expect(result.whatIsThePokemon.value).toEqual(undefined)

    await flushPromises()

    expect(result.isLoading.value).toBeFalsy()
    expect(result.pokemons.value.length).toEqual(mockPokemons.length)
    expect(result.pokemonOptions.value.length).toEqual(4)
    expect(result.whatIsThePokemon.value).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        url: expect.any(String),
      }),
    )
  })
})
