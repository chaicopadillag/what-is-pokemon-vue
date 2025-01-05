import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'
import type { PokemonGame } from '@/modules/pokemon/interfaces/pokemon-game.interface'
import { mount } from '@vue/test-utils'

describe('<PokemonOptions />', () => {
  const pokemons: PokemonGame[] = [
    {
      name: 'bulbasaur',
      id: '1',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      id: '2',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      id: '3',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
    {
      name: 'charmander',
      id: '4',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
  ]
  it('Debe de renderizar los 4 option en botones', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        isRevelation: false,
        pokemons,
        selectedPokemon: '1',
      },
    })

    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(4)
    expect(buttons[0].text()).toBe('bulbasaur')
    expect(buttons[1].text()).toBe('ivysaur')
    expect(buttons[2].text()).toBe('venusaur')
    expect(buttons[3].text()).toBe('charmander')
  })

  it('Debe de emitir evento selection con sus respectivos valores al hacer click', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        isRevelation: false,
        pokemons,
        selectedPokemon: '1',
      },
    })

    await wrapper.find('button:nth-child(1)').trigger('click')
    await wrapper.find('button:nth-child(2)').trigger('click')
    await wrapper.find('button:nth-child(3)').trigger('click')
    await wrapper.find('button:nth-child(4)').trigger('click')

    expect(wrapper.emitted('onPokemonSelect')).toHaveLength(4)
    expect(wrapper.emitted('onPokemonSelect')[0]).toEqual([pokemons[0]])
    expect(wrapper.emitted('onPokemonSelect')[1]).toEqual([pokemons[1]])
    expect(wrapper.emitted('onPokemonSelect')[2]).toEqual([pokemons[2]])
    expect(wrapper.emitted('onPokemonSelect')[3]).toEqual([pokemons[3]])
  })

  it('Debe de bloquear todos los botones', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        isRevelation: true,
        pokemons,
        selectedPokemon: '',
      },
    })

    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(4)
    buttons.forEach((button) => {
      expect(Object.keys(button.attributes())).contains('disabled')
    })
  })

  it('Debe de mostrar el pokemon seleccionado y si acerto', async () => {
    const selectedPokemon = '2'
    const wrapper = mount(PokemonOptions, {
      props: {
        isRevelation: true,
        pokemons,
        selectedPokemon,
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(4)

    buttons.forEach((button, index) => {
      if (pokemons[index].id === selectedPokemon) {
        expect(button.classes()).toContain('winner')
      } else {
        expect(button.classes()).toContain('loser')
      }
    })
  })
})
