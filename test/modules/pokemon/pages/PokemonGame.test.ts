import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue'
import { mount } from '@vue/test-utils'
import type { Mock } from 'vitest'
import { mockPokemons } from '../../../mock/mock-poke-data'

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}))
const pokemonsData = mockPokemons.map((pokemon) => ({
  id: pokemon.url.split('/').slice(-2)[0] ?? '0',
  name: pokemon.name,
  url: pokemon.url,
}))

describe('<PokemonGame />', () => {
  it('should return initial data pokemon game', async () => {
    ;(usePokemonGame as Mock).mockReturnValue({
      isLoading: true,
      isShowPicture: false,
      isWinner: false,
      pokemonOptions: [],
      rating: 0,
      pokemons: [],
      whatIsThePokemon: undefined,
      validatePokemonSelection: vi.fn(),
      nextPokemonOptions: vi.fn(),
    })

    const wrapper = mount(PokemonGame)

    expect(wrapper.get('h1').text()).toBe('Cargando Pokémon...')
    expect(wrapper.get('h1').classes()).toEqual([
      'text-4xl',
      'font-extrabold',
      'text-center',
      'mb-8',
      'text-white',
      'drop-shadow-lg',
    ])
  })

  it('should render <PokemonOptions/> and <PokemonPicture/>', async () => {
    ;(usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      isShowPicture: false,
      isWinner: false,
      whatIsThePokemon: pokemonsData[0],
      pokemonOptions: pokemonsData.slice(0, 4),
      rating: 0,
      pokemons: pokemonsData,
      validatePokemonSelection: vi.fn(),
      nextPokemonOptions: vi.fn(),
    })

    const wrapper = mount(PokemonGame)

    expect(wrapper.find('h1').text()).toBe('¿Quién es ese Pokémon?')
    expect(wrapper.find('img').attributes('src')).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsData[0].id}.svg`,
    )
    expect(wrapper.findAll('button').length).toBe(4)
  })

  it('should render winner game', async () => {
    ;(usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      isShowPicture: true,
      isWinner: true,
      whatIsThePokemon: pokemonsData[0],
      pokemonOptions: pokemonsData.slice(0, 4),
      rating: 0,
      pokemons: pokemonsData,
      validatePokemonSelection: vi.fn(),
      nextPokemonOptions: vi.fn(),
    })

    const wrapper = mount(PokemonGame)

    expect(wrapper.find('h1').text()).toBe('Es bulbasaur!')
    expect(wrapper.find('img').attributes('src')).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonsData[0].id}.svg`,
    )
    expect(wrapper.findAll('button').length).toBe(5)
    expect(wrapper.find('.bg-green-500.hover\\:bg-green-600').text()).toBe('Siguiente Pokémon')
  })

  it('should call nextPokemonOptions when click button', async () => {
    const nextPokemonOptions = vi.fn()
    ;(usePokemonGame as Mock).mockReturnValue({
      isLoading: false,
      isShowPicture: true,
      isWinner: true,
      whatIsThePokemon: pokemonsData[0],
      pokemonOptions: pokemonsData.slice(0, 4),
      rating: 0,
      pokemons: pokemonsData,
      validatePokemonSelection: vi.fn(),
      nextPokemonOptions,
    })

    const wrapper = mount(PokemonGame)

    await wrapper.find('.bg-green-500.hover\\:bg-green-600').trigger('click')

    expect(nextPokemonOptions).toHaveBeenCalled()
  })

  // ###
})
