/** @type {import('tailwindcss').Config} */
module.exports = {

  daisyui: {
    themes: ["luxury"]
  },

  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")]
};