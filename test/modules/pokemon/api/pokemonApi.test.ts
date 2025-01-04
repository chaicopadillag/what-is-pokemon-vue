import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'

describe('Pokemon API', () => {
  test('API Config match baseurl pokemon api', async () => {
    const baseUrl = 'https://pokeapi.co/api/v2'

    expect(baseUrl).toEqual(pokemonApi.defaults.baseURL)
  })
})
