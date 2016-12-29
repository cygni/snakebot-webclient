import React from 'react';
import { withRouter } from 'react-router';
import Store from '../../baseStore/BaseStore';
import StoreWatch from './watch/StoreWatch';
import ArenaAction from '../action/arena-actions';
import GameBoard from '../../game/components/GameBoard';
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
    const params = { gameId };

    const players = this.props.arenaState.onlinePlayers || [];
    const gameRunning = gameId !== null && gameId !== undefined;
    const gameStartable = !ranked && players.length >= 2;
´
    let noGameMessage = '';
    if (players.length < 2) {
      noGameMessage = 'At least two connected players are required to start a game';
    } else {
      noGameMessage = 'There are currently no games running in the arena.';
    }

    return (
      <section className="page clear-fix">
        <h1>{this.getArenaDisplayName()}</h1>

        {ranked ?
          <p>In this arena, games are started automatically, and results are added to a rating
            calculated with the Glicko2 algorithm {JSON.stringify(rating)}</p>
          : ''
        }

        <p>
          { gameStartable ?
            <button onClick={this.startGame} disabled={!gameStartable}>Start New Game</button>
            : null }
          &nbsp;
          <span>Connected players: {players.join(' ') || 'none'}</span>
          &nbsp;
        </p>

        {gameRunning ?
          <GameBoard key={gameId} params={params} autostart />
          : <p>{noGameMessage}</p> }
      </section>
    );
  }
}

ArenaPage.propTypes = propTypes;

const RoutedArenaPage = withRouter(ArenaPage);

export default new StoreWatch(RoutedArenaPage, getArenaState);
