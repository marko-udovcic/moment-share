/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(15 23 42 / <alpha-value>)",
        secondary: "rgb(31, 41, 55)",
      },
    },
  },
  plugins: [],
};
