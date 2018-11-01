import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import Store from '../../baseStore/BaseStore';
import StoreWatch from './watch/StoreWatch';
import * as ArenaActions from '../action/arena-actions';
import GameBoard from '../../game/components/GameBoard';
import SnakeRanking from './SnakeRanking';
import '../../design/styles/stylesheet.scss';

function getArenaState() {
  return Store.getArenaState();
}

class ArenaPage extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    arenaState: PropTypes.object.isRequired,
  };

  static capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  componentDidMount() {
    ArenaActions.setActiveArena(this.getArenaName());
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

  startGame = () => {
    ArenaActions.startGame(this.getArenaName());
  };

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

        {!ranked ? (
          <p>
            {gameStartable ? (
              <button onClick={this.startGame} disabled={!gameStartable}>
                Start New Game
              </button>
            ) : null}
            &nbsp;
            <span>Connected players: {players.join(' ') || 'none'}</span>
            &nbsp;
          </p>
        ) : (
          <SnakeRanking rating={rating} connected={players} />
        )}

        {gameRunning ? (
          <GameBoard key={gameId} params={params} autostart suppressAutoDispatch />
        ) : (
          <p>{noGameMessage}</p>
        )}

        <h3>Arena game History</h3>

        {history && history.length > 0 ? (
          <table className="arena-history-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((gh, index) => (
                <tr key={index}>
                  <td>
                    <Link to={{ pathname: '/viewgame/' + gh.gameId }}>{gh.gameId}</Link>
                  </td>
                  <td>{gh.playerPositions.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span>There are no recorded games for this arena.</span>
        )}
      </section>
    );
  }
}

const RoutedArenaPage = withRouter(ArenaPage);

export default StoreWatch(RoutedArenaPage, getArenaState);
