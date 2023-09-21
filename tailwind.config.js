/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fly-in": {
          "0%": {
            transform: "translateX(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        "fly-out": {
          "0%": {
            transform: "translateX(0)",
            opacity: 1,
          },
          "100%": {
            transform: "translateX(-100%)",
            opacity: 0,
          },
        },
      },
      animation: {
        "fly-in": "fly-in 0.5s ease-in-out",
        "fly-out": "fly-out 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
}

