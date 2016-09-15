import React from "react";
import TileTypes from "../constants/TileTypes";
import Images from "../constants/Images";

function isConnectingPart(me, map, x, y) {
    let tile = _getTileAt(x, y, map);
    return tile.playerId === me.playerId && Math.abs(tile.order - me.order) <= 1;
}

function getTileType(me, x, y, map) {
    if (!me.playerId)
        return "none";

    var hasTop = isConnectingPart(me, map, x, y - 1) ? 0x1000 : 0;
    var hasRight = isConnectingPart(me, map, x + 1, y) ? 0x0100 : 0;
    var hasBot = isConnectingPart(me, map, x, y + 1) ? 0x0010 : 0;
    var hasLeft = isConnectingPart(me, map, x - 1, y) ? 0x0001 : 0;

    var config = hasTop | hasBot | hasLeft | hasRight;

    switch (config) {
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


function _getTileAt(x, y, map) {
    let tile = {content: TileTypes.EMPTY};

    map.foodPositions.forEach(foodPosition => {
        if (foodPosition.x == x && foodPosition.y == y) {
            tile = {content: TileTypes.FOOD};
        }
    });

    map.obstaclePositions.forEach(obstaclePosition => {
        if (obstaclePosition.x == x && obstaclePosition.y == y) {
            tile = {content: TileTypes.OBSTACLE};
        }
    });


    map.snakeInfos.forEach(snakeInfo => {
        var head = true;

        snakeInfo.positions.forEach((snakePosition, index) => {
            let type = TileTypes.SNAKE_BODY;

            if (head) {
                type = TileTypes.SNAKE_HEAD;
                head = false;
            }

            if (snakePosition.x == x && snakePosition.y == y)
                tile = {content: type, playerId: snakeInfo.id, order: index};
        })
    });

    return tile;
}

function buildTileObject(tile, key, tileSize, _activeGame) {
    let item = {};

    switch (tile.content) {
        case TileTypes.EMPTY: {
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": "",
                "type": TileTypes.EMPTY
            };
            break;
        }
        case TileTypes.SNAKE_BODY : {
            let snake = _activeGame.players.find(snake => snake.id === tile.playerId);

            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": snake && snake.alive ? snake.color : "grey",
                "type": TileTypes.SNAKE_BODY,
                "tileType": tile.tileType
            };
            break;
        }
        case TileTypes.SNAKE_HEAD : {
            let snake = _activeGame.players.find(snake => snake.id === tile.playerId);
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": snake && snake.alive ? snake.color : "grey",
                "type": TileTypes.SNAKE_HEAD
            };
            break;
        }

        case TileTypes.OBSTACLE : {
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": "black",
                "type": TileTypes.OBSTACLE
            };
            break;
        }

        case TileTypes.FOOD : {
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": "green",
                "type": TileTypes.FOOD
            };
            break;
        }
    }
    return item;
}

function _renderSnakes(stage, map, tileSize, _activeGame) {
    map.snakeInfos.forEach(snakeInfo => {
        var head = true;
        let snake = _activeGame.game.players.find(snake => snake.id === snakeInfo.id);
        snakeInfo.positions.forEach((snakePosition) => {
            let yPos = snakePosition.y * tileSize;
            let xPos = snakePosition.x * tileSize;
            if (head) {
                head = false;
                let bitmap = new createjs.Bitmap(Images.SNAKE_HEAD_BLUE);
                bitmap.scaleX = tileSize / bitmap.image.width;
                bitmap.scaleY = tileSize / bitmap.image.height;
                bitmap.x = xPos;
                bitmap.y = yPos;
                stage.addChild(bitmap);
            } else {
                let rect = new createjs.Shape();
                rect.graphics.beginStroke("#000000")
                    .beginFill(snake.color).drawRect(xPos, yPos, tileSize, tileSize);
                stage.addChild(rect);
            }
        })
    });
}

function _renderFood(stage, map, tileSize) {
    map.foodPositions.forEach(foodPosition => {
        let yPos = foodPosition.y * tileSize;
        let xPos = foodPosition.x * tileSize;
        let star = new createjs.Bitmap(Images.STAR);
        star.scaleX = tileSize / star.image.width;
        star.scaleY = tileSize / star.image.height;
        star.x = xPos;
        star.y = yPos;
        stage.addChild(star);
    });
};

function _renderObstacles(stage, map, tileSize) {
    map.obstaclePositions.forEach(obstaclePosition => {
        let yPos = obstaclePosition.y * tileSize;
        let xPos = obstaclePosition.x * tileSize;
        let blackHole = new lib.blackhole();
        blackHole.x = xPos;
        blackHole.y = yPos;
        stage.addChild(blackHole);
    });
}

export default {

    renderSnakes(stage, map, tileSize, _activeGame){
        _renderSnakes(stage, map, tileSize, _activeGame);
    },

    renderFood(stage, map, tileSize) {
        _renderFood(stage, map, tileSize);
    },

    renderObstacles(stage, map, tileSize) {
        _renderObstacles(stage, map, tileSize);
    },

    getTileAt(x, y, map, tileSize, activeGame){
        let key = "" + x + "-" + y;
        let tile = _getTileAt(x, y, map);

        if (tile.content == TileTypes.SNAKE_BODY)
            tile.tileType = getTileType(tile, x, y, map);

        return buildTileObject(tile, key, tileSize, activeGame);
    },
    getTileCoordinate(absolutePos, mapWidth){
        let y = Math.floor(absolutePos / mapWidth);
        let x = absolutePos - y * mapWidth;

        return {x: x, y: y};
    }
}
