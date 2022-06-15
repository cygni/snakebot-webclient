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
    <PageTemplate>
      <Route exact path="/" component={HomePage}></Route>
      <Route path="/viewgame/:gameId" component={Gameboard}></Route>
      <Route exact path="/viewgame" component={GameSearch} ></Route>
      <Route exact path="/auth" component={LoginPage}></Route>
      <Route exact path="/about" component={AboutPage}></Route>
      <Route exact path="/gettingstarted" component={GettingStartedPage}></Route>
      <Route exact path="/status" component={StatusPage}></Route>
      <Route path="/arena/:arenaName" component={ArenaPage}></Route>
      <Route exact path="/arena" component={ArenaSelectPage}></Route>
      <Route exact path="/tournament" onEnter={enterTournamentPage}>
        <TournamentSettings>  
          <Route name="bracket" path="/tournament/tournamentbracket" component={Bracket} />
          <Route name="activeGame" path="/tournament/:gameId" component={Gameboard} />
        </TournamentSettings>
      </Route>
    </PageTemplate>
  </HashRouter>
);
