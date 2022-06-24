module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': [
          {'min': '0px', 'max': '640px'}
        ]
      },
      width: {
        '72': '260px',
        '280': '280px',
        '70%': '65%',
        '30%': '35%',
        '326': '326px',
        '50%': '50%'
      },
      borderRadius: {
        '10': '10px',
        '5': '5px'
      }
    },
    colors: {
      'primary-color': "#008DFF",
      'background-color': "#F5F6FA",
      'yellow-clr': '#C8EE44',
      'green-clr': '#29A073',
      'red-clr': '#FF4A4A',
      'gray-txt-color': '#8C8C8C',
      'txt-color': '#333333',
      'darkish': '#363A3F',
      'light-green': '#3ADE00',
      'yellow': '#EBE100',
      'light-gray': '#F3F6F8',
      'white': '#fff',
      'overlay-dark': '#4E5257',
      'overlay-light': '#EBE8E8',
      'dark-txt': '#1B212D',
      'light-blue': 'rgba(76, 132, 255, 0.2)',
      'table-gray': 'rgba(103, 109, 122, 1)',
      'table-dark': 'rgba(51, 51, 51, 1)',
      'table-border': 'rgba(236, 232, 232, 1)',
      'blue': 'rgba(58, 64, 200, 1)',
      'input-border': 'rgba(140, 140, 140, 1)',
      'text-gray': '#676D7A',
    },
  },
  plugins: [],
}