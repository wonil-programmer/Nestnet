/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        black: "#111111",
      },
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
          "75%": { opacity: "0.2" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        zoomout: {
          "0%": { transform: "scale(1.1)", opacity: "0.7" },
          "12.5%": { transform: "scale(1.075)", opacity: "0.8" },
          "25%": { transform: "scale(1.05)", opacity: "1" },
          "37.5%": { transform: "scale(1.025)", opacity: "0.8" },
          "50%": { transform: "scale(1)", opacity: "0.5" },
          "62.5%": { transform: "scale(1)", opacity: "0.3" },
          "75%": { transform: "scale(1)", opacity: "0" },
          "87.5%": { transform: "scale(1.1)", opacity: "0.2" },
          "100%": { transform: "scale(1.1)", opacity: "0.6" },
        },
        zoomoutnext: {
          "0%": { transform: "scale(1.01)", opacity: "0.5" },
          "12.5%": { transform: "scale(1)", opacity: "0.2" },
          "25%": { transform: "scale(1)", opacity: "0" },
          "37.5%": { transform: "scale(1.1)", opacity: "0.1" },
          "50%": { transform: "scale(1.1)", opacity: "0.2" },
          "62.5%": { transform: "scale(1.075)", opacity: "0.6" },
          "75%": { transform: "scale(1.05)", opacity: "1" },
          "87.5%": { transform: "scale(1.025)", opacity: "0.8" },
          "100%": { transform: "scale(1.015)", opacity: "0.7" },
        },
        zoomin: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1.2)" },
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
        // drawerout: {
        //   "0%": { transform: "translate(0)" },
        //   "50%": { transform: "translate(0, 50%)" },
        //   "100%": { transform: "translate(0, 100%)" },
        // },
        drawerout: {
          "0%": { bottom: "0" },
          "50%": { bottom: "10" },
          "100%": { bottom: "20" },
        },
        drawerin: {
          "0%": { transform: "translate(0)" },
          "50%": { transform: "translate(0, -20%)" },
          "100%": { transform: "translate(0, -100%)" },
        },
      },
      animation: {
        fadeout: "fadeout 1s ease-out forwards",
        fadein: "fadein 1s ease-in forwards",
        zoomout: "zoomout 12s linear infinite",
        zoomoutnext: "zoomoutnext 12s linear infinite",
        zoomin: "zoomin 5s linear infinite",
        blink: "blink 2s ease-in-out infinite",
        drawerout: "drawerout 0.25s linear forwards",
        drawerin: "drawerin 0.25s linear forwards",
      },
    },
  },
};
