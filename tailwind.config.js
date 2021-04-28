module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "turtle-img": "url('/turtle.jpg')",
      }),
      gridTemplateColumns: {
        "1-max": "repeat(1, minmax(0, 1fr) max-content)",
      },
      transitionDuration: {
        1200: "1200ms",
      },
      zIndex: {
        "-10": "-10",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
