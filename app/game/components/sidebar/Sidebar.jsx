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

const Sidebar = function Sidebar(props) {
  if (props.state && props.state.mapEvents) {
    const currentMap = props.state.mapEvents[props.state.currentFrame];
    const snakes = (currentMap && currentMap.snakeInfos) ? currentMap.snakeInfos : [];
    snakes.sort((s1, s2) => s2.points - s1.points);

    const snakeColor = (snake) => {
      if (snake.positions.length > 0) {
        return props.state.colors[snake.id];
      }

      return '000000';
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
