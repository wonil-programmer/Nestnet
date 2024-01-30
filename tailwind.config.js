/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        black: "#111111",
      },
      fontSize: {},
      colors: {
        "home-primary": "#9f1239",
        "home-secondary": "#E45F84",
        "home-background": "#f7f8f9",
        "border-primary": "#efefef",
        "default-gray": "#efefef",
        skeleton: "#d1d5db",
      },
      keyframes: {
        swapdown: {
          "0%": { opacity: "0", transform: "translate(0, -20%)" },
          "50%": { opacity: "0.5", transform: "translate(0, -10%)" },
          "100%": { opacity: "1", transform: "translate(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        infiniteslide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        swapdown: "swapdown 0.5s linear forwards",
        infiniteslide: "infiniteslide 60s linear infinite",
      },
    },
  },
};
