import React from 'react';
import { Button } from 'react-bootstrap';

import TournamentStore from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch.jsx';
import TournamentAction from '../../action/tournament-actions';
import FinalPlacementList from '../players/FinalPlacementList.jsx';
import './bracket.scss';

function getGamePlan() {
  const gamePlan = TournamentStore.getTournamentGamePlan();
  return {
    gamePlan,
  };
}

const propTypes = {
  gamePlan: React.PropTypes.object,
};

class Bracket extends React.Component {
  static chooseGame(game) {
    return () => TournamentAction.setActiveTournamentGame(game.gameId);
  }

  render() {
    console.log('Rendering Bracket', this.props);
    if (!this.props.gamePlan) {
      return (<div />);
    }

    return (
      <main id="tournament"> {
        this.props.gamePlan.tournamentLevels.map((level, i) => (
          <div className="panel panel-info col-sm-3" key={i}>
            <div className="panel-heading">Round {level.level}</div>
            { level.tournamentGames.map((game, j) => (
              <div
                className="panel-body"
                key={j}
              >
                <h4> Game {j} </h4>
                <ul className="list-group player"> {
                  game.players.map(player => (
                    <li
                      className="list-group-item"
                      key={player.id}
                    >{player.name} </li>))}
                </ul>
                <Button
                  onClick={Bracket.chooseGame(game)}
                  bsStyle="info"
                  bsSize="large"
                >Go to game
                </Button>
              </div>))}
          </div>
        ))}
        <FinalPlacementList />
      </main>
    );
  }
}
Bracket.propTypes = propTypes;

export default new StoreWatch(Bracket, getGamePlan);
