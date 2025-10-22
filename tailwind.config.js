/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'plant-green': '#4A7C59',
        'plant-dark': '#2F5233',
        'plant-sage': '#8B9D83',
        'plant-cream': '#F5F1E8',
        'plant-earth': '#A67B5B',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        greennest: {
          primary: '#4A7C59',
          secondary: '#8B9D83',
          accent: '#A67B5B',
          neutral: '#2F5233',
          'base-100': '#F5F1E8',
        },
      },
      'light',
    ],
  },
};

