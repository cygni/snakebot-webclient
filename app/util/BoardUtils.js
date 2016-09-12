import React from "react";

export default {
    getTileSize(map) {
        let size = this.calculateSize(map);
        return size.width / map.width;
    },

    calculateSize (map) {
        if (map.width === map.height) {
            return {width: 800, height: 800};
        }
        else {
            if (map.width > map.height) {
                let ratio = map.width / map.height;
                return {width: 800, height: 800 / ratio};
            }
            else {
                let ratio = map.height / map.width;
                return {width: 800 / ratio, height: 800};
            }
        }
    },
    mapIsEmpty(map) {
        return !map || !map.width || map.width === 0;
    }
}
