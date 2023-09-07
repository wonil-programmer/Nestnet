/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "home-maintitle": ["8.75rem", "10rem"],
        "home-subtitle": "2.5rem",
      },
      colors: {
        "home-primary": "#f43f5e",
        "home-secondary": "#E45F84",
        "home-background": "#f7f8f9",
        "border-primary": "#efefef",
      },
      width: {
        menus: "75rem",
        menu: "22.5rem",
        "album-visWth": "66.25rem",
        "album-desWth": "46.25rem",
      },
      keyframes: {
        fadeout: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        blink: {
          "0%": { color: "red" },
          "50%": { color: "blue" },
          "100%": { color: "black" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        fadeout: "fadeout 1s ease-out forwards",
        fadein: "fadein 1s ease-in forwards",
        blink: "blink 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
