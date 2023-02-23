const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './stories/**/*.mdx',
    '../../packages/ethanmick-lotus/dist/**/*.js|mjs'
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue
      }
    }
  },
  plugins: []
}
