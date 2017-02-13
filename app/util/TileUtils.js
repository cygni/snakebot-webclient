import Images from '../constants/Images';
import Colors from './Colors';

const deadSnakes = [];
const imgCache = {};
const toRad = Math.PI / 180;

function _renderSnakeBody(stage, map, snake, tileSize, color) {
  const lastIndex = snake.positions.length - 1;

  const margin = 2; // pixels space margin to tile size.
  const lineWidth = tileSize - margin;
  const halfTile = Math.floor(tileSize / 2);

/* for marking of tile boundaries when debugging rendering problems
  snake.positions.forEach((position, index) => {
    const pos = _getTileCoordinate(position, map);

    const rect = new createjs.Shape();
    stage.addChild(rect);
    rect.graphics
        .beginFill('yellow')
        .drawRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
    rect.alpha = 1;

    const box = new createjs.Shape();
    stage.addChild(box);
    box.graphics
        .beginFill('#000000')
        .drawRect(pos.x * tileSize + 1, pos.y * tileSize + 1, tileSize - 2, tileSize - 2);
    box.alpha = 1;
  });
*/

  const line = new createjs.Shape();
  stage.addChild(line);

  line.graphics
    .setStrokeStyle(lineWidth, 'butt', 'round')
    .beginStroke(color.code);
  line.alpha = color.alpha;

  snake.positions.forEach((position, index) => {
    const pos = _getTileCoordinate(position, map);
    const posX = pos.x * tileSize;
    const posY = pos.y * tileSize;

    if (index === 0) {
      // Head
      // ensure that we know which direction the head will be facing, set 90 (right) at first frame
      const rotation = (snake.positions.length > 1) ? _getHeadRotation(snake.positions, map) : 90;
      const snakeHead = Images.getSnakeHead(color.code);
      _renderImage(stage, pos, tileSize, snakeHead, rotation, color.alpha, lineWidth);
    } else if (index === lastIndex) {
      // Tail
      const rotation = _getTailRotation(snake.positions, map);
      const snakeTail = Images.getSnakeTail(color.code);
      _renderImage(stage, pos, tileSize, snakeTail, rotation, color.alpha, lineWidth);

      const ticks = snake.tailProtectedForGameTicks;
      if (ticks > 0) {
        const arc = new createjs.Shape();
        const angle = rotation + 90;

        arc.graphics
            .setStrokeStyle(ticks + 1)
            .beginStroke('white')
            .arc(posX + halfTile, posY + halfTile, halfTile,
                (angle - 45) * toRad, (angle + 45) * toRad);
        stage.addChild(arc);
      }
    } else {
      const prevPos = _getTileCoordinate(snake.positions[index - 1], map);
      const nextPos = _getTileCoordinate(snake.positions[index + 1], map);
      const rotation = _getRotation(prevPos, pos);
      const nextRotation = _getRotation(pos, nextPos);

      if (index === 1) {
        // starting position for drawing a snake line at position where head starts
        const fromEdge = _edgePositionLineCap(rotation, tileSize, halfTile);
        line.graphics.moveTo(posX + fromEdge.dX, posY + fromEdge.dY);
      }

      // Draw lines to each body position where rotation changes and last body part (not tail)
      if (nextRotation !== rotation || index === lastIndex - 1) {
        line.graphics.lineTo(posX + halfTile, posY + halfTile);
      }

      if (index === lastIndex - 1) {
        const tail = _getTileCoordinate(snake.positions[lastIndex], map);
        const toEdge = _edgePositionLineCap(_getRotation(tail, pos), tileSize, halfTile);
        line.graphics.lineTo(posX + toEdge.dX, posY + toEdge.dY);
      }
    }
  });
}

// Calculate x,y distances from current position (center of tile) to
// position where head/tail connects to this body part.
function _edgePositionLineCap(rotation, tileSize, halfTile) {
  let dX = halfTile;
  let dY = halfTile;

  if (rotation === 0) {
    dY = -1;
  } else if (rotation === 180) {
    dY = tileSize;
  } else if (rotation === 90) {
    dX = tileSize;
  } else {
    dX = -1;
  }

  return { dX, dY };
}

