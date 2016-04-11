import React from 'react';

export default {
    getTileSize(map) {
        let size = this.calculateSize(map);
        return size.width / map.height;
    },

    calculateSize (map) {
        if (map.width === map.height) {
            return {width:900, height:900};
        }
        else {
            if (map.width > map.height) {
                let ratio = width / height;
                return {width:900, height:900 / ratio};
            }
            else {
                let ratio = height / width;
                return {width:900 / ratio, height:900};
            }
        }
    }
}
