const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,ts,json}'],
  mode: "jit",
  theme: {
    fontFamily: {
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'label': '#555555',
        'input': '#C9C9C9',
        'placeholder': '#B3B3B3',
        'primary': '#639605',
        'modal_cancel': '#B3B3B3',
        'title': '#333333',
        'subtitle': "#777777",
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }
  },
  variants: {
    backgroundColor: ['hover', 'focus'],
    borderColor: ['focus', 'hover'],
    animation: ['hover', 'focus']
  }
}