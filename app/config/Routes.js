import React from 'react';
import { hashHistory } from 'react-router';
import GameTemplate from '../training/components/GameTemplate'
import Gameboard from '../training/components/GameBoard'
import TournamentTemplate from '../tournament/components/TournamentTemplate'
import Settings from '../tournament/components/settings/Settings'
import Bracket from '../tournament/components/bracket/Bracket'

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={GameTemplate}>
                <IndexRoute component={Gameboard}/>
            </Route>
            <Route path="/tournament" component={TournamentTemplate}>
                <IndexRoute component={Settings}/>
                <Route path="/tournamentbracket" component={Bracket}/>
            </Route>
        </Router>
    );
}