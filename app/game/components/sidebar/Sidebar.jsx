import React from 'react';
import StoreWatch from '../watch/StoreWatch';
import GameStore from '../../../baseStore/BaseStore';
import Images from '../../../constants/Images';

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
    let snakes = [];
    if (currentMap && currentMap.snakeInfos) {
      snakes = currentMap.snakeInfos;
    } else if (props.state.players) {
      snakes = props.state.players;
    }

    snakes.sort(snakeOrdering);

    console.log(snakes);

    const snakeColor = (snake) => {
      if (isSnakeDead(snake)) {
        return '#dead';
      }

      return props.state.colors[snake.id];
    };
    const snakeHead = snake => Images.getSnakeHead(snakeColor(snake), true).src;

    return (
      <div className="box activePlayers">
        <ul>
          {
            snakes.map(snake => (
              <li key={snake.id}>
                <figure>
                  <img src={snakeHead(snake)} alt={snakeColor(snake)} />
                </figure>
                <strong>{snake.points}</strong> {snake.name}
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
