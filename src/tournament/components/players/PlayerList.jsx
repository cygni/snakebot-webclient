import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import Store from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch';

function getPlayerList() {
  const playerList = Store.getPlayerList();
  return { playerList };
}

const propTypes = {
  playerList: PropTypes.array.isRequired,
};

function PlayerList(props) {
  return (
    <div>
      <span>Number of Snakes: {props.playerList.length}</span>
      <ListGroup>
        {props.playerList.map((player, index) => (
          <ListGroupItem key={index}>{player.name}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

PlayerList.propTypes = propTypes;

export default StoreWatch(PlayerList, getPlayerList);