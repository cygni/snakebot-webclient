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
  '#0EBDE7',
  '#3CC321',
  '#FF8F35',
  '#F978AD',
  '#BA43FF',
  '#F8F8F8',
  '#FFDF4A',
  '#000000',
  '#FF4848',
  '#9AF48E',
  '#9BF3F0',
];

export default {
  getBoardColor(i) {
    return boardColors[i];
  },
  getSnakeColor(i) {
    return snakeColors[i];
  },
  DEAD_SNAKE: '#999999',
};
