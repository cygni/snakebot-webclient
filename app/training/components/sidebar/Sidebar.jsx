import React from 'react';
import { Table } from 'react-bootstrap';
import StoreWatch from '../watch/StoreWatch.jsx';
import GameStore from '../../../baseStore/BaseStore';
import GameControl from './GameControl.jsx';


function getActiveGame() {
  const game = GameStore.getActiveGame();
  return { game };
}

function Sidebar() {
  if (this.props.game) {
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
          <tbody> {
            this.props.game.players.map(snake => (
              <tr key={snake.id}>
                <td style={{ background: snake.alive ? snake.color : 'grey', color: 'white' }}>
                  Name: {snake.name}
                  Length: {snake.length} Points: {snake.points} </td>
              </tr>
            ))}
          </tbody>
        </Table>


        <GameControl id={this.props.game.id} />
      </div>
    );
  }
  return (<div />);
}

export default new StoreWatch(Sidebar, getActiveGame);
