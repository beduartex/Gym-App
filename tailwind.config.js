/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
