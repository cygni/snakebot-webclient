import Images from '../constants/Images';

function _renderBodyPart(stage, pos, tileSize, color) {
  const rect = new createjs.Shape();
  rect.graphics
    .beginFill(color)
    .drawRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
  stage.addChild(rect);
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
    snake.positions.forEach((position, index) => {
      const pos = _getTileCoordinate(position, map);
      const color = colors[snake.id];

      if (index === 0) {
        // ensure that we know which direction the head will be facing
        if (snake.positions.length > 1) {
          const rotation = _getHeadRotation(snake.positions, map);
          const imgSource = Images.getSnakeHead(color);
          _renderImage(stage, pos, tileSize, imgSource, rotation);
        } else {
          _renderBodyPart(stage, pos, tileSize, color);
        }
      } else if (index === lastIndex) {
        const rotation = _getTailRotation(snake.positions, map);
        const imgSource = Images.getSnakeTail(color);
        _renderImage(stage, pos, tileSize, imgSource, rotation);
      } else {
        _renderBodyPart(stage, pos, tileSize, color);
      }
    });
  });
}

function _renderCollisions(stage, snakes, tileSize) {
  snakes.forEach(snake =>
    _renderDeathTile(stage, snake.deathX, snake.deathY, tileSize)
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

  renderCollisions(stage, collitions, tileSize) {
    _renderCollisions(stage, collitions, tileSize);
  },

  renderFood(stage, map, tileSize) {
    _renderFood(stage, map, tileSize);
  },

  renderObstacles(stage, map, tileSize) {
    _renderObstacles(stage, map, tileSize);
  },
};
