import Directions from './Directions';

const starImg = new Image();
starImg.src = 'img/star/star.svg';

/*
#0EBDE7
*/
const HEAD_UP_1 = new Image();
HEAD_UP_1.src = 'img/snakes/0EBDE7/0EBDE7_UP.png';
const HEAD_DOWN_1 = new Image();
HEAD_DOWN_1.src = 'img/snakes/0EBDE7/0EBDE7_DOWN.png';
const HEAD_RIGHT_1 = new Image();
HEAD_RIGHT_1.src = 'img/snakes/0EBDE7/0EBDE7_RIGHT.png';
const HEAD_LEFT_1 = new Image();
HEAD_LEFT_1.src = 'img/snakes/0EBDE7/0EBDE7_LEFT.png';

/*
#3CC321
*/
const HEAD_UP_2 = new Image();
HEAD_UP_2.src = 'img/snakes/3CC321/3CC321_UP.png';
const HEAD_DOWN_2 = new Image();
HEAD_DOWN_2.src = 'img/snakes/3CC321/3CC321_DOWN.png';
const HEAD_RIGHT_2 = new Image();
HEAD_RIGHT_2.src = 'img/snakes/3CC321/3CC321_RIGHT.png';
const HEAD_LEFT_2 = new Image();
HEAD_LEFT_2.src = 'img/snakes/3CC321/3CC321_LEFT.png';

/*
#FF8F35
*/
const HEAD_UP_3 = new Image();
HEAD_UP_3.src = 'img/snakes/FF8F35/FF8F35_UP.png';
const HEAD_DOWN_3 = new Image();
HEAD_DOWN_3.src = 'img/snakes/FF8F35/FF8F35_DOWN.png';
const HEAD_RIGHT_3 = new Image();
HEAD_RIGHT_3.src = 'img/snakes/FF8F35/FF8F35_RIGHT.png';
const HEAD_LEFT_3 = new Image();
HEAD_LEFT_3.src = 'img/snakes/FF8F35/FF8F35_LEFT.png';

/*
#F978AD
*/
const HEAD_UP_4 = new Image();
HEAD_UP_4.src = 'img/snakes/F978AD/F978AD_UP.png';
const HEAD_DOWN_4 = new Image();
HEAD_DOWN_4.src = 'img/snakes/F978AD/F978AD_DOWN.png';
const HEAD_RIGHT_4 = new Image();
HEAD_RIGHT_4.src = 'img/snakes/F978AD/F978AD_RIGHT.png';
const HEAD_LEFT_4 = new Image();
HEAD_LEFT_4.src = 'img/snakes/F978AD/F978AD_LEFT.png';

/*
#BA43FF
*/
const HEAD_UP_5 = new Image();
HEAD_UP_5.src = 'img/snakes/BA43FF/BA43FF_UP.png';
const HEAD_DOWN_5 = new Image();
HEAD_DOWN_5.src = 'img/snakes/BA43FF/BA43FF_DOWN.png';
const HEAD_RIGHT_5 = new Image();
HEAD_RIGHT_5.src = 'img/snakes/BA43FF/BA43FF_RIGHT.png';
const HEAD_LEFT_5 = new Image();
HEAD_LEFT_5.src = 'img/snakes/BA43FF/BA43FF_LEFT.png';

/*
#F8F8F8
*/
const HEAD_UP_6 = new Image();
HEAD_UP_6.src = 'img/snakes/F8F8F8/F8F8F8_UP.png';
const HEAD_DOWN_6 = new Image();
HEAD_DOWN_6.src = 'img/snakes/F8F8F8/F8F8F8_DOWN.png';
const HEAD_RIGHT_6 = new Image();
HEAD_RIGHT_6.src = 'img/snakes/F8F8F8/F8F8F8_RIGHT.png';
const HEAD_LEFT_6 = new Image();
HEAD_LEFT_6.src = 'img/snakes/F8F8F8/F8F8F8_LEFT.png';

/*
#FFDF4A
*/
const HEAD_UP_7 = new Image();
HEAD_UP_7.src = 'img/snakes/FFDF4A/FFDF4A_UP.png';
const HEAD_DOWN_7 = new Image();
HEAD_DOWN_7.src = 'img/snakes/FFDF4A/FFDF4A_DOWN.png';
const HEAD_RIGHT_7 = new Image();
HEAD_RIGHT_7.src = 'img/snakes/FFDF4A/FFDF4A_RIGHT.png';
const HEAD_LEFT_7 = new Image();
HEAD_LEFT_7.src = 'img/snakes/FFDF4A/FFDF4A_LEFT.png';

