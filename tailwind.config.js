import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'pokemon-stats': 'max-content 3ch 1fr',
        'pokemon-moves': 'repeat(auto-fit, minmax(172px, 1fr))'
      },
      'borderWidth': {
        3: '3px'
      },
      screens: {
        xs: '475px'
      },
      colors: {
        pokemon: '#FB1B1B',
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
      },
      animation: {
        loader: 'loader 2s linear infinite'
      },
      keyframes: {
        loader: {
          '0%': {
            left: '0',
            transform: 'translateX(-100%)',
          },
          '100%': {
            left: '100%',
            transform: 'translateX(0%)',
          }
        }
      }
    }
  },
  plugins: [animations],
}

