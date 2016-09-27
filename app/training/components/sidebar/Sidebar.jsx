import React from 'react';
import { Table } from 'react-bootstrap';
import StoreWatch from '../watch/StoreWatch.jsx';
import GameStore from '../../../baseStore/BaseStore';
import GameControl from './GameControl.jsx';
import Colors from '../../../util/Colors.js';

function getActiveGame() {
  const game = GameStore.getActiveGame();
  const gameState = GameStore.getActiveGameState();
  return { game, gameState };
}

const propTypes = {
  game: React.PropTypes.object,
  gameState: React.PropTypes.object.isRequired,
};

const Sidebar = function Sidebar(props) {
  if (props.game && props.game.mapEvents) {
    const currentMap = props.game.mapEvents[props.gameState.currentFrame];
    const snakes = (currentMap && currentMap.snakeInfos) ? currentMap.snakeInfos : [];

    return (
      <div>
        <h3>Active Game</h3>
        <Table striped bordered condensed>
          <thead>
            <tr>
              <th>
                Players
              </th>
            </tr>
          </thead>
          <tbody>{
            snakes.map(snake => (
              <tr key={snake.id}>
                <td style={{ background: snake.positions.length > 0 ? Colors.getSnakeColor(snake.id) : 'grey', color: 'white' }}>
                  Name: {snake.name}<br />
                  Length: {snake.positions.length}<br />
                  Points: {snake.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <GameControl id={props.gameState.id} />
      </div>
    );
  }

  return (<div />);
};

Sidebar.propTypes = propTypes;

export default new StoreWatch(Sidebar, getActiveGame);
