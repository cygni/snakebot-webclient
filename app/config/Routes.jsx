import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';

import ReactGA from 'react-ga';

import LoginPage from '../security/components/LoginPage';
import Gameboard from '../game/components/GameBoard';
import PageTemplate from '../common/templates/PageTemplate';
import HomePage from '../pages/HomePage';
import GettingStartedPage from '../pages/GettingStartedPage';
import AboutPage from '../pages/AboutPage';
import StatusPage from '../pages/StatusPage';
import ArenaSelectPage from '../arena/components/ArenaSelectPage';

import TournamentSettings from '../tournament/components/settings/TournamentSettings';
import Bracket from '../tournament/components/bracket/Bracket';
import GameSearch from '../game/search/GameSearch';
import Store from '../baseStore/BaseStore';
import TournamentAction from '../tournament/action/tournament-actions';
import ArenaPage from '../arena/components/ArenaPage';

ReactGA.initialize('UA-96039706-1');

function fireTracking() {
  ReactGA.pageview(window.location.hash);
}

function enterTournamentPage(nextState, replace) {
  TournamentAction.fetchActiveTournament();
  Store.requireAuth(nextState, replace);
}

export default () => (
  <Router onUpdate={fireTracking} history={hashHistory}>
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
    <Route path="/arena/:arenaName" component={PageTemplate}>
      <IndexRoute component={ArenaPage} />
    </Route>
    <Route path="/arena" component={PageTemplate}>
      <IndexRoute component={ArenaSelectPage} />
    </Route>
    <Route
      path="/tournament"
      component={PageTemplate}
      onEnter={enterTournamentPage}
    >
      <IndexRoute component={TournamentSettings} />
      <Route name="bracket" path="/tournament/tournamentbracket" component={Bracket} />
      <Route name="activeGame" path="/tournament/:gameId" component={Gameboard} />
    </Route>
  </Router>
);
