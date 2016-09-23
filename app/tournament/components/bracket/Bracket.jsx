import React from 'react';
import {
  Link,
} from 'react-router';

import TournamentStore from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch.jsx';
import TournamentAction from '../../action/tournament-actions';
import FinalPlacementList from '../players/FinalPlacementList.jsx';
import './bracket.scss';

function getGamePlan() {
  const gameplan = TournamentStore.getTournamentGameplan();
  return {
    gameplan,
  };
}

const propTypes = {
  gameplan: React.PropTypes.object.isRequired,
};

class Bracket extends React.Component {
  static chooseGame(gameId) {
    TournamentAction.setActiveTournamentGame(gameId);
  }

  render() {
    return (
      <main id="tournament"> {
        this.props.gameplan.tournamentLevels.map((level, i) => (
          <div className="panel panel-info col-sm-3" key={i}>
            <div className="panel-heading">Round {level.level}</div> {
            level.tournamentGames.map((game, j) => (
              <Link to={{ pathname: '/tournament/' + game.gameId }} key={game.gameId}>
                <div className="panel-body" key={j}>
                  <h4> Game {j} </h4>
                  <ul className="list-group player"> {
                    game.players.map(player => (
                      <li
                        className="list-group-item"
                        key={player.id}
                      >{player.name} </li>))}
                  </ul>
                </div>
              </Link>)
            )
          }
          </div>
        ))}
        <FinalPlacementList />
      </main>
    );
  }
}
Bracket.propTypes = propTypes;


export default new StoreWatch(Bracket, getGamePlan);
