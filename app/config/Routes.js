import React from "react";
import LoginPage from "../security/components/LoginPage";
import GameTemplate from "../training/components/GameTemplate";
import Gameboard from "../training/components/GameBoard";
import PageTemplate from "../common/templates/PageTemplate"
import HomePage from "../pages/HomePage";
import GettingStartedPage from "../pages/GettingStartedPage";
import AboutPage from "../pages/AboutPage";
import StatusPage from "../pages/StatusPage";


import AuthPage from "../security/components/AuthPage";
import Settings from "../tournament/components/settings/Settings";
import Bracket from "../tournament/components/bracket/Bracket";
import TournamentGameBoard from "../tournament/components/gameboard/TournamentGameBoard";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import TournamentStore from "../baseStore/BaseStore";

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={PageTemplate}>
                <IndexRoute component={HomePage}/>
            </Route>
            <Route path="/viewgame/:trainingGameId" component={GameTemplate} >
                <IndexRoute component={Gameboard}/>
            </Route>
            <Route path="/auth" component={PageTemplate}>
                <IndexRoute component={AuthPage}/>
            </Route>
            <Route path="/login" component={PageTemplate}>
                <IndexRoute component={LoginPage}/>
            </Route>
            <Route path="/about" component={PageTemplate}>
                <IndexRoute component={AboutPage}/>
            </Route>
            <Route path="/gettingstarted" component={PageTemplate}>
                <IndexRoute component={GettingStartedPage}/>
            </Route>
            <Route path="/status" component={PageTemplate}>
                <IndexRoute component={StatusPage}/>
            </Route>
            <Route path="/tournament" component={PageTemplate} onEnter={TournamentStore.requireAuth}>
                <IndexRoute component={Settings}/>
                <Route name='bracket' path="/tournament/tournamentbracket" component={Bracket}/>
                <Route name='activeGame' path="/tournament/activeTournamentGame" component={TournamentGameBoard}/>
            </Route>
        </Router>
    );
}
