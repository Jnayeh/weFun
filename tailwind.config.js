/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textShadow: {
        sm: "0.5px 0 var(--tw-shadow-color)",
        DEFAULT: "1px 0 var(--tw-shadow-color)",
        lg: "2px 0 var(--tw-shadow-color)",
      },
      /* colors: {
        primary: "",
        secondary: "#151B40",
        gray: {
          200: "#F6F9FF",
        },
      }, */
      colors: {
        orange: {
          350: "#F6AA83",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#De3429",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        marhey: ["var(--font-marhey)"],
        "roboto-slab": ["var(--font-roboto-slab)"],
        ubuntu: ["var(--font-ubuntu)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "scroll-left": {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        "scroll-right": {
          "0%": {
            transform: "translateX(-50%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        "float": {
          "0%": {
            transform: " rotate(0deg) translateX(-5px) rotate(0deg)",
          },
          "50%": {
            transform: " rotate(-180deg) translateX(-10px) rotate(180deg)",
          },
          "100%": {
            transform: " rotate(0deg) translateX(-5px) rotate(0deg)",
          },
        },
      },
      height: {
        "10v": "10dvh",
        "20v": "20dvh",
        "30v": "30dvh",
        "40v": "40dvh",
        "50v": "50dvh",
        "60v": "60dvh",
        "70v": "70dvh",
        "80v": "80dvh",
        "90v": "90dvh",
        "100v": "100dvh",
      },
      screens: {
        xs: "300px",
        "2xs": "440px",

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      animation: {
        "marquee-right": "scroll-right 30s linear infinite",
        marquee: "scroll-left 30s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "floating-card": " float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
