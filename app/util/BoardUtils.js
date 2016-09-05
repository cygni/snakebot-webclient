import React from "react";

export default {
    getTileSize(map) {
        let size = this.calculateSize(map);
        return size.width / map.width;
    },

    calculateSize (map) {
        if (map.width === map.height) {
            return {width: 600, height: 600};
        }
        else {
            if (map.width > map.height) {
                let ratio = map.width / map.height;
                return {width: 600, height: 600 / ratio};
            }
            else {
                let ratio = map.height / map.width;
                return {width: 600 / ratio, height: 600};
            }
        }
    },
    mapIsEmpty(map) {
        return !map || !map.width || map.width === 0;
    }
}
