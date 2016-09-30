import React from 'react';
import { Table } from 'react-bootstrap';
import StoreWatch from '../watch/StoreWatch.jsx';
import GameStore from '../../../baseStore/BaseStore';
import GameControl from './GameControl.jsx';

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
                <td style={{ background: snake.positions.length > 0 ? props.state.colors[snake.id] : 'grey', color: 'white' }}>
                  Name: {snake.name}<br />
                  Length: {snake.positions.length}<br />
                  Points: {snake.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <GameControl id={props.state.id} />
      </div>
    );
  }

  return (<div />);
};

Sidebar.propTypes = propTypes;

export default new StoreWatch(Sidebar, getActiveGame);
