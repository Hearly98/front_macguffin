/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily:{
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'serif']
      },
      colors: {
        'review': '#2B2629'
      }
    },
  },
  plugins: [],
};
