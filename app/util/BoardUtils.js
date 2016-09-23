export default {
  getTileSize(map) {
    const size = this.calculateSize(map);
    return size.width / map.width;
  },

  calculateSize(map) {
    if (map.width === map.height) {
      return { width: 1000, height: 1000 };
    }

    if (map.width > map.height) {
      const ratio = map.width / map.height;
      return { width: 1000, height: 1000 / ratio };
    }

    const ratio = map.height / map.width;
    return { width: 1000 / ratio, height: 1000 };
  },
  mapIsEmpty(map) {
    return !map || !map.width || map.width === 0;
  },
};
