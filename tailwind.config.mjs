import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        'chat-bubble': '#1E1E1E',
        accent: '#2979FF',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0A0',
      },
    },
  },
  plugins: [typography],
}; 