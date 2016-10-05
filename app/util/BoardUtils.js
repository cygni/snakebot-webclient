const MAP_HEIGHT = 34;
const MAP_WIDTH = 46;

export default {
  getTileSize() {
    const size = this.calculateSize();
    return size.width / MAP_WIDTH;
  },

  calculateSize() {
    const height = MAP_HEIGHT;
    const width = MAP_WIDTH;

    if (width === height) {
      return { width: 1000, height: 1000 };
    }

    if (width > height) {
      const ratio = width / height;
      return { width: 1000, height: 1000 / ratio };
    }

    const ratio = height / width;
    return { width: 1000 / ratio, height: 1000 };
  },
};
