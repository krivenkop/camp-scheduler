import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  // where to look for classnames
  include: [
    'src/**/*.{svelte,ts,js}',
  ],
  presets: [
    presetWind3(), // basic utilities
  ],
  theme: {
    fontFamily: {
      sans: 'Roboto, sans-serif',
      condensed: 'Roboto Condensed, sans-serif',
    },
    colors: {
      gray: {
        inactive: '#EEF0F4',
        dayweek: '#B4B9C1',
      },
      accent: {
        yellow: '#FED260',
        blue: '#275CBD',
      },
      event: {
        bg: {
          gray: '#EDEDED',
          purple: '#F1E9F5',
          blue: '#F0F3F9',
          yellow: '#FCF3E5',
          green: '#EBF8EC',
        },
      },
      text: {
        black: '#2F3032',
        secondary: '#7B7C7E',
        
      }
    },
  },
})
