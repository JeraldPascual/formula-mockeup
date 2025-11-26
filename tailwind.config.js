/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'f1': ['Formula1', 'sans-serif'],
        'f1-wide': ['Formula1 Wide', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
