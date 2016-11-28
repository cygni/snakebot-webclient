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

  render() {
    const gameId = this.props.arenaState.gameId;
    const params = { gameId };

    return (
      <section className="page clear-fix">
        <h1>{this.getArenaDisplayName()}</h1>

        {gameId ?
          <GameBoard key={gameId} params={params} autostart />
          : <div>
            There are currently no games running in the arena!
            Next game will start in X seconds.
            </div> }
      </section>
    );
  }
}

ArenaPage.propTypes = propTypes;

const RoutedArenaPage = withRouter(ArenaPage);

export default new StoreWatch(RoutedArenaPage, getArenaState);
