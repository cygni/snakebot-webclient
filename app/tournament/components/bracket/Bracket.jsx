import React from 'react';
import { Button } from 'react-bootstrap';
import TournamentStore from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch';
import TournamentAction from '../../action/tournament-actions';
import Star from '../../../design/images/star/star.svg';

function getGamePlan() {
  const gamePlan = TournamentStore.getTournamentGamePlan();
  const winner = TournamentStore.getTournamentWinner();
  return {
    gamePlan,
    winner,
  };
}

const propTypes = {
  gamePlan: React.PropTypes.object,
  winner: React.PropTypes.object,
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
      default:
        return 'final-round';
      // default to keeping it at the largest size
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

        return <li key={i}>???</li>;
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
        <Button
          bsStyle="info"
          bsSize="large"
          bsClass="button--go"
          onClick={Bracket.chooseGame(game)}
        >
          Go to game
        </Button>
      </div>);
  }


  static renderWinner(winner) {
    if (!winner) {
      return <div />;
    }

    return (
      <ul className="game thefinalwinner">
        <li>{winner.name}</li>
      </ul>);
  }

  render() {
    if (!this.props.gamePlan) {
      return (<div />);
    }

    const levels = this.props.gamePlan.tournamentLevels.slice();
    levels.reverse();

    return (
      <section className="page clear-fix">
        <article style={{ textAlign: 'center' }}>
          <h1>{this.props.gamePlan.tournamentName}</h1>
        </article>
        <div className="tournament">
          {Bracket.renderWinner(this.props.winner)}
          {levels.map((level, i) => (
            <div key={i}>
              <div className={Bracket.roundClassName(level) + ' round-box'}>
                <h2>Round {level.level + 1} </h2>
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
