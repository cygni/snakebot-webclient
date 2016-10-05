import TileTypes from '../constants/TileTypes';
import Images from '../constants/Images';

function isConnectingPart(me, map, x, y) {
  const tile = _getTileAt(x, y, map);
  return tile.playerId === me.playerId && Math.abs(tile.order - me.order) <= 1;
}

function getTileType(me, x, y, map) {
  if (!me.playerId) {
    return 'none';
  }

  const hasTop = isConnectingPart(me, map, x, y - 1) ? 0x1000 : 0;
  const hasRight = isConnectingPart(me, map, x + 1, y) ? 0x0100 : 0;
  const hasBot = isConnectingPart(me, map, x, y + 1) ? 0x0010 : 0;
  const hasLeft = isConnectingPart(me, map, x - 1, y) ? 0x0001 : 0;

  // it works, so we'll allow it for now
  const config = hasTop | hasBot | hasLeft | hasRight; // eslint-disable-line

  switch (config) {
    case 0x1000:
      return 'endBottom';
    case 0x0100:
      return 'endLeft';
    case 0x0010:
      return 'endTop';
    case 0x0001:
      return 'endRight';
    case 0x0101:
      return 'vertical';
    case 0x1010:
      return 'horizontal';
    case 0x0011:
      return 'rightTopCorner';
    case 0x0110:
      return 'leftTopCorner';
    case 0x1001:
      return 'rightBotCorner';
    case 0x1100:
      return 'leftBotCorner';
    case 0x0000:
      return 'single';
    default:
      return 'none';
  }
}

function _getTileAt(x, y, map) {
  const atCoordinate = pos => pos.x === x && pos.y === y;

  if (map.foodPositions.some(atCoordinate)) {
    return {
      content: TileTypes.FOOD,
    };
  } else if (map.obstaclePositions.some(atCoordinate)) {
    return {
      content: TileTypes.OBSTACLE,
    };
  }

  let tile = { content: TileTypes.EMPTY };

  map.snakeInfos.forEach((snakeInfo) => {
    snakeInfo.positions.forEach((snakePosition, index) => {
      if (atCoordinate(snakePosition)) {
        tile = {
          content: index === 0 ? TileTypes.SNAKE_HEAD : TileTypes.SNAKE_BODY,
          playerId: snakeInfo.id,
          order: index,
        };
      }
    });
  });

  return tile;
}

function buildTileObject(tile, key, tileSize, _activeGame) {
  let item = {};

  switch (tile.content) {
    default:
      break;
    case TileTypes.EMPTY: {
      item = {
        key,
        height: tileSize,
        width: tileSize,
        color: '',
        type: TileTypes.EMPTY,
      };
      break;
    }
    case TileTypes.SNAKE_BODY: {
      const snake = _activeGame.players.find(s => s.id === tile.playerId);

      item = {
        key,
        height: tileSize,
        width: tileSize,
        color: snake && snake.alive ? snake.color : 'grey',
        type: TileTypes.SNAKE_BODY,
        tileType: tile.tileType,
      };
      break;
    }
    case TileTypes.SNAKE_HEAD: {
      const snake = _activeGame.players.find(s => s.id === tile.playerId);
      item = {
        key,
        height: tileSize,
        width: tileSize,
        color: snake && snake.alive ? snake.color : 'grey',
        type: TileTypes.SNAKE_HEAD,
      };
      break;
    }
    case TileTypes.OBSTACLE: {
      item = {
        key,
        height: tileSize,
        width: tileSize,
        color: 'black',
        type: TileTypes.OBSTACLE,
      };
      break;
    }
    case TileTypes.FOOD: {
      item = {
        key,
        height: tileSize,
        width: tileSize,
        color: 'green',
        type: TileTypes.FOOD,
      };
      break;
    }
  }
  return item;
}

function _renderBodyPart(stage, pos, tileSize, color) {
  const rect = new createjs.Shape();
  rect.graphics
    .beginFill(color)
    .drawRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
  stage.addChild(rect);
}

function _renderDeathTile(stage, x, y, tileSize) {
  const rect = new createjs.Shape();
  rect.graphics
    .beginFill('#ff0000')
    .drawRect(x * tileSize, y * tileSize, tileSize, tileSize);
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

function _renderDeadSnake(stage, map, snakes, tileSize, colors) {
  snakes.forEach((snake) => {
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
          _renderBodyPart(stage, pos, tileSize, '#d3d3d3');
        }
      } else if (index === lastIndex) {
        const rotation = _getTailRotation(snake.positions, map);
        const imgSource = Images.getSnakeTail(color);
        _renderImage(stage, pos, tileSize, imgSource, rotation);
      } else {
        _renderBodyPart(stage, pos, tileSize, '#d3d3d3');
      }
    });
  });
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

  renderDeadSnakes(stage, map, snakes, tileSize, colors) {
    _renderDeadSnake(stage, map, snakes, tileSize, colors);
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

  getTileAt(x, y, map, tileSize, activeGame) {
    const key = '' + x + '-' + y;
    const tile = _getTileAt(x, y, map);

    if (tile.content === TileTypes.SNAKE_BODY) {
      tile.tileType = getTileType(tile, x, y, map);
    }

    return buildTileObject(tile, key, tileSize, activeGame);
  },
};
