/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hero-red': '#DE0606',
        'hero-blue': '#007FD7',
        'symbiote': '#131416',
        'web-silver': '#E2E2E2',
      },
      fontFamily: {
        // Register the new font name here
        'raimi': ['SpiderFont', 'sans-serif'], 
        'sans': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'spider-pattern': "url('/src/assets/spider-pattern.svg')",
      }
    },
  },
  plugins: [],
}