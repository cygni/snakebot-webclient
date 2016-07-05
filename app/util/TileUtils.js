function isConnectingPart(me, tiles, x, y) {
    let tile = tiles[y][x];
    return tile && tile.playerId === me.playerId && Math.abs(tile.order - me.order) <= 1;
}

function getTileType(me, x, y, tiles) {
    if (!me.playerId)
        return "none";

    var hasTop = isConnectingPart(me, tiles, x, y - 1) ? 0x1000 : 0;
    var hasRight = isConnectingPart(me, tiles, x + 1, y) ? 0x0100 : 0;
    var hasBot = isConnectingPart(me, tiles, x, y + 1) ? 0x0010 : 0;
    var hasLeft = isConnectingPart(me, tiles, x - 1, y) ? 0x0001 : 0;

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

function createTile(contentType, pos, tileSize, snake) {
	let key = "" + pos.x + "-" + pos.y;
    let tile = {
		"key": key,
		"height": tileSize,
		"width": tileSize,
		"type": contentType
	};

    switch (contentType) {
        case "empty": {
            tile.color = "";
            break;
        }
        case "snakebody":
        case "snakehead":
        {
            tile.color = snake && snake.alive ? snake.color : "grey";
            break;
        }
        case "obstacle": {
            tile.color = "black";
            break;
        }
        case "food":  {
            tile.color = "green";
            break;
        }
    }
    return tile;
}


function setTilesContent(tiles, map, tileSize, activeGame) {

    map.foodPositions.forEach(pos => {
        tiles[pos.y][pos.x] = createTile("food", pos, tileSize);
    });

    map.obstaclePositions.forEach(pos => {
        tiles[pos.y][pos.x] = createTile("obstacle", pos, tileSize);
    });

    map.snakeInfos.forEach(snakeInfo => {
        snakeInfo.positions.forEach((pos, index) => {
            let type = index > 0 ? "snakebody" : "snakehead";

			let snake = activeGame.players.find(snake => snake.id === snakeInfo.id);
			let tile = createTile(type, pos, tileSize, snake);
			tiles[pos.y][pos.x] = tile;

            tile.playerId = snakeInfo.id;
            tile.order = index;
        })
    });

	// decorate with tileType (needs playerId and order)
    map.snakeInfos.forEach(snakeInfo => {
        snakeInfo.positions.forEach(pos => {
			let tile = tiles[pos.y][pos.x];
			if (tile.type === "snakebody") {
				tile.tileType = getTileType(tile, pos.x, pos.y, tiles);
			}
        })
    });
    map.snakeInfos.forEach(snakeInfo => {
        snakeInfo.positions.forEach(pos => {
			let tile = tiles[pos.y][pos.x];
			delete tile.playerId;
			delete tile.order;
        })
    });

	for (let y = 0; y < map.height; y++) {
		for (let x = 0; x < map.width; x++) {
			let tile = tiles[y][x];
			if (tile === undefined) {
				tiles[y][x] = createTile("empty", {x:x, y:y}, tileSize);
			}
		}
	}

}

function gameBoardTiles(map, tileSize, activeGame) {
    let tiles=[]; 
	for (let y = 0; y < map.height; y++) {
		tiles.push(new Array(map.width));
	}
	setTilesContent(tiles, map, tileSize, activeGame);
	return tiles;
}

export default {
	gameBoardTiles,
    getTileCoordinate(absolutePos, mapWidth){
        let y = Math.floor(absolutePos / mapWidth);
        let x = absolutePos - y * mapWidth;

        return {x: x, y: y};
    }
}
