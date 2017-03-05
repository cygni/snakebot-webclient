import React from 'react';
import _ from 'lodash';
import Images from '../../constants/Images';

const propTypes = {
  rating: React.PropTypes.object.isRequired,
  connected: React.PropTypes.array.isRequired,
};

const SnakeRanking = function SnakeRanking(props) {
  const connected = props.connected;
  const rankedSnakes = _(props.connected)
    .keyBy(playerName => playerName)
    .mapValues(() => 0)
    .assign(props.rating)
    .map((v, k) => ({ name: k, rating: v }))
    .sortBy('rating')
    .value()
    .reverse();

  return (
    <div className="activePlayers">
      {rankedSnakes.length > 0 ?
        <h3>Glicko2 Rating</h3>
        : null }
      <ul>
        {rankedSnakes.map(snake => (
          <li key={snake.name}>
            <figure>
              { connected.includes(snake.name) ?
                <img src={Images.getSnakeHead('#9BF3F0')} alt="connected" title="connected" />
                : <img src={Images.getSnakeHead(snake)} alt="offline" title="offline" /> }
            </figure>
            <strong>{snake.rating}</strong> {snake.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

SnakeRanking.propTypes = propTypes;

export default SnakeRanking;
