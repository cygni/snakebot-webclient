import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';

import LoginPage from '../security/components/LoginPage.jsx';
import Gameboard from '../training/components/GameBoard.jsx';
import PageTemplate from '../common/templates/PageTemplate.jsx';
import HomePage from '../pages/HomePage.jsx';
import GettingStartedPage from '../pages/GettingStartedPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import StatusPage from '../pages/StatusPage.jsx';

import Settings from '../tournament/components/settings/Settings.jsx';
import Bracket from '../tournament/components/bracket/Bracket.jsx';
import GameSearch from '../training/search/GameSearch.jsx';
import Store from '../baseStore/BaseStore.js';
import TournamentAction from '../tournament/action/tournament-actions.js';

function enterTournamentPage(nextState, replace) {
  TournamentAction.fetchActiveTournament();
  Store.requireAuth(nextState, replace);
}

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={PageTemplate}>
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="/viewgame/:gameId" component={PageTemplate}>
      <IndexRoute component={Gameboard} />
    </Route>
    <Route path="/viewgame" component={PageTemplate} >
      <IndexRoute component={GameSearch} />
    </Route>
    <Route path="/auth" component={PageTemplate}>
      <IndexRoute component={LoginPage} />
    </Route>
    <Route path="/about" component={PageTemplate}>
      <IndexRoute component={AboutPage} />
    </Route>
    <Route path="/gettingstarted" component={PageTemplate}>
      <IndexRoute component={GettingStartedPage} />
    </Route>
    <Route path="/status" component={PageTemplate}>
      <IndexRoute component={StatusPage} />
    </Route>
    <Route
      path="/tournament"
      component={PageTemplate}
      onEnter={enterTournamentPage}
    >
      <IndexRoute component={Settings} />
      <Route name="bracket" path="/tournament/tournamentbracket" component={Bracket} />
      <Route name="activeGame" path="/tournament/:gameId" component={Gameboard} />
    </Route>
  </Router>
);
