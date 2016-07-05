import TileUtils from "../app/util/TileUtils";
import BoardUtils from "../app/util/BoardUtils";

import { expect } from 'chai';

let map = {
  height:10, width:10,
  foodPositions:    [{x:1, y:5}],
  obstaclePositions: [{x:2, y:5}],
  snakeInfos: [
	{ id: 'snake1', positions:    [{x:5, y:5}, {x:4, y:5}, {x:3, y:5}] },
	{ id: 'snake2', positions:    [{x:6, y:6}, {x:6, y:7}, {x:6, y:8}] }
  ]
};
	
let slowMap = {
  height:100, width:100,
  foodPositions:    [],
  obstaclePositions: [],
  snakeInfos: []
};
for (let i = 0; i < map.height; i++) {
	slowMap.foodPositions.push({x:i, y:0});
	slowMap.obstaclePositions.push({x:i, y:1});
}
for (let i = 0; i < 10; i++) {
	let snake = { id: 'snake'+i, positions: [] };
	for (let j = 0; j < map.height; j++) {
		snake.positions.push({x:j, y:i+2});
	}
	slowMap.snakeInfos.push(snake);
}

let activeGame = {
  "id": "260d0a02-8ea8-4de5-8ae2-4680298da737",
  "color": [
    "#9C27B0",
    "#BA68C8"
  ],
  "players": [
	{ id: 'snake1', alive:true, color: 'color1'},
	{ id: 'snake2', alive:true, color: 'color2'}
  ],
  "currentFrame": 0,
  "mapEvents": [],
  "updateFrequency": 500
};

let tileSize = BoardUtils.getTileSize(map);


describe('New TileUtils code', () => {
  it('should return game board fast', () => {
	
	var start = process.hrtime();
	var tiles = TileUtils.gameBoardTiles(slowMap, 90, activeGame);
	var end = process.hrtime(start);
	let elapsedMs = end[1]/1000000;
	console.log("TileUtils.gameBoardTiles exec time:"+elapsedMs);
	expect(elapsedMs).to.be.below(20);	
  });

  it('should return game board correctly', () => {
	var tiles = TileUtils.gameBoardTiles(map, tileSize, activeGame);

    expect(tiles.length).to.equal(map.height);
    expect(tiles[0].length).to.equal(map.width);

    expect(tiles[5][0]).to.deep.equal({"key":"0-5","height":90,"width":90,"color":"","type":"empty"});
    expect(tiles[5][1]).to.deep.equal({"key":"1-5","height":90,"width":90,"color":"green","type":"food"});
    expect(tiles[5][2]).to.deep.equal({"key":"2-5","height":90,"width":90,"color":"black","type":"obstacle"});
    expect(tiles[5][3]).to.deep.equal({"key":"3-5","height":90,"width":90,"color":"color1","type":"snakebody","tileType":"endLeft"});
    expect(tiles[5][4]).to.deep.equal({"key":"4-5","height":90,"width":90,"color":"color1","type":"snakebody","tileType":"vertical"});
	expect(tiles[5][5]).to.deep.equal({"key":"5-5","height":90,"width":90,"color":"color1","type":"snakehead"}); 
  });
});
