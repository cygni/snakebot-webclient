import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';

import LoginPage from '../security/components/LoginPage.jsx';
import GameTemplate from '../training/components/GameTemplate.jsx';
import Gameboard from '../training/components/GameBoard.jsx';
import PageTemplate from '../common/templates/PageTemplate.jsx';
import HomePage from '../pages/HomePage.jsx';
import GettingStartedPage from '../pages/GettingStartedPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import StatusPage from '../pages/StatusPage.jsx';

import AuthPage from '../security/components/AuthPage.jsx';
import Settings from '../tournament/components/settings/Settings.jsx';
import Bracket from '../tournament/components/bracket/Bracket.jsx';
import TournamentStore from '../baseStore/BaseStore';
import GameSearch from '../training/search/GameSearch.jsx';

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={PageTemplate}>
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="/viewgame/:gameId" component={GameTemplate} >
      <IndexRoute component={Gameboard} />
    </Route>
    <Route path="/viewgame" component={GameTemplate} >
      <IndexRoute component={GameSearch} />
    </Route>
    <Route path="/auth" component={PageTemplate}>
      <IndexRoute component={AuthPage} />
    </Route>
    <Route path="/login" component={PageTemplate}>
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
    <Route path="/tournament" component={PageTemplate} onEnter={TournamentStore.requireAuth}>
      <IndexRoute component={Settings} />
      <Route name="bracket" path="/tournament/tournamentbracket" component={Bracket} />
      <Route name="activeGame" path="/tournament/:gameId" component={Gameboard} />
    </Route>
  </Router>
);
