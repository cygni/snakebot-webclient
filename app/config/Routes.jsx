import React from 'react';
import {
  Router,
  Route,
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

import {HashRouter} from 'react-router-dom';

ReactGA.initialize('UA-96039706-1');

function fireTracking() {
  ReactGA.pageview(window.location.hash);
}

function enterTournamentPage(nextState, replace) {
  TournamentAction.fetchActiveTournament();
  Store.requireAuth(nextState, replace);
}

export default () => (
  <HashRouter onUpdate={fireTracking}>
    <Route path="/" component={PageTemplate}>
      <Route exact path="/" component={HomePage}/>
    </Route>
    <Route path="/viewgame/:gameId" component={PageTemplate}>
      <Route exact path="/" component={Gameboard}/>
    </Route>
    <Route path="/viewgame" component={PageTemplate} >
      <Route exact path="/" component={GameSearch}/>
    </Route>
    <Route path="/auth" component={PageTemplate}>
      <Route exact path="/" component={LoginPage}/>
    </Route>
    <Route path="/about" component={PageTemplate}>
      <Route exact path="/" component={AboutPage}/>
    </Route>
    <Route path="/gettingstarted" component={PageTemplate}>
      <Route exact path="/" component={GettingStartedPage}/>
    </Route>
    <Route path="/status" component={PageTemplate}>
      <Route exact path="/" component={StatusPage}/>
    </Route>
    <Route path="/arena/:arenaName" component={PageTemplate}>
      <Route exact path="/" component={ArenaPage}/>
    </Route>
    <Route path="/arena" component={PageTemplate}>
      <Route exact path="/" component={ArenaSelectPage}/>
    </Route>
    <Route
      path="/tournament"
      component={PageTemplate}
      onEnter={enterTournamentPage}
    >
      <Route exact path="/" component={TournamentSettings}/>
      <Route name="bracket" path="/tournament/tournamentbracket" component={Bracket} />
      <Route name="activeGame" path="/tournament/:gameId" component={Gameboard} />
    </Route>
  </HashRouter>
);
