/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // <-- THIS IS THE MISSING LINE!
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // (Keep this if you use a src folder)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}