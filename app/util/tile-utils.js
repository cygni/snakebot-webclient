import React from 'react';

let percentage = new Map([
    [1, 0.87 ],
    [2,  0.75 ],
    [3, 0.63 ],
    [4, 0.50]
]);


function isConnectingPart(me, map, x, y){
    let tile = _getTileAt(x, y, map);
    return tile.playerId === me.playerId && Math.abs(tile.order - me.order) <= 1;
}

function getTileType(me, x, y, map){
  if(!me.playerId)
    return "none";

  var hasTop = isConnectingPart(me, map, x, y - 1) ? 0x1000 : 0;
  var hasRight = isConnectingPart(me, map, x + 1, y) ? 0x0100 : 0;
  var hasBot = isConnectingPart(me, map, x, y + 1) ? 0x0010 : 0;
  var hasLeft = isConnectingPart(me, map, x - 1, y) ? 0x0001 : 0;

  var config = hasTop | hasBot | hasLeft | hasRight;

  switch(config){
    case 0x1000:
      return "endBottom";
    case 0x0100:
      return "endLeft";
    case 0x0010:
      return "endTop";
    case 0x0001:
      return "endRight";
    case 0x0101:
      return "vertical";
    case 0x1010:
      return "horizontal";
    case 0x0011:
      return "rightTopCorner";
    case 0x0110:
      return "leftTopCorner";
    case 0x1001:
      return "rightBotCorner";
    case 0x1100:
      return "leftBotCorner";
    case 0x0000:
      return "single";
  }

  return "none"
}


function _getTileAt (x, y, map) {
  let tile = {content: "empty"};

  map.foodPositions.forEach(foodPosition => {
    if(foodPosition.x == x && foodPosition.y == y){
      tile = {content: "food"};
    }
  });

  map.obstaclePositions.forEach(obstaclePosition => {
    if(obstaclePosition.x == x && obstaclePosition.y == y){
      tile = {content: "obstacle"};
    }
  });

  map.snakeInfos.forEach(snakeInfo => {
    var head = true;

    snakeInfo.positions.forEach((snakePosition, index) => {
      let type = "snakebody";

      if(head){
        type = "snakehead";
        head = false;
      }

      if(snakePosition.x == x && snakePosition.y == y)
        tile = {content: type, playerId: snakeInfo.id, order: index };
    })
  });

  return tile;
}

function buildTileObject(tile, key, tileSize, _activeGame) {

    let item = {};

    switch (tile.content) {
        case "empty":
        {
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": "",
                "type": "empty"
            };
            break;
        }
        case "snakebody" :
        {
            let snake = _activeGame.players.find(snake => snake.id === tile.playerId);

            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": snake.color,
                "type": "snakebody",
                "tileType": tile.tileType
            };
            break;
        }
        case "snakehead" :
        {
            let snake = _activeGame.players.find(snake => snake.id === tile.playerId);
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": snake ? snake.color : "white",
                "type": "snakehead"
            };
            break;
        }

        case "obstacle" :
        {
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": "black",
                "type": "obstacle"
            };
            break;
        }

        case "food" :
        {
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": "green",
                "type": "food"
            };
            break;
        }
    }
    return item;
}

export default {
  getTileAt(x, y, map, tileSize, activeGame){
    let key = "" + x + "-" + y;
    let tile = _getTileAt(x, y, map);

    if(tile.content == "snakebody")
      tile.tileType = getTileType(tile, x, y, map);

    return buildTileObject(tile, key, tileSize, activeGame);
  },
  getTileCoordinate(absolutePos, mapWidth){
    let y = Math.floor(absolutePos / mapWidth);
    let x = absolutePos - y * mapWidth;

    return {x: x, y: y};
  }
}
