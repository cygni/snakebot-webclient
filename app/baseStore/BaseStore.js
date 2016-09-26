import {
  EventEmitter,
} from 'events';
import {
  hashHistory,
} from 'react-router';
import rest from 'rest';
import _ from 'lodash';
import Config from 'Config'; // eslint-disable-line

// For now, let's ignore this rule until a proper fix can be done
/* eslint-disable no-use-before-define */

import Socket from '../websocket/WebSocket';
import {
  register,
} from '../dispatchers/AppDispatcher';
import Constants from '../constants/Constants';
import GameRenderingFunction from '../util/GameRenderingFunctions';

const CHANGE_EVENT = 'change';
let finalPlacement = {
  winner: {},
  list: [],
};
let playerList = [];
const tournament = {};
let tournamentGameplan = {
  tournamentLevels: [],
};

let activeGameId = '';
let noResultsFound = false;

let oldGames = [];

let games = [];
const playerMap = new Map();
const startedGame = {};
const gameEvents = {};

let _activeGame = {};

const _startGame = () => {
  _activeGame.started = true;
  _activeGame.running = true;

  if (_activeGame.id) {
    Socket.send({
      includedGameIds: [_activeGame.id],
      type: 'se.cygni.snake.eventapi.request.SetGameFilter',
    });
    Socket.send({
      gameId: _activeGame.id,
      type: 'se.cygni.snake.eventapi.request.StartGame',
    });
  }
};

const _addGames = (gamesList) => {
  games = GameRenderingFunction.addGames(gamesList);

  if (_.isEmpty(_activeGame) && activeGameId) {
    _activeGame = games.find(game => game.id === activeGameId);

    if (_.isEmpty(_activeGame)) {
      rest(Config.server + '/history/' + activeGameId)
        .then((response) => {
          const test = JSON.parse(response.entity);
          console.log(test);
          const game = test.messages.filter(event => event.type ===
                                            'se.cygni.snake.api.event.MapUpdateEvent')
                  .map(type => type.map);
          _activeGame = GameRenderingFunction.addOldGame(game);
          BaseStore.emitChange();
        });
    } else {
      BaseStore.emitChange();
    }
  }
};

const _searchForOldGames = (name) => {
  rest(Config.server + '/history/search/' + name)
    .then((response) => {
      const jsonResponse = JSON.parse(response.entity);
      oldGames = jsonResponse.items;
      noResultsFound = oldGames.length === 0;
      BaseStore.emitChange();
    });
};

const _setActiveGame = (gameid) => {
  if (games.length > 0) {
    _activeGame = games.find(game => game.id === gameid);
  } else if (Socket.state() === 1) {
    rest(Config.server + '/history/' + gameid)
      .then((response) => {
        const test = JSON.parse(response.entity);
        console.log(JSON.stringify(test.messages));
        const game = test.messages.filter(event => event.type ===
                                          'se.cygni.snake.api.event.MapUpdateEvent')
                .map(type => type.map);
        _activeGame = GameRenderingFunction.addOldGame(game);
        BaseStore.emitChange();
      });
  } else if (_.isEmpty(_activeGame)) {
    activeGameId = gameid;
  }
};

const _initWS = (gameid) => {
  Socket.init(gameid);
};

const _getToken = () => localStorage.getItem('token');
const _getUser = () => localStorage.getItem('savedUser');

const _clearCredentials = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('savedUser');
};

const _logOutUser = () => {
  _clearCredentials();
  hashHistory.push('/');
};

const _invalidToken = () => {
  _clearCredentials();
  hashHistory.push('/auth');
};

function _isLoggedIn() {
  const _token = _getToken();
  return _token !== null && _token !== undefined;
}

const _createTournament = (name) => {
  Socket.init();
  Socket.send({
    tournamentName: name,
    type: 'se.cygni.snake.eventapi.request.CreateTournament',
    token: _getToken(),
  });
};

const _createTournamentTable = () => {
  Socket.send({
    type: 'se.cygni.snake.eventapi.request.UpdateTournamentSettings',
    token: _getToken(),
    gameSettings: tournament.gameSettings,
  });
};

