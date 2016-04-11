import React from 'react';

export default {
    getTileSize(map) {
        let size = this.calculateSize(map);
        return size.width / map.width;
    },

    calculateSize (map) {
        if (map.width === map.height) {
            return {width: 900, height: 900};
        }
        else {
            if (map.width > map.height) {
                let ratio = map.width / map.height;
                return {width: 900, height: 900 / ratio};
            }
            else {
                let ratio = map.height / map.width;
                return {width: 900 / ratio, height: 900};
            }
        }
    }
}
