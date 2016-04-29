import React from 'react';
import GameTemplate from '../training/components/GameTemplate'
import Gameboard from '../training/components/GameBoard'
import TournamentTemplate from '../tournament/components/TournamentTemplate'
import Settings from '../tournament/components/settings/Settings'
import Bracket from '../tournament/components/bracket/Bracket'
import TournamentGameBoard from '../tournament/components/gameboard/TournamentGameBoard'

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/training" component={GameTemplate}>
                <IndexRoute component={Gameboard}/>
            </Route>
            <Route path="/tournament" component={TournamentTemplate}>
                <IndexRoute component={Settings}/>
                <Route name='bracket' path="/tournament/tournamentbracket" component={Bracket}/>
                <Route name='activeGame' path="/tournament/activeTournamentGame" component={TournamentGameBoard}/>
            </Route>
        </Router>
    );
}