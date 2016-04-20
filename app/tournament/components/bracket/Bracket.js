import React from 'react';
import TournamentStore from '../../stores/TournamentStore'
import StoreWatch from '../../watch/StoreWatch'
require('./bracket.scss');


function getGamePlan() {
   let gameplan = TournamentStore.getTournamentGameplan()
    return {gameplan: gameplan}
}

class Bracket extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
           <main id="tournament">
                {
                    this.props.gameplan.tournamentLevels.map((level,i) => {
                        return (
                            <div className="panel panel-info col-sm-3" key={i}>
                                <div className="panel-heading">Level {level.level}</div>
                                {
                                    level.tournamentGames.map((game,i) => {
                                        return (
                                            <div className="panel-body" key={i}>
                                                <ul className="list-group player">
                                                {
                                                    game.players.map((player,i) => {
                                                        return (
                                                            <li className="list-group-item" key={i}>{player.name}</li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </main>
        )
    }
}

export default StoreWatch(Bracket, getGamePlan)