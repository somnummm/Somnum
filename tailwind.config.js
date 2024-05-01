/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize:{
        'citation' :'1em',
        '2.5xl' : '2.5em',
      },
      lineHeight:{
        'relaxed' : '1.3',
      },
      spacing:{
        'max' : 'max-content',
      },

    },
  },
  plugins: [],
};
