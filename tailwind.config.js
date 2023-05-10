/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blue1: "var(--blue1)",
        blue2: "var(--blue2)",
        black1: "var(--black1)",
        lightgray1: "var(--lightgray1)",
        lightgray2: "var(--lightgray2)",
        lightgray3: "var(--lightgray3)",
        black2: "var(--black2)",
        gray1: "var(--gray1)",
        gray2: "var(--gray2)",
        red1: "var(--red1)",
        green1: "var(--green1)",
        black3: "var(--black3)",
        black4: "var(--black4)",
        orange1: "var(--orange1)",
      },
    },
  },
  plugins: [],
};