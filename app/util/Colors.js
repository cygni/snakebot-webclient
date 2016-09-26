const boardColors = [
    ['#F44336', '#EF9A9A'],
    ['#9C27B0', '#BA68C8'],
    ['#3F51B5', '#9FA8DA'],
    ['#2196F3', '#BBDEFB'],
    ['#03A9F4', '#81D4FA'],
    ['#00BCD4', '#B2EBF2'],
    ['#009688', '#B2DFDB'],
    ['#CAF50', '#C8E6C9'],
    ['#CDDC39', '#F0F4C3'],
    ['#FFEB3B', '#FFF59D'],
    ['#FF9800', '#FFE0B2'],
    ['#FF5722', '#FF8A65'],
    ['#795548', '#A1887F'],
    ['#9E9E9E', '#E0E0E0'],
    ['#607D8B', '#B0BEC5'],
];

const snakeColors = [
  '#F43FA5',
  '#A04F11',
  '#F9E24C',
  '#3044B5',
  '#006064',
  '#004D40',
  '#33691E',
  '#827717',
  '#FF6F00',
  '#E65100',
  '#BF360C',
];

export default {
  getBoardColor() {
    return boardColors;
  },

  getSnakeColor() {
    return snakeColors;
  },
};
