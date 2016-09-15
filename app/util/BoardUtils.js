import React from "react";

export default {
    getTileSize(map) {
        let size = this.calculateSize(map);
        return size.width / map.width;
    },

    calculateSize (map) {
        if (map.width === map.height) {
            return {width: 1000, height: 1000};
        }
        else {
            if (map.width > map.height) {
                let ratio = map.width / map.height;
                return {width: 1000, height: 1000 / ratio};
            }
            else {
                let ratio = map.height / map.width;
                return {width: 1000 / ratio, height: 1000};
            }
        }
    },
    mapIsEmpty(map) {
        return !map || !map.width || map.width === 0;
    }
}
