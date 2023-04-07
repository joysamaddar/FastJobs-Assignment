/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        black: 'var(--black)',
        lightblack: 'var(--lightblack)',
        white: 'var(--white)',
        gray: 'var(--gray)',
        blue: 'var(--blue)',
      }
    },
  },
  plugins: [],
}

