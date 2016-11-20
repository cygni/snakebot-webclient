import Images from '../constants/Images';

const deadSnakes = [];

function _renderSnakeBody(stage, map, snake, tileSize, color) {
  const line = new createjs.Shape();
  const lastIndex = snake.positions.length - 1;
  const lineWidth = tileSize - 1;
  const halfTile = Math.floor(tileSize / 2);

  line.graphics
      .setStrokeStyle(lineWidth, 'round', 'round')
      .beginStroke(color);

  snake.positions.forEach((position, index) => {
    const pos = _getTileCoordinate(position, map);
    const posX = pos.x * tileSize;
    const posY = pos.y * tileSize;

    if (index === 0) {
      // start line at head position
      line.graphics.moveTo(posX + halfTile, posY + halfTile);
    } else if (index !== lastIndex) {
      const prevPos = _getTileCoordinate(snake.positions[index - 1], map);
      const nextPos = _getTileCoordinate(snake.positions[index + 1], map);
      const rotation = _getRotation(prevPos, pos);
      const nextRotation = _getRotation(pos, nextPos);

      // draw lines to each body position where rotation changes but last(tail)
      if (nextRotation !== rotation || index === lastIndex - 1) {
        line.graphics.lineTo(posX + halfTile, posY + halfTile);
      }

      if (index === lastIndex - 1) {
        // Draw from current position (center) to pos where tail connects to this body part using
        // non-round stroke. This extra work can been avoided if we could do lineTo() from
        // head to tail with rounded stroke, then replace/overwrite tail with its images instead,
        // by doing a clearRect() at head and tail, and then draw images instead
        // but it seems that easel.js does not support a "clear/undo" of graphics rectangle
        const tail = _getTileCoordinate(snake.positions[lastIndex], map);
        const dX = Math.ceil(((tail.x * tileSize) - posX) / 2);
        // adjust with +/-tileSize/2 to reach tail pos
        const dY = Math.ceil(((tail.y * tileSize) - posY) / 2);

        line.graphics.setStrokeStyle(lineWidth)
            .moveTo(posX + halfTile, posY + halfTile)
            .lineTo(posX + halfTile + dX, posY + halfTile + dY);
      }
    }
  });
  line.x = 0;
  line.y = 0;
  stage.addChild(line);
}

function _renderImage(stage, pos, tileSize, imgSource, rotation) {
  const image = new Image();
  image.src = imgSource;
  const bitmap = new createjs.Bitmap(image);

  // Use a container to be able to positon it with top/left orientation
  const headContainer = new createjs.Container();
  headContainer.addChild(bitmap);

  headContainer.x = pos.x * tileSize;
  headContainer.y = pos.y * tileSize;

  bitmap.scaleX = tileSize / bitmap.image.width;
  bitmap.scaleY = tileSize / bitmap.image.height;

  // Set the registration point to the middle of the image (this ignores scaling)
  bitmap.regX = bitmap.image.width / 2;
  bitmap.regY = bitmap.image.width / 2;

  // And put the registration point in the middle (this time taking scaling into consideration)
  bitmap.x = tileSize / 2;
  bitmap.y = tileSize / 2;

  bitmap.rotation = rotation;

  stage.addChild(headContainer);
}

function _renderSnakes(stage, map, tileSize, colors) {
  map.snakeInfos.forEach((snake) => {
    const lastIndex = snake.positions.length - 1;
    const color = colors[snake.id];

    // Body
    _renderSnakeBody(stage, map, snake, tileSize, color);

    // Head - overwrites first position of body using the head image
    const headPos = _getTileCoordinate(snake.positions[0], map);
    // ensure that we know which direction the head will be facing, set 90 (right) at first frame
    const rotation = (snake.positions.length > 1) ? _getHeadRotation(snake.positions, map) : 90;
    _renderImage(stage, headPos, tileSize, Images.getSnakeHead(color), rotation);

    // Tail
    if (snake.positions.length > 1) {
      const tailPos = _getTileCoordinate(snake.positions[lastIndex], map);
      const tailRotation = _getTailRotation(snake.positions, map);
      _renderImage(stage, tailPos, tileSize, Images.getSnakeTail(color), tailRotation);
    }
  });
}

