/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'space': ['"Space Grotesk"']
      },
      colors: {
        'primary': '#28292B',
        'lighter': '#444445',
        'lightest': '#69696A'
      }
    },
  },
  plugins: [],
}

