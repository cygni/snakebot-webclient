import TileTypes from '../constants/TileTypes';
import Images from '../constants/Images';
import Directions from '../constants/Directions';

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
  let tile = {
    content: TileTypes.EMPTY,
  };

  map.foodPositions.forEach((foodPosition) => {
    if (foodPosition.x === x && foodPosition.y === y) {
      tile = {
        content: TileTypes.FOOD,
      };
    }
  });

  map.obstaclePositions.forEach((obstaclePosition) => {
    if (obstaclePosition.x === x && obstaclePosition.y === y) {
      tile = {
        content: TileTypes.OBSTACLE,
      };
    }
  });

  map.snakeInfos.forEach((snakeInfo) => {
    let head = true;

    snakeInfo.positions.forEach((snakePosition, index) => {
      let type = TileTypes.SNAKE_BODY;

      if (head) {
        type = TileTypes.SNAKE_HEAD;
        head = false;
      }

      if (snakePosition.x === x && snakePosition.y === y) {
        tile = {
          content: type,
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

function _renderBodyPart(stage, xPos, yPos, tileSize, color) {
  const rect = new createjs.Shape();
  rect.graphics
    .beginFill(color)
    .drawRect(xPos, yPos, tileSize, tileSize);
  stage.addChild(rect);
}

function _renderSnakes(stage, map, tileSize, _activeGame) {
  map.snakeInfos.forEach((snakeInfo) => {
    const lastIndex = snakeInfo.positions.length - 1;
    const snake = _activeGame.game.players.find(s => s.id ===
      snakeInfo.id);
    snakeInfo.positions.forEach((snakePosition, index) => {
      const pos = _getTileCoordinate(snakePosition, map);

      const yPos = pos.y * tileSize;
      const xPos = pos.x * tileSize;

      if (index === 0) {
        // ensure that we know which direction the head will be facing
        if (snakeInfo.positions.length > 1) {
          const direction = _getHeadDirection(snakeInfo.positions, map);
          const image = Images.getSnakeHead(snake.color, direction);

          _addImage(stage, tileSize, xPos, yPos, image);
        } else {
          _renderBodyPart(stage, xPos, yPos, tileSize, snake.color);
        }
      } else if (index === lastIndex) {
        // TODO: render tail!
        _renderBodyPart(stage, xPos, yPos, tileSize, snake.color);
      } else {
        _renderBodyPart(stage, xPos, yPos, tileSize, snake.color);
      }
    });
  });
}

function _renderFood(stage, map, tileSize) {
  map.foodPositions.forEach((foodPosition) => {
    const pos = _getTileCoordinate(foodPosition, map);

    const yPos = pos.y * tileSize;
    const xPos = pos.x * tileSize;
    const star = new createjs.Bitmap(Images.STAR);
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

      const blackHole = new lib.blackhole();
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
  obstaclePositions.forEach((obstaclePosition) => {
    if (!ready.includes([obstaclePosition.x, obstaclePosition.y].join())) {
      const ar = obstaclePositions.filter(o => _filterObstacles(o, obstaclePosition));
      cluster.push(ar);
      ar.forEach((ob) => {
        ready.push([ob.x, ob.y].join());
      });
    }
  });
  return cluster;
}

function _filterObstacles(o1, o2) {
  return Math.abs(o1.x - o2.x) < 3 && Math.abs(o1.y - o2.y) < 3;
}

function _getHeadDirection(positions, map) {
  const head = _getTileCoordinate(positions[0], map);
  const body = _getTileCoordinate(positions[1], map);

  if (head === undefined || body === undefined) {
    console.error('Snake is too short to find a body', positions);
    return Directions.DOWN;
  }

  if (head.x === body.x && head.y > body.y) {
    return Directions.DOWN;
  } else if (head.x === body.x && head.y < body.y) {
    return Directions.UP;
  } else if (head.x > body.x) {
    return Directions.RIGHT;
  } else if (head.x < body.x) {
    return Directions.LEFT;
  }

  console.error('Body positions don\'t match any direction', positions);
  return Directions.DOWN;
}

function _addImage(stage, tileSize, xPos, yPos, image) {
  const bitmap = new createjs.Bitmap(image);
  bitmap.scaleX = tileSize / bitmap.image.width;
  bitmap.scaleY = tileSize / bitmap.image.height;
  bitmap.x = xPos;
  bitmap.y = yPos;
  stage.addChild(bitmap);
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
