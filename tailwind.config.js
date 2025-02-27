/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all component files
    "./public/index.html",
    "./node_modules/@ionic/react/**/*.js" // Include Ionic React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};