/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./views/**/*.{ejs,js}",
    "./partials/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'helvetica_now_display': ['Helvetica Now Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

