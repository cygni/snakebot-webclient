import React from 'react';

import TournamentStore from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch';
import TournamentAction from '../../action/tournament-actions';

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

  static roundClassName(round) {
    switch (round.level) {
      case 0:
        return 'first-round';
      case 1:
        return 'second-round';
      case 2:
        return 'third-round';
      case 3:
        return 'final-round';
      default:
        return '';
    }
  }

  render() {
    console.log('Rendering Bracket', this.props);
    if (!this.props.gamePlan) {
      return (<div />);
    }

    return (
      <section className="page clear-fix">
        <article>
          <h1>Tournament</h1>
        </article>
        <div className="tournament"> {
          this.props.gamePlan.tournamentLevels.reverse().map((level, i) => (
            <div key={i}>
              <div className={Bracket.roundClassName(level) + ' round-box'}>
                <h2>Round {level.level}</h2>
                <div className="flex">
                  { level.tournamentGames.map((game, j) => (
                    <ul className="game" key={j}> {
                      game.players.map(player => (
                        <li
                          key={player.id}
                        >{player.name} </li>))}
                      <button
                        type="button"
                        onClick={Bracket.chooseGame(game)}
                      >Go to game</button>
                    </ul>
                    ))}
                </div>
              </div>
              { level.level > 0 ? <div className="spacer" /> : <div /> }
            </div>
          ))}
        </div>
      </section>
    );
  }
}
Bracket.propTypes = propTypes;

export default new StoreWatch(Bracket, getGamePlan);
