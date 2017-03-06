import React from 'react';
import { Link, withRouter } from 'react-router';
import _ from 'lodash';
import Store from '../../baseStore/BaseStore';
import StoreWatch from './watch/StoreWatch';
import ArenaAction from '../action/arena-actions';
import GameBoard from '../../game/components/GameBoard';
import SnakeRanking from './SnakeRanking';
import '../../design/styles/stylesheet.scss';

function getArenaState() {
  return Store.getArenaState();
}

const propTypes = {
  params: React.PropTypes.object.isRequired,
  arenaState: React.PropTypes.object.isRequired,
};

class ArenaPage extends React.Component {
  static capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
  }

  componentWillMount() {
    ArenaAction.setActiveArena(this.getArenaName());
  }

  getArenaName() {
    return this.props.params.arenaName;
  }

  getArenaDisplayName() {
    let name = ArenaPage.capitalizeFirstLetter(this.getArenaName());
    if (name.toLowerCase().indexOf('arena') === -1) {
      name += ' arena';
    }
    return name;
  }

  startGame() {
    ArenaAction.startGame(this.getArenaName());
  }

  render() {
    const gameId = this.props.arenaState.gameId;
    const ranked = this.props.arenaState.ranked;
    const rating = this.props.arenaState.rating;
    const history = this.props.arenaState.gameHistory;
    const params = { gameId };

    const players = this.props.arenaState.onlinePlayers || [];
    const gameRunning = gameId !== null && gameId !== undefined;
    const gameStartable = !ranked && players.length >= 2;

    let noGameMessage = '';
    if (players.length < 2) {
      noGameMessage = 'At least two connected players are required to start a game';
    } else {
      noGameMessage = 'There are currently no games running in the arena.';
    }

    return (
      <section className="page clear-fix">
        <h1>{this.getArenaDisplayName()}</h1>

        {!ranked ?
          <p>
            { gameStartable ?
              <button onClick={this.startGame} disabled={!gameStartable}>Start New Game</button>
              : null }
            &nbsp;
            <span>Connected players: {players.join(' ') || 'none'}</span>
            &nbsp;
          </p>
          : null }

        {gameRunning ?
          <GameBoard key={gameId} params={params} autostart suppressAutoDispatch />
          : <p>{noGameMessage}</p> }

        {ranked ?
          <div>
            <h2>Leaderboards</h2>
            <SnakeRanking rating={rating} connected={players} />
          </div>
          : null }

        <h2>Arena game History</h2>

        {history && history.length > 0 ?
          <table className="arena-history-table">
            <thead>
            <tr>
              <th>Game</th>
              <th>Result</th>
            </tr>
            </thead>
            <tbody>
            {_.map(history, (gh, index) => <tr key={index}>
              <td><Link to={{ pathname: '/viewgame/' + gh.gameId }}>{gh.gameId}</Link></td>
              <td>{gh.playerPositions.join(', ')}</td>
            </tr>)}
            </tbody>
          </table>
          : <span>There are no recorded games for this arena.</span>}
      </section>
    );
  }
}

ArenaPage.propTypes = propTypes;

const RoutedArenaPage = withRouter(ArenaPage);

export default new StoreWatch(RoutedArenaPage, getArenaState);
