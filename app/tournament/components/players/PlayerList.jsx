import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import Store from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch.jsx';

function getPlayerList() {
  const playerList = Store.getPlayerList();
  return { playerList };
}

const propTypes = {
  playerList: React.PropTypes.array.isRequired,
};

function PlayerList(props) {
  return (
    <ListGroup>{
      props.playerList.map(
        (player, index) => (<ListGroupItem key={index}>{player.name}</ListGroupItem>))}
    </ListGroup>
  );
}

PlayerList.propTypes = propTypes;

export default new StoreWatch(PlayerList, getPlayerList);
