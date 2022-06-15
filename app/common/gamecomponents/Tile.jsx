import React from 'react';
import TileTypes from '../../constants/TileTypes';

import PropTypes from 'prop-types';

const borders = new Map([
  ['horizontal', 'none solid none solid'],
  ['vertical', 'solid none solid none'],
  ['endTop', 'solid solid none solid'],
  ['endLeft', 'solid none solid solid'],
  ['endRight', 'solid solid solid none'],
  ['endBottom', 'none solid solid solid'],
  ['leftBotCorner', 'none none solid solid'],
  ['rightBotCorner', 'none solid solid none'],
  ['leftTopCorner', 'solid none none solid'],
  ['rightTopCorner', 'solid solid none none'],
  ['single', 'solid'],
  ['none', 'none'],
]);

const propTypes = {
  type: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  tileType: PropTypes.string.isRequired,
};

const Tile = (props) => {
  const styles = {
    empty: {
      padding: 0,
      margin: 0,
      borderLeft: '1px solid rgba(255,255,255,0.2)',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      width: props.width,
      height: props.height,
      display: 'inline-block',
    },
    food: {
      padding: 0,
      margin: 0,
      background: 'green',
      width: props.width,
      height: props.height,
      display: 'inline-block',
    },
    obstacle: {
      background: 'black',
      padding: 0,
      margin: 0,
      width: props.width,
      height: props.height,
      display: 'inline-block',
    },
    snakebody: {
      background: props.color,
      padding: 0,
      margin: 0,
      width: props.width,
      height: props.height,
      borderColor: 'black',
      borderWidth: 3,
      borderStyle: borders.get(props.tileType),
      display: 'inline-block',
    },
    snakehead: {
      padding: 0,
      margin: 0,
      background: props.color,
      width: props.width,
      height: props.height,
      borderColor: 'black',
      borderWidth: 3,
      borderStyle: 'solid',
      display: 'inline-block',
    },
  };

  let tile = {};
  (() => {
    switch (props.type) {
      case TileTypes.EMPTY:
        tile = styles.empty;
        break;
      case TileTypes.FOOD:
        tile = styles.food;
        break;
      case TileTypes.OBSTACLE:
        tile = styles.obstacle;
        break;
      case TileTypes.SNAKE_BODY:
        tile = styles.snakebody;
        break;
      case TileTypes.SNAKE_HEAD:
        tile = styles.snakehead;
        break;
      default:
        break;
    }
  })();

  return (
    <div style={tile} />
  );
};

Tile.propTypes = propTypes;

export default Tile;
