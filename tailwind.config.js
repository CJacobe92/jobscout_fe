/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  
  daisyui: {
    themes: [
      {
        corporate: {
          ...require("daisyui/src/theming/themes")["[data-theme=corporate]"],
          "primary": "#334155",
          "primary-focus": "#475569"
        },
      },
    ],
  },
}