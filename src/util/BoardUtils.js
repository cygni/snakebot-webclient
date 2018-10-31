const MAP_HEIGHT = 34;
const MAP_WIDTH = 46;

const WANTED_SIZE_PX = 1000;

// choose integer and set width/height in px as factor of that
const TILE_SIZE = Math.floor(WANTED_SIZE_PX / MAP_WIDTH); // TILE_SIZE = 21;

const MAP_HEIGHT_PX = MAP_HEIGHT * TILE_SIZE;
const MAP_WIDTH_PX = MAP_WIDTH * TILE_SIZE; // 966px close to 1000 px

export function getTileSize() {
  return TILE_SIZE;
}

export function calculateSize() {
  return { width: MAP_WIDTH_PX, height: MAP_HEIGHT_PX };
}
