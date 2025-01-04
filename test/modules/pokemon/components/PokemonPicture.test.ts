import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import { mount } from '@vue/test-utils'

describe('<PokemonPicture />', () => {
  it('should render the component', () => {
    const pokemon = {
      id: '1',
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    }

    const wrapper = mount(PokemonPicture, {
      props: {
        isShowPicture: true,
        pokemon,
      },
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).contains(pokemon.id)
    expect(wrapper.find('.brightness-0').exists()).toBe(false)
  })

  it('should render the component with brightness', () => {
    const pokemon = {
      id: '1',
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    }

    const wrapper = mount(PokemonPicture, {
      props: {
        isShowPicture: false,
        pokemon,
      },
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).contains(pokemon.id)
    expect(wrapper.find('.brightness-0').exists()).toBe(true)
  })
})
