/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      spacing: {
        30: '7.5rem',
      },
      colors: {
        lightgreen: '#9cdd05',
        darkgreen: '#74a305',
      },
      backgroundImage: {
        'profile-texture': "url('../public/profile-background.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