function _renderCollisions(stage, snakes, tileSize, isTournament) {
  let msg;
  if (isTournament) {
    msg = new SpeechSynthesisUtterance();
    const voices = speechSynthesis.getVoices();

    msg.rate = 0;
    msg.volume = 2;
    msg.voice = voices.find(voice => voice.name === 'Karen');
  }

  snakes.forEach((snake) => {
    if (!deadSnakes.includes(snake.id) && isTournament) {
      msg.text = snake.name + ' died';
      speechSynthesis.speak(msg);
    }

    _renderDeathTile(stage, snake.deathX, snake.deathY, tileSize);
    deadSnakes.push(snake.id);
  }
  );
}

function _renderDeadSnake(stage, map, snakes, tileSize) {
  snakes.forEach((snake) => {
    const lastIndex = snake.positions.length - 1;
    const alpha = (snake.worldTick + snake.ttl) - map.worldTick;
    snake.positions.forEach((position, index) => {
      const pos = _getTileCoordinate(position, map);
      let ending;
      if (alpha > 1) {
        ending = 100;
      } else if (alpha === 1) {
        ending = 70;
      } else {
        ending = 50;
      }
      if (index === 0) {
        // ensure that we know which direction the head will be facing
        const rotation = _getHeadRotation(snake.positions, map);
        if (snake.positions.length > 1) {
          const imgSource = Images.getDeadImage('head', ending);
          console.log(imgSource);
          _renderImage(stage, pos, tileSize, imgSource, rotation);
        } else {
          const imgSource = Images.getDeadImage('body', ending);
          _renderImage(stage, pos, tileSize, imgSource, rotation);
        }
      } else if (index === lastIndex) {
        const rotation = _getTailRotation(snake.positions, map);
        const imgSource = Images.getDeadImage('tail', ending);
        _renderImage(stage, pos, tileSize, imgSource, rotation);
      } else {
        const imgSource = Images.getDeadImage('body', ending);
        _renderImage(stage, pos, tileSize, imgSource, 0);
      }
    });
  });
}

function _renderDeathTile(stage, x, y, tileSize) {
  const xPos = x * tileSize;
  const yPos = y * tileSize;
  const explosion = new lib.explosion(); // eslint-disable-line

  explosion.x = (xPos - (tileSize / 2));
  explosion.y = (yPos - (tileSize / 2));
  stage.addChild(explosion);
}

function _renderFood(stage, map, tileSize) {
  map.foodPositions.forEach((foodPosition) => {
    const pos = _getTileCoordinate(foodPosition, map);
    const image = new Image();
    image.src = Images.STAR;

    const yPos = pos.y * tileSize;
    const xPos = pos.x * tileSize;

    const star = new createjs.Bitmap(image);
    star.scaleX = tileSize / star.image.width;
    star.scaleY = tileSize / star.image.height;
    star.x = xPos;
    star.y = yPos;
    stage.addChild(star);
  });
}

function _renderObstacles(stage, map, tileSize) {
  const obstacleCoordinates = map.obstaclePositions.map(
    obstacle => _getTileCoordinate(obstacle, map));

  _groupObstacles(obstacleCoordinates).forEach((group) => {
    if (group.length > 0) {
      const groupSize = group.length;
      const firstObstacle = group[0];
      const xPos = firstObstacle.x * tileSize;
      const yPos = firstObstacle.y * tileSize;

      let scale = 1;
      if (groupSize === 4) {
        scale = 2;
      } else if (groupSize === 9) {
        scale = 3;
      }

      // the whole lib solution is a bit of a special case, so ignore eslint warnings
      const blackHole = new lib.blackhole(); // eslint-disable-line
      console.log(blackHole.nominalBounds.height, blackHole.nominalBounds.width);
      blackHole.scaleX = (tileSize * scale) / blackHole.nominalBounds.height;
      blackHole.scaleY = (tileSize * scale) / blackHole.nominalBounds.width;
      blackHole.x = xPos;
      blackHole.y = yPos;
      stage.addChild(blackHole);
    }
  });
}

function _addCountDown(layer) {
  const clock = new lib.countdown(); // eslint-disable-line
  clock.x = 140;
  clock.y = 60;
  layer.addChild(clock);
}

