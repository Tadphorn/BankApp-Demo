/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#AAD7D3",
        darkGreen: "#5C8D8D",
      }
    },
  },
  plugins: [require("daisyui")],
}

