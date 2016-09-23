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
    case TileTypes.EMPTY:
      {
        item = {
          key,
          height: tileSize,
          width: tileSize,
          color: '',
          type: TileTypes.EMPTY,
        };
        break;
      }
    case TileTypes.SNAKE_BODY:
      {
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
    case TileTypes.SNAKE_HEAD:
      {
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

    case TileTypes.OBSTACLE:
      {
        item = {
          key,
          height: tileSize,
          width: tileSize,
          color: 'black',
          type: TileTypes.OBSTACLE,
        };
        break;
      }
    case TileTypes.FOOD:
      {
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

function _renderSnakes(stage, map, tileSize, _activeGame) {
  map.snakeInfos.forEach((snakeInfo) => {
    let head = true;
    const snake = _activeGame.game.players.find(s => s.id ===
      snakeInfo.id);
    snakeInfo.positions.forEach((snakePosition) => {
      const yPos = snakePosition.y * tileSize;
      const xPos = snakePosition.x * tileSize;
      if (head) {
        head = false;
        _setHeadDirection(stage, snakeInfo.positions, tileSize, xPos,
          yPos);
      } else {
        const rect = new createjs.Shape();
        rect.graphics.beginStroke('#000000')
          .beginFill(snake.color)
          .drawRect(xPos, yPos, tileSize, tileSize);
        stage.addChild(rect);
      }
    });
  });
}

function _renderFood(stage, map, tileSize) {
  map.foodPositions.forEach((foodPosition) => {
    const yPos = foodPosition.y * tileSize;
    const xPos = foodPosition.x * tileSize;
    const star = new createjs.Bitmap(Images.STAR);
    star.scaleX = tileSize / star.image.width;
    star.scaleY = tileSize / star.image.height;
    star.x = xPos;
    star.y = yPos;
    stage.addChild(star);
  });
}

function _renderObstacles(stage, map, tileSize) {
  map.obstaclePositions.forEach((obstaclePosition) => {
    const yPos = obstaclePosition.y * tileSize;
    const xPos = obstaclePosition.x * tileSize;
    const blackHole = new lib.blackhole();
    blackHole.x = xPos;
    blackHole.y = yPos;
    stage.addChild(blackHole);
  });
}

function _setHeadDirection(stage, snakePositions, tileSize, xPos, yPos) {
  const snakePosition1 = snakePositions[0];
  const snakePosition2 = snakePositions[1];
  if (snakePosition1 === undefined || snakePosition2 === undefined) {
    return;
  }

  // TODO correct color for head
  if (snakePosition1.x === snakePosition2.x && snakePosition1.y >
    snakePosition2.y) {
    _addHeadImage(stage, tileSize, xPos, yPos, Images.SNAKE_HEAD_BLUE_DOWN);
  } else if (snakePosition1.x > snakePosition2.x) {
    _addHeadImage(stage, tileSize, xPos, yPos, Images.SNAKE_HEAD_BLUE_RIGHT);
  } else if (snakePosition1.x < snakePosition2.x) {
    _addHeadImage(stage, tileSize, xPos, yPos, Images.SNAKE_HEAD_BLUE_LEFT);
  } else {
    _addHeadImage(stage, tileSize, xPos, yPos, Images.SNAKE_HEAD_BLUE);
  }
}

function _addHeadImage(stage, tileSize, xPos, yPos, image) {
  const bitmap = new createjs.Bitmap(image);
  bitmap.scaleX = tileSize / bitmap.image.width;
  bitmap.scaleY = tileSize / bitmap.image.height;
  bitmap.x = xPos;
  bitmap.y = yPos;
  stage.addChild(bitmap);
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
  getTileCoordinate(absolutePos, mapWidth) {
    const y = Math.floor(absolutePos / mapWidth);
    const x = absolutePos - (y * mapWidth);

    return { x, y };
  },
};
