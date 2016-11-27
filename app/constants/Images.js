import star from '../design/images/star/star.svg';
import snake0EBDE7 from '../design/images/snakes/0EBDE7/0EBDE7.png';
import snake3CC321 from '../design/images/snakes/3CC321/3CC321.png';
import snakeFF8F35 from '../design/images/snakes/FF8F35/FF8F35.png';
import snakeF978AD from '../design/images/snakes/F978AD/F978AD.png';
import snakeBA43FF from '../design/images/snakes/BA43FF/BA43FF.png';
import snakeF8F8F8 from '../design/images/snakes/F8F8F8/F8F8F8.png';
import snakeFFDF4A from '../design/images/snakes/FFDF4A/FFDF4A.png';
import snake000000 from '../design/images/snakes/000000/000000.png';
import snakeFF4848 from '../design/images/snakes/FF4848/FF4848.png';
import snake9AF48E from '../design/images/snakes/9AF48E/9AF48E.png';
import snake9BF3F0 from '../design/images/snakes/9BF3F0/9BF3F0.png';
import snake0EBDE7Tail from '../design/images/snakes/0EBDE7/0EBDE7_TAIL.png';
import snake3CC321Tail from '../design/images/snakes/3CC321/3CC321_TAIL.png';
import snakeFF8F35Tail from '../design/images/snakes/FF8F35/FF8F35_TAIL.png';
import snakeF978ADTail from '../design/images/snakes/F978AD/F978AD_TAIL.png';
import snakeBA43FFTail from '../design/images/snakes/BA43FF/BA43FF_TAIL.png';
import snakeF8F8F8Tail from '../design/images/snakes/F8F8F8/F8F8F8_TAIL.png';
import snakeFFDF4ATail from '../design/images/snakes/FFDF4A/FFDF4A_TAIL.png';
import snake000000Tail from '../design/images/snakes/000000/000000_TAIL.png';
import snakeFF4848Tail from '../design/images/snakes/FF4848/FF4848_TAIL.png';
import snake9AF48ETail from '../design/images/snakes/9AF48E/9AF48E_TAIL.png';
import snake9BF3F0Tail from '../design/images/snakes/9BF3F0/9BF3F0_TAIL.png';
// 100% alpha
import deadSnakeTail100 from '../design/images/snakes/999999/grey-dead-tail-100.svg';
import deadSnakeHead100 from '../design/images/snakes/999999/grey-dead-head-100.svg';

const starImg = star;

function _getSnakeHead(color) {
  switch (color) {
    case '#0EBDE7':
      return snake0EBDE7;
    case '#3CC321' :
      return snake3CC321;
    case '#FF8F35' :
      return snakeFF8F35;
    case '#F978AD' :
      return snakeF978AD;
    case '#BA43FF' :
      return snakeBA43FF;
    case '#F8F8F8' :
      return snakeF8F8F8;
    case '#FFDF4A' :
      return snakeFFDF4A;
    case '#000000' :
      return snake000000;
    case '#FF4848' :
      return snakeFF4848;
    case '#9AF48E' :
      return snake9AF48E;
    case '#9BF3F0' :
      return snake9BF3F0;
    case '#dead' :
    case '#999999' :
      return deadSnakeHead100;
    default:
      return snake000000;
  }
}

function _getSnakeTail(color) {
  switch (color) {
    case '#0EBDE7':
      return snake0EBDE7Tail;
    case '#3CC321' :
      return snake3CC321Tail;
    case '#FF8F35' :
      return snakeFF8F35Tail;
    case '#F978AD' :
      return snakeF978ADTail;
    case '#BA43FF' :
      return snakeBA43FFTail;
    case '#F8F8F8' :
      return snakeF8F8F8Tail;
    case '#FFDF4A' :
      return snakeFFDF4ATail;
    case '#000000' :
      return snake000000Tail;
    case '#FF4848' :
      return snakeFF4848Tail;
    case '#9AF48E' :
      return snake9AF48ETail;
    case '#9BF3F0' :
      return snake9BF3F0Tail;
    case '#999999' :
      return deadSnakeTail100;
    default:
      return snake000000Tail;
  }
}

export default {
  getStarImage(position) {
    return { src: starImg, key: 'star_' + position };
  },
  getSnakeHead(color) {
    return { src: _getSnakeHead(color), key: 'head_' + color };
  },
  getSnakeTail(color) {
    return { src: _getSnakeTail(color), key: 'tail_' + color };
  },
};