function createBitmap(imgSource) {
  const image = new Image();
  image.src = imgSource;
  return new createjs.Bitmap(image);
}

function getCachedBitmap(imgSource) {
  if (imgSource.key) {
    return imgCache[imgSource.key] || (imgCache[imgSource.key] = createBitmap(imgSource.src));
  }
  return createBitmap(imgSource.src);
}

function _renderImage(stage, pos, tileSize, imgSource, rotation, alpha, lineWidth) {
  const bitmap = getCachedBitmap(imgSource);

  // Use a container to be able to positon it with top/left orientation
  const headContainer = new createjs.Container();
  headContainer.addChild(bitmap);

  headContainer.x = pos.x * tileSize;
  headContainer.y = pos.y * tileSize;

  bitmap.scaleX = lineWidth / bitmap.image.width; // Snake width is same as line width
  bitmap.scaleY = tileSize / bitmap.image.height;

  // Set the registration point to the middle of the image (this ignores scaling)
  bitmap.regX = bitmap.regY = bitmap.image.width / 2;

  // And put the registration point in the middle (this time taking scaling into consideration)
  bitmap.x = bitmap.y = Math.floor(tileSize / 2);
  bitmap.rotation = rotation;
  bitmap.alpha = alpha;

  stage.addChild(headContainer);
}

// Render live snakes
function _renderSnakes(stage, map, tileSize, colors) {
  const snakes = map.snakeInfos.filter(si => si.positions.length > 0);

  function colorsFn(snake) {
    return { code: colors[snake.id], alpha: 1 };
  }

  _renderAnySnakes(snakes, stage, map, tileSize, colorsFn);
}

// General - dead or live snakes
function _renderAnySnakes(snakes, stage, map, tileSize, colorsFn) {
  snakes.forEach((snake) => {
    const color = colorsFn(snake);
    _renderSnakeBody(stage, map, snake, tileSize, color);
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

// Render dead snakes
function _renderDeadSnake(stage, map, snakes, tileSize) {
  function colorsFn(snake) {
    const alphaCountdown = (snake.worldTick + snake.ttl) - map.worldTick;

    let alpha;
    if (alphaCountdown > 1) {
      alpha = 1;
    } else if (alphaCountdown === 1) {
      alpha = 0.7;
    } else {
      alpha = 0.5;
    }

    const code = Colors.DEAD_SNAKE;
    return { code, alpha };
  }

  _renderAnySnakes(snakes, stage, map, tileSize, colorsFn);
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
    const star = getCachedBitmap(Images.getStarImage(foodPosition));

    const yPos = pos.y * tileSize;
    const xPos = pos.x * tileSize;

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

      group.push(obstaclePosition);
      if (r1.length > 0 || r2.length > 0) {
        group.push(createObstacle(obstaclePosition.x    , obstaclePosition.y + 1)); // eslint-disable-line
        group.push(createObstacle(obstaclePosition.x + 1, obstaclePosition.y));     // right
        group.push(createObstacle(obstaclePosition.x + 1, obstaclePosition.y + 1)); // rightDown
      }
      if (r2.length > 0) {
        group.push(createObstacle(obstaclePosition.x    , obstaclePosition.y + 2)); // eslint-disable-line
        group.push(createObstacle(obstaclePosition.x + 2, obstaclePosition.y));     // right2
        group.push(createObstacle(obstaclePosition.x + 1, obstaclePosition.y + 2)); // rightDown2
        group.push(createObstacle(obstaclePosition.x + 2, obstaclePosition.y + 1)); // rightDown3
        group.push(createObstacle(obstaclePosition.x + 2, obstaclePosition.y + 2)); // rightDown4
      }
      group.forEach((obstacle) => {
        ready.push(concatCoordinate(obstacle));
      });
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
  renderSnakes(stage, map, tileSize, colors) {
    _renderSnakes(stage, map, tileSize, colors);
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
