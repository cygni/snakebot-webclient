import React from 'react';
import { Table } from 'react-bootstrap';

import TournamentStore from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch.jsx';
import GameControl from '../controls/GameControl.jsx';


function getActivePlayerList() {
  const playerList = TournamentStore.getActivePlayers();
  return { playerList };
}

const propTypes = {
  playerList: React.PropTypes.array.isRequired,
};

function PlayerList(props) {
  return (
    <div>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Length</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>{
          props.playerList.map((player, index) => (
            <tr key={index} style={{ background: player.color, color: 'white' }}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.length}</td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <GameControl />
    </div>
  );
}

PlayerList.propTypes = propTypes;

export default new StoreWatch(PlayerList, getActivePlayerList);
