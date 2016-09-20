import React from "react";
import TournamentStore from "../../../baseStore/BaseStore";
import StoreWatch from "../../watch/StoreWatch";
import TournamentAction from "../../action/tournament-actions";
import FinalPlacementList from "../players/FinalPlacementList";
import "./bracket.scss";
import {Link} from "react-router";


function getGamePlan() {
    let gameplan = TournamentStore.getTournamentGameplan();
    return {gameplan: gameplan}
}

class Bracket extends React.Component {
    constructor(props) {
        super(props);
    }

    static chooseGame(gameId) {
        TournamentAction.setActiveTournamentGame(gameId);
    }

    render() {
        return (
            <main id="tournament">
                {
                    this.props.gameplan.tournamentLevels.map((level, i) => {
                        return (
                            <div className="panel panel-info col-sm-3" key={i}>

                                <div className="panel-heading">Round {level.level}</div>
                                {
                                    level.tournamentGames.map((game, i) => {

                                        return (
                                            <Link to={{pathname: '/tournament/' + game.gameId}} key={game.gameId}>
                                                <div className="panel-body" key={i}>
                                                    <h4> Game {i} </h4>
                                                    <ul className="list-group player">
                                                        {
                                                            game.players.map((player) => {
                                                                return (
                                                                    <li className="list-group-item"
                                                                        key={player.id}>{player.name}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }
                <FinalPlacementList />
            </main>
        )
    }
}

export default StoreWatch(Bracket, getGamePlan)