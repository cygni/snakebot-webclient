import React from 'react';

let percentage = new Map([
    [1, 0.87 ],
    [2,  0.75 ],
    [3, 0.63 ],
    [4, 0.50]
]);

function isConnectingPart(me, arr, x, y){
    var column = arr[x];
    if(column == undefined)
      return false;

    var tile = column[y];
    if(tile == undefined)
      return false;

    return tile.playerId === me.playerId && Math.abs(tile.order - me.order) <= 1;
}

function getTileType(arr, x, y){

  var me = arr[x][y];
  var hasTop = isConnectingPart(me, arr, x, y - 1) ? 0x1000 : 0;
  var hasRight = isConnectingPart(me, arr, x + 1, y) ? 0x0100 : 0;
  var hasBot = isConnectingPart(me, arr, x, y + 1) ? 0x0010 : 0;
  var hasLeft = isConnectingPart(me, arr, x - 1, y) ? 0x0001 : 0;

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

export default {
    createEmptyWorld(boardWidth, boardHeight, size) {
        let tiles = [];

        for (let i = 0; i < boardHeight; i++) {
            let emptyTileRow = [];
            for (let j = 0; j < boardWidth; j++) {
                let key = "" + i + "-" + j;
                emptyTileRow.push({
                        "key": key,
                        "height": size,
                        "width": size,
                        "color": "",
                        "gradient": 1,
                        "tail": false,
                        "type": "empty"
                    }
                )
            }
            tiles.push(emptyTileRow);
        }
        return tiles
    },

    sortWorld(world, _activegame) {
        let tiles = [];

        let size = this.calculateSize(world.width, world.height);
        let tileSize = size[1] / world.height;


        for (let i = 0; i < world.height; i++) {
            let tileRow = [];
            for (let j = 0; j < world.width; j++) {
                let tile = world.tiles[j][i];
                let key = "" + i + "-" + j;
                if(!tile) {
                    console.log("no tile: " + j + " " + i)
                }

                let builtTile = this.buildTileObject(tile, key, tileSize, _activegame)

                if(builtTile.type == "snakebody")
                  builtTile.tileType = getTileType(world.tiles, j, i);

                tileRow.push(builtTile)
            }
            tiles.push(tileRow);
        }

        return tiles;
    },

    buildTileObject(tile, key, tileSize, _activeGame) {

        let item = {};

        switch (tile.content) {
            case "empty":
            {
                item = {
                    "key": key,
                    "height": tileSize,
                    "width": tileSize,
                    "color": "",
                    "gradient": 1,
                    "tail": false,
                    "type": "empty"
                };
                break;
            }
            case "snakebody" :
            {
                let snake = _activeGame.players.find(snake => snake.id === tile.playerId);
                let opacity = 1;

                if (tile.order > 4) {
                    let op = percentage.get(Math.floor(tile.order / 4));
                    if (op) {
                        opacity = op;
                    }
                    else {
                        opacity = 0.5;
                    }
                }

                item = {
                    "key": key,
                    "height": tileSize,
                    "width": tileSize,
                    "color": snake.color,
                    "gradient": opacity,
                    "tail": tile.tail,
                    "type": "snakebody"
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
                    "gradient": 1,
                    "tail": tile.tail,
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
                    "gradient": 1,
                    "tail": false,
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
                    "gradient": 1,
                    "tail": false,
                    "type": "food"
                };
                break;
            }
        }

        return item;
    },

    calculateSize (width, height) {
        if (width === height) {
            return [900, 900];
        }
        else {
            if (width > height) {
                let ratio = width / height;
                return [900, 900 / ratio]
            }
            else {
                let ratio = height / width;
                return [900 / ratio, 900]
            }
        }
    }
}