function _groupObstacles(obstaclePositions) {
  const ready = [];
  const cluster = [];
  obstaclePositions.sort((o1, o2) => o1.y - o2.y || o1.x - o2.x);
  obstaclePositions.forEach((obstaclePosition) => {
    if (!ready.includes(concatCoordinate(obstaclePosition))) {
      const group = [];
      const r1 = obstaclePositions.filter(ob => !ready.includes(concatCoordinate(ob)))
        .filter(o => (o.x === (obstaclePosition.x + 1) && obstaclePosition.y === o.y));
      const r2 = obstaclePositions.filter(ob => !ready.includes(concatCoordinate(ob)))
        .filter(o => (o.x === (obstaclePosition.x + 2) && obstaclePosition.y === o.y));

      if (r1.length === 0) {
        group.push(obstaclePosition);
        ready.push(concatCoordinate(obstaclePosition));
      } else if (r1.length === 1 && !(r2.length > 0)) {
        const down = createObstacle(obstaclePosition.x, obstaclePosition.y + 1);
        const right = createObstacle(obstaclePosition.x + 1, obstaclePosition.y);
        const rightDown = createObstacle(obstaclePosition.x + 1, obstaclePosition.y + 1);
        group.push(obstaclePosition);
        group.push(down);
        group.push(right);
        group.push(rightDown);
        ready.push(concatCoordinate(obstaclePosition));
        ready.push(concatCoordinate(down));
        ready.push(concatCoordinate(right));
        ready.push(concatCoordinate(rightDown));
      } else if (r2.length > 0) {
        const down = createObstacle(obstaclePosition.x, obstaclePosition.y + 1);
        const down2 = createObstacle(obstaclePosition.x, obstaclePosition.y + 2);
        const right = createObstacle(obstaclePosition.x + 1, obstaclePosition.y);
        const right2 = createObstacle(obstaclePosition.x + 2, obstaclePosition.y);
        const rightDown = createObstacle(obstaclePosition.x + 1, obstaclePosition.y + 1);
        const rightDown2 = createObstacle(obstaclePosition.x + 1, obstaclePosition.y + 2);
        const rightDown3 = createObstacle(obstaclePosition.x + 2, obstaclePosition.y + 1);
        const rightDown4 = createObstacle(obstaclePosition.x + 2, obstaclePosition.y + 2);
        group.push(obstaclePosition);
        group.push(down);
        group.push(down2);
        group.push(right);
        group.push(right2);
        group.push(rightDown);
        group.push(rightDown2);
        group.push(rightDown3);
        group.push(rightDown4);
        ready.push(concatCoordinate(obstaclePosition));
        ready.push(concatCoordinate(down));
        ready.push(concatCoordinate(down2));
        ready.push(concatCoordinate(right));
        ready.push(concatCoordinate(right2));
        ready.push(concatCoordinate(rightDown));
        ready.push(concatCoordinate(rightDown2));
        ready.push(concatCoordinate(rightDown3));
        ready.push(concatCoordinate(rightDown4));
      }
      cluster.push(group);
    }
  });
  return cluster;
}

function concatCoordinate(obstaclePosition) {
  return [obstaclePosition.x, obstaclePosition.y].join();
}

function createObstacle(xPos, yPos) {
  return { x: xPos, y: yPos };
}

function _getRotation(first, second) {
  if (first === undefined || second === undefined) {
    console.error('Snake is too short to find a body', first, second);
    return 0;
  }

  if (first.x === second.x && first.y > second.y) {
    return 180; // down
  } else if (first.x === second.x && first.y < second.y) {
    return 0; // up
  } else if (first.x > second.x) {
    return 90; // right
  } else if (first.x < second.x) {
    return -90; // left
  }

  console.error('Positions don\'t match any direction', first, second);
  return 0;
}

function _getHeadRotation(positions, map) {
  const head = _getTileCoordinate(positions[0], map);
  const body = _getTileCoordinate(positions[1], map);
  return _getRotation(head, body);
}

function _getTailRotation(positions, map) {
  const tail = _getTileCoordinate(positions[positions.length - 1], map);
  const body = _getTileCoordinate(positions[positions.length - 2], map);
  return _getRotation(body, tail);
}

function _getTileCoordinate(absolutePos, map) {
  const y = Math.floor(absolutePos / map.width);
  const x = absolutePos - (y * map.width);

  return { x, y };
}

export default {
  renderSnakes(stage, map, tileSize, _activeGame) {
    _renderSnakes(stage, map, tileSize, _activeGame);
  },

  renderDeadSnakes(stage, map, snakes, tileSize) {
    _renderDeadSnake(stage, map, snakes, tileSize);
  },

  renderCollisions(stage, collitions, tileSize, isTournament) {
    _renderCollisions(stage, collitions, tileSize, isTournament);
  },

  renderFood(stage, map, tileSize) {
    _renderFood(stage, map, tileSize);
  },

  renderObstacles(stage, map, tileSize) {
    _renderObstacles(stage, map, tileSize);
  },

  addCountDown(layer) {
    _addCountDown(layer);
  },
};
