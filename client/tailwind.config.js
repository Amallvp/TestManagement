/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin'
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};
