import React from 'react';
import StoreWatch from '../watch/StoreWatch.jsx';
import GameStore from '../../../baseStore/BaseStore';
import Images from '../../../constants/Images.js';

function getActiveGame() {
  const state = GameStore.getActiveGameState();
  return { state };
}

const propTypes = {
  state: React.PropTypes.object.isRequired,
};

const isSnakeDead = snake => snake.positions.length === 0;

// Order by alive first, then by points, then by names
const snakeOrdering = (snake1, snake2) => {
  if (isSnakeDead(snake1) && !isSnakeDead(snake2)) {
    return 1;
  } else if (isSnakeDead(snake2) && !isSnakeDead(snake1)) {
    return -1;
  }

  const pointDiff = snake2.points - snake1.points;
  if (pointDiff !== 0) {
    return pointDiff;
  }

  if (snake1.name > snake2.name) {
    return 1;
  } else if (snake2.name < snake2.name) {
    return -1;
  }
  return 0;

};

const Sidebar = function Sidebar(props) {
  if (props.state && props.state.mapEvents) {
    const currentMap = props.state.mapEvents[props.state.currentFrame];
    const snakes = (currentMap && currentMap.snakeInfos) ? currentMap.snakeInfos : [];
    // TODO: live bots, dead bots, both by points
    snakes.sort(snakeOrdering);

    const snakeColor = (snake) => {
      if (isSnakeDead(snake)) {
        return '000000';
      }

      return props.state.colors[snake.id];
    };
    const snakeHead = snake => Images.getSnakeHead(snakeColor(snake));

    return (
      <div className="active-players">
        <ul>
          {
            snakes.map(snake => (
              <li key={snake.id}>
                <img src={snakeHead(snake)} alt={snakeColor(snake)} />
                <strong>{snake.points} {snake.name}</strong>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return (<div />);
};

Sidebar.propTypes = propTypes;

export default new StoreWatch(Sidebar, getActiveGame);
