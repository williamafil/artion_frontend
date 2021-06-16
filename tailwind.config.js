/* eslint quote-props: [1 ,'as-needed'] */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl':
        '5px 5px 10px -3px rgba(0, 0, 0, 0.08), 10px 4px 12px -2px rgba(0, 0, 0, 0.05)',
      '4xl': '0 35px 60px -15px rgba(0, 0, 0, 0.15)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    extend: {
      height: {
        '2000px': '2000px',
        '500px': '500px',
        '32rem': '32rem',
      },
      flexGrow: {
        0: 0,
        Default: 2,
        1: 1,
      },
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
      margin: {
        '-10px': '-10px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
