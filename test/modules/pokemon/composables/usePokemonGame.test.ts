import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import { flushPromises } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'
import confetti from 'canvas-confetti'
import { mockPokemons } from '../../../mock/mock-poke-data'
import { setupTest } from '../../../utils/setupTest'

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}))

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

  it('should selected what is the pokemon', async () => {
    const { result } = setupTest(usePokemonGame)

    await flushPromises()

    const whatIsThePokemon = result.whatIsThePokemon.value

    expect(whatIsThePokemon).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        url: expect.any(String),
      }),
    )
  })

  it('should return ramdom pokemons diferents', async () => {
    const { result } = setupTest(usePokemonGame)

    await flushPromises()

    const pokemonOptions = result.pokemonOptions.value

    expect(pokemonOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          url: expect.any(String),
        }),
      ]),
    )

    result.nextPokemonOptions()

    result.pokemonOptions.value.forEach((pokemon) => {
      expect(pokemonOptions).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: pokemon.id,
            name: pokemon.name,
            url: pokemon.url,
          }),
        ]),
      )
    })

    expect(result.pokemonOptions.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: result.whatIsThePokemon.value.id,
          name: result.whatIsThePokemon.value.name,
          url: result.whatIsThePokemon.value.url,
        }),
      ]),
    )
  })

  it('should validate not winner pokemon', async () => {
    const { result } = setupTest(usePokemonGame)

    await flushPromises()

    const whatIsThePokemon = result.whatIsThePokemon.value

    result.validatePokemonSelection(whatIsThePokemon)

    expect(result.isWinner.value).toBeTruthy()
    expect(result.rating.value).toBe(10)
    expect(result.isShowPicture.value).toBeTruthy()

    result.validatePokemonSelection({ ...whatIsThePokemon, id: '0' })

    expect(result.rating.value).toBe(10)
    expect(result.isShowPicture.value).toBeTruthy()
  })

  it('should validate pokemon winner selection and sum rating', async () => {
    const { result } = setupTest(usePokemonGame)

    await flushPromises()

    const whatIsThePokemon = result.whatIsThePokemon.value

    result.validatePokemonSelection(whatIsThePokemon)

    expect(result.isWinner.value).toBeTruthy()
    expect(result.rating.value).toBe(10)
    expect(result.isShowPicture.value).toBeTruthy()

    result.validatePokemonSelection(whatIsThePokemon)

    expect(result.rating.value).toBe(20)
    expect(result.isShowPicture.value).toBeTruthy()

    result.validatePokemonSelection(whatIsThePokemon)
    expect(result.rating.value).toBe(30)
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  })
})
