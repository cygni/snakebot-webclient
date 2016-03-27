import React from 'react';

let percentage = new Map([
    [ 1, 0.87 ],
    [ 2,  0.75 ],
    [ 3, 0.63 ],
    [4, 0.50]
]);

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
                tileRow.push(this.buildTileObject(tile, key, tileSize, _activegame))
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