/*
#000000
*/
const HEAD_UP_8 = new Image();
HEAD_UP_8.src = 'img/snakes/000000/000000_UP.png';
const HEAD_DOWN_8 = new Image();
HEAD_DOWN_8.src = 'img/snakes/000000/000000_DOWN.png';
const HEAD_RIGHT_8 = new Image();
HEAD_RIGHT_8.src = 'img/snakes/000000/000000_RIGHT.png';
const HEAD_LEFT_8 = new Image();
HEAD_LEFT_8.src = 'img/snakes/000000/000000_LEFT.png';

/*
#FF4848
*/
const HEAD_UP_9 = new Image();
HEAD_UP_9.src = 'img/snakes/FF4848/FF4848_UP.png';
const HEAD_DOWN_9 = new Image();
HEAD_DOWN_9.src = 'img/snakes/FF4848/FF4848_DOWN.png';
const HEAD_RIGHT_9 = new Image();
HEAD_RIGHT_9.src = 'img/snakes/FF4848/FF4848_RIGHT.png';
const HEAD_LEFT_9 = new Image();
HEAD_LEFT_9.src = 'img/snakes/FF4848/FF4848_LEFT.png';

/*
#9AF48E
*/
const HEAD_UP_10 = new Image();
HEAD_UP_10.src = 'img/snakes/9AF48E/9AF48E_UP.png';
const HEAD_DOWN_10 = new Image();
HEAD_DOWN_10.src = 'img/snakes/9AF48E/9AF48E_DOWN.png';
const HEAD_RIGHT_10 = new Image();
HEAD_RIGHT_10.src = 'img/snakes/9AF48E/9AF48E_RIGHT.png';
const HEAD_LEFT_10 = new Image();
HEAD_LEFT_10.src = 'img/snakes/9AF48E/9AF48E_LEFT.png';

/*
#9BF3F0
*/
const HEAD_UP_11 = new Image();
HEAD_UP_11.src = 'img/snakes/9BF3F0/9BF3F0_UP.png';
const HEAD_DOWN_11 = new Image();
HEAD_DOWN_11.src = 'img/snakes/9BF3F0/9BF3F0_DOWN.png';
const HEAD_RIGHT_11 = new Image();
HEAD_RIGHT_11.src = 'img/snakes/9BF3F0/9BF3F0_RIGHT.png';
const HEAD_LEFT_11 = new Image();
HEAD_LEFT_11.src = 'img/snakes/9BF3F0/9BF3F0_LEFT.png';


function _getSnakeHead(color, direction) {
  switch (color) {
    case '#0EBDE7':
      if (direction === Directions.UP) {
        return HEAD_UP_1;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_1;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_1;
      }
      return HEAD_DOWN_1;
    case '#3CC321' :
      if (direction === Directions.UP) {
        return HEAD_UP_2;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_2;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_2;
      }
      return HEAD_DOWN_2;
    case '#FF8F35' :
      if (direction === Directions.UP) {
        return HEAD_UP_3;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_3;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_3;
      }
      return HEAD_DOWN_3;
    case '#F978AD' :
      if (direction === Directions.UP) {
        return HEAD_UP_4;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_4;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_4;
      }
      return HEAD_DOWN_4;
    case '#BA43FF' :
      if (direction === Directions.UP) {
        return HEAD_UP_5;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_5;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_5;
      }
      return HEAD_DOWN_5;
    case '#F8F8F8' :
      if (direction === Directions.UP) {
        return HEAD_UP_6;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_6;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_6;
      }
      return HEAD_DOWN_6;
    case '#FFDF4A' :
      if (direction === Directions.UP) {
        return HEAD_UP_7;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_7;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_7;
      }
      return HEAD_DOWN_7;
    case '#000000' :
      if (direction === Directions.UP) {
        return HEAD_UP_8;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_8;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_8;
      }
      return HEAD_DOWN_8;
    case '#FF4848' :
      if (direction === Directions.UP) {
        return HEAD_UP_9;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_9;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_9;
      }
      return HEAD_DOWN_9;
    case '#9AF48E' :
      if (direction === Directions.UP) {
        return HEAD_UP_10;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_10;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_10;
      }
      return HEAD_DOWN_10;
    case '#9BF3F0' :
      if (direction === Directions.UP) {
        return HEAD_UP_11;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_11;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_11;
      }
      return HEAD_DOWN_11;
    default:
      if (direction === Directions.UP) {
        return HEAD_UP_1;
      } else if (direction === Directions.RIGHT) {
        return HEAD_RIGHT_1;
      } else if (direction === Directions.LEFT) {
        return HEAD_LEFT_1;
      }
      return HEAD_DOWN_1;
  }
}

export default {
  STAR: starImg,
  getSnakeHead(color, direction) {
    return _getSnakeHead(color, direction);
  },
};
