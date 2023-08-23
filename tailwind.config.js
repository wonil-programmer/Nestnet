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
      },
      width: {
        menus: "75rem",
        menu: "22.5rem",
      },
    },
  },
  plugins: [],
};
