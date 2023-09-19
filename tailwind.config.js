/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'lightGray': "#9A9A9A",
        'deepGray': "#6A6A6A",
        'primary': "#1EC6A8",
        'secondary': "#21127D"
      },
    },
  },
  plugins: [],
}
