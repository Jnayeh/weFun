import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        primary: '#De3429',
        secondary: '#151B40',
        gray: {
          200: '#F6F9FF',
        },
      },
      height: {
        '10v': '10vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh',
      },
      screens: {
        xs: '300px',
        '2xs': '440px',

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
} satisfies Config;
