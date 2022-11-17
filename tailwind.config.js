module.exports = {
  content: [
    './App.js',
    './screens/*.js',
    './components/**/*.js',
    './components/*.js',
  ],
  theme: {
    extend: {
      colors: {
        swapRedBg: '#FBECEC',
        subscriptionGreenBg: '#DCF4E4',
        subscriptionGreenBorder: '#1BC359',
        swapRedBorder: '#E3292A',
      },
      fontFamily: {
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
};
