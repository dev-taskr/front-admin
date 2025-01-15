/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Usa la clase 'dark' para habilitar el modo oscuro
  content: ["./index.html",'./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
