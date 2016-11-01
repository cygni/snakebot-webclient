import React from 'react';

import TournamentStore from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch';
import TournamentAction from '../../action/tournament-actions';

import Star from '../../../design/images/star/star.svg';

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
        return 'final-round';
      case 1:
        return 'third-round';
      case 2:
        return 'second-round';
      default:
        // default to keeping it at the largest size
        return 'first-round';
    }
  }

  static renderPlayers(game) {
    return [...Array(game.expectedNoofPlayers).keys()].map((i) => {
      const player = game.players[i];
      if (!player) {
        // if we have less players then expected for this game
        if (game.players.length > 0) {
          return null;
        }

        return <li key={i} >???</li>;
      }

      const star = <img src={Star} alt="Lived the longest" className="livedlongest" />;

      if (game.gamePlayed) {
        return (
          <li key={i} className={player.isMovedUpInTournament ? 'winner' : 'looser'}>
            <span className="points">{player.points}</span>
            {player.name} {player.isWinner ? star : null}
          </li>
        );
      }

      return (
        <li key={i}> {player.name} </li>
      );
    });
  }

  static renderGoToGame(game) {
    if (game.players.length === 0) {
      return <div />;
    }

    return (
      <div className="gotogame">
        <button
          type="button"
          className="button-link"
          onClick={Bracket.chooseGame(game)}
        >Go to game</button>
      </div>);
  }

  render() {
    console.log('Rendering Bracket', this.props);
    if (!this.props.gamePlan) {
      return (<div />);
    }

    const levels = this.props.gamePlan.tournamentLevels.slice();
    levels.reverse();

    return (
      <section className="page clear-fix">
        <article>
          <h1>Tournament</h1>
        </article>
        <div className="tournament"> {
          levels.map((level, i) => (
            <div key={i}>
              <div className={Bracket.roundClassName(level) + ' round-box'}>
                <h2>Round {level.level}</h2>
                <div className="flex">
                  { level.tournamentGames.map((game, j) => (
                    <ul className="game" key={j}> {
                      Bracket.renderPlayers(game)}
                      { Bracket.renderGoToGame(game) }
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