const _startTournament = () => {
  localStorage.removeItem('gameplan');
  localStorage.removeItem('finalPlacement');
  Socket.send({
    type: 'se.cygni.snake.eventapi.request.StartTournament',
    token: _getToken(),
    tournamentId: tournament.tournamentId,
  });
  hashHistory.push('tournament/tournamentbracket');
};

const _getActiveTournament = () => {
  Socket.send({
    type: 'se.cygni.snake.eventapi.request.GetActiveTournament',
    token: _getToken(),
  });
};

const _tournamentCreated = (jsonData) => {
  tournament.tournamentName = jsonData.tournamentName;
  tournament.tournamentId = jsonData.tournamentId;
  tournament.gameSettings = jsonData.gameSettings;
};

const _updateGameplan = (jsonData) => {
  localStorage.setItem('gameplan', JSON.stringify(jsonData));
  tournamentGameplan = jsonData;
};

const _updatePlayers = (players) => {
  playerList = players;
};

const _getActiveGame = (gameid) => {
  if (_.isEmpty(_activeGame)) {
    _activeGame = games.find(game => game.id === gameid);
  }
  return _activeGame;
};

const _setActiveTournamentGame = (gameId) => {
  hashHistory.push('/tournament/' + gameId);
};

function _setUpdateFrequency(freq) {
  _activeGame.updateFrequency = freq;
}

const _setCurrentFrame = (frame) => {
  GameRenderingFunction.setCurrentFrame(_activeGame, frame);
};

const _updateSettings = (key, value) => {
  tournament.gameSettings[key] = value;
};

const _changeFrame = () => {
  if (_activeGame && _activeGame.started && _activeGame.running &&
    (_activeGame.currentFrame === 0 || _activeGame.currentFrame < _activeGame
      .mapEvents
      .length - 1)) {
    GameRenderingFunction.changeFrame(_activeGame);
    setTimeout(() => _changeFrame(), _activeGame.updateFrequency);
    BaseStore.emitChange();
  }
};

const _addMapUpdate = (event) => {
  if (event.gameId === _activeGame.id) {
    event.map.rendered = false;
    _activeGame.mapEvents.push(event.map);
  } else {
    const updatedGame = games.find(game => game.id === event.gameId);
    event.map.rendered = false;
    updatedGame.mapEvents.push(event.map);
  }
};

const _tournamentEnded = (event) => {
  finalPlacement.list = event.gameResult;
  finalPlacement.winner = finalPlacement.list.find(snake => snake.playerId ===
    event.playerWinnerId);
  localStorage.setItem('finalPlacement', JSON.stringify(finalPlacement));
};

const _killTournament = () => {
  Socket.send({
    tournamentId: tournament.tournamentId,
    type: 'se.cygni.snake.eventapi.request.KillTournament',
    token: _getToken(),
  });
};

const _loginUser = (action) => {
  if (_getToken() !== action.token) {
    localStorage.setItem('token', action.token);
    localStorage.setItem('savedUser', action.user);
    hashHistory.push('/tournament');
  }
};

const BaseStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getActiveGame() {
    return _getActiveGame();
  },

  getOldGames() {
    return oldGames;
  },

  hasResults() {
    return noResultsFound;
  },

  getActiveTournamentGame() {
    if (_.isEmpty(_activeGame) && localStorage.getItem('activeGame')) {
      const tmp = localStorage.getItem('activeGame');
      _activeGame = JSON.parse(tmp);
    }
    return _activeGame;
  },

  getFrameInfo() {
    if (_activeGame) {
      return {
        currentFrame: _activeGame.currentFrame,
        lastFrame: Math.max(0, _activeGame.mapEvents.length - 1),
      };
    }
    return {
      currentFrame: 0,
      lastFrame: 0,
    };
  },

  getActiveTournament() {
    return tournament;
  },

  getSettings() {
    return tournament.gameSettings;
  },

  getPlayerList() {
    return playerList;
  },

  getTournamentGameplan() {
    if (localStorage.getItem('gameplan')) {
      const tmp = localStorage.getItem('gameplan');
      tournamentGameplan = JSON.parse(tmp);
    }
    return tournamentGameplan;
  },

  getActivePlayers() {
    return _activeGame.players.sort((a, b) => b.points - a.points);
  },
  getFinalPlacement() {
    if (localStorage.getItem('finalPlacement')) {
      const tmp = localStorage.getItem('finalPlacement');
      finalPlacement = JSON.parse(tmp);
    }
    return finalPlacement;
  },

  getUpdateFrequencyForTournament() {
    if (_activeGame) {
      return _activeGame.updateFrequency;
    }
    return 100;
  },

  getTrainingGames() {
    return games;
  },

  hasActiveGame() {
    return !_.isEmpty(_activeGame);
  },

  getSnakes() {
    return (_activeGame && playerMap.get(_activeGame.id)) ? playerMap.get(
      _activeGame.id) : [];
  },

  startGame() {
    return startedGame;
  },

  initWS(gameid) {
    _initWS(gameid);
  },

  getSocketEvents() {
    return gameEvents;
  },

  getUser() {
    return _getUser();
  },

  getToken() {
    return _getToken();
  },

  isLoggedIn() {
    return _isLoggedIn();
  },

  requireAuth(nextState, replace) {
    if (!_isLoggedIn()) {
      replace({
        pathname: '/auth',
        state: {
          nextPathname: nextState.location.pathname,
        },
      });
    }
  },

  dispatherIndex: register((action) => {
    switch (action.actionType) {
      case Constants.START_TOURNAMENT_GAME:
        _startGame();
        _changeFrame();
        break;
      case Constants.ADD_GAMES:
        _addGames(action.games);
        break;
      case Constants.CREATE_TOURNAMENT:
        _createTournament(action.name);
        break;
      case Constants.CREATE_TOURNAMENT_TABLE:
        _createTournamentTable();
        break;
      case Constants.START_TOURNAMENT:
        _startTournament();
        break;
      case Constants.UPDATE_SETTINGS:
        _updateSettings(action.key, action.value);
        break;
      case Constants.TOURNAMENT_CREATED:
        _tournamentCreated(action.jsonData);
        break;
      case Constants.GAME_PLAN_RECEIVED:
        _updateGameplan(action.jsonData);
        break;
      case Constants.UPDATE_PLAYERS:
        _updatePlayers(action.players);
        break;
      case Constants.SET_ACTIVE_TOURNAMENT_GAME:
        _setActiveTournamentGame(action.gameId);
        break;
      case Constants.TOURNAMENT_ENDED_EVENT:
        _tournamentEnded(action.event);
        break;
      case Constants.KILL_TOURNAMENT:
        _killTournament();
        break;
      case Constants.SET_CURRENT_TOURNAMENT_FRAME:
        _setCurrentFrame(action.frame);
        break;
      case Constants.SET_UPDATE_FREQUENCY:
        _setUpdateFrequency(action.freq);
        break;
      case Constants.GET_ACTIVE_TOURNAMENT:
        _getActiveTournament();
        break;
      case Constants.START_GAME:
        _startGame();
        _changeFrame();
        break;
      case Constants.PAUSE_GAME:
        _activeGame.running = false;
        break;
      case Constants.RESUME_GAME:
        _activeGame.running = true;
        _changeFrame();
        break;
      case Constants.SET_ACTIVE_TRAINING_GAME:
        _setActiveGame(action.gameId);
        break;
      case Constants.SET_CURRENT_FRAME:
        _setCurrentFrame(action.frame);
        break;
      case Constants.MAP_UPDATE_EVENT:
        _addMapUpdate(action.event);
        break;
      case Constants.LOGIN_USER:
        _loginUser(action);
        break;
      case Constants.LOGOUT_USER:
        _logOutUser();
        break;
      case Constants.INVALID_TOKEN:
        _invalidToken();
        break;
      case Constants.SEARCH_FOR_OLD_GAMES_FOR_USER:
        _searchForOldGames(action.name);
        break;
      default:
        break;

    }
    BaseStore.emitChange();
  }),
});

export default BaseStore;
