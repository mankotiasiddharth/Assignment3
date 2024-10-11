/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./public/views/**/*.html`], // all .html files
  daisyui: {
    themes: ['cupcake'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

