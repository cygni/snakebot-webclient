import React from 'react';
import _ from 'lodash';

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
    <div>
      {rankedSnakes.length > 0 ?
        <table className="arena-ranking-table">
          <thead>
          <tr>
            <th>Score</th>
            <th>Snake Name</th>
            <th>Currently Online</th>
          </tr>
          </thead>
          <tbody>
          {rankedSnakes.map(snake => (
            <tr key={snake.name}>
              <td> {snake.rating } </td>
              <td> {snake.name} </td>
              <td> {connected.includes(snake.name) ? 'Online' : '' } </td>
            </tr>
          ))}
          </tbody>
        </table>
        : <span>There are no recorded games for this arena.</span>}
    </div>
  );
};

SnakeRanking.propTypes = propTypes;

export default SnakeRanking;
