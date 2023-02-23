const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ theme }) => {}, {
  theme: {
    extend: {
      colors: {
        transparent: 'transparent'
      }
    }
  }
})
