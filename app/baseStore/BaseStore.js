import {
  EventEmitter,
} from 'events';
import {
  hashHistory,
} from 'react-router';
import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';
import _ from 'lodash';
import Config from 'Config'; // eslint-disable-line

// For now, let's ignore this rule until a proper fix can be done
/* eslint-disable no-use-before-define */

import Socket from '../websocket/WebSocket';
import {
  register,
} from '../dispatchers/AppDispatcher';
import Constants from '../constants/Constants';
import Colors from '../util/Colors';

const CHANGE_EVENT = 'change';

let oldGames = [];

let tournament = {};
const games = [];
const _activeGameState = {};

// TODO handle if we're in replay mode or not, probably using a state variable or similar
// TODO fetch tournaments via rest rather than an async api call

const _startGame = () => {
  _activeGameState.started = true;
  _startUpdatingFrames();

  console.log('Starting the game', _activeGameState, _getActiveGame());

  if (!_activeGameState.fetched) {
    console.log('Game has not been fetched, so ask the server to start it');
    Socket.send({
      gameId: _activeGameState.id,
      type: 'se.cygni.snake.eventapi.request.StartGame',
    });
    _activeGameState.fetched = true;
  }
};

const _hasActiveGame = () => !_.isEmpty(_activeGameState) && _getActiveGame();
const _getRestClient = () => rest.wrap(mime).wrap(errorCode);

const _getActiveTournament = () => {
  // this will be improved
  if (_.isEmpty(tournament)) {
    Socket.init();
    return;
  }
};

const _setActiveGame = (gameid) => {
  _activeGameState.id = gameid;
  _activeGameState.fetched = false;
  _activeGameState.started = false;
  _activeGameState.running = false;
  _activeGameState.currentFrame = 0;
  _activeGameState.updateFrequency = 200;
  _activeGameState.colors = {};
  _activeGameState.colorIndex = 0;

  games[gameid] = {
    gameid,
    mapEvents: [],
  };

  const client = _getRestClient();
  client({ path: Config.server + '/history/' + _activeGameState.id })
    .then((response) => {
      const json = response.entity;
      const mapUpdateEvent = 'se.cygni.snake.api.event.MapUpdateEvent';
      const mapEvents = json
              .messages
              .filter(event => event.type === mapUpdateEvent)
              .map(type => type.map);

      games[gameid].mapEvents = mapEvents;
      _assignSnakeColors(mapEvents[0]);
      _activeGameState.fetched = true;
    }, (error) => {
      console.log('Unable to fetch game', _activeGameState.id, error);
      console.log('Attempting to subscribing to the game instead');

      Socket.send({
        includedGameIds: [_activeGameState.id],
        type: 'se.cygni.snake.eventapi.request.SetGameFilter',
      });
    });
};

const _assignSnakeColors = (mapEvent) => {
  mapEvent.snakeInfos.forEach((snake) => {
    if (!_activeGameState.colors[snake.id]) {
      _activeGameState.colors[snake.id] = Colors.getSnakeColor(_activeGameState.colorIndex);
      _activeGameState.colorIndex += 1;
    }
  });
};

const _searchForOldGames = (name) => {
  console.log('Searching for games with name = \'' + name + '\'');
  rest(Config.server + '/history/search/' + name)
    .then(
      (response) => {
        const jsonResponse = JSON.parse(response.entity);
        console.log('Searching for games found:', jsonResponse.items);

        oldGames = jsonResponse.items;
        BaseStore.emitChange();
      },
      (response) => {
        console.error('Search for games got error response:', response);
      }
    );
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
  Socket.send({
    type: 'se.cygni.snake.eventapi.request.StartTournament',
    token: _getToken(),
    tournamentId: tournament.tournamentId,
  });
  hashHistory.push('tournament/tournamentbracket');
};

const _setActiveTournament = (tournamentInfo) => {
  tournament = tournamentInfo;
  console.log('Active tournament is set', tournament);
};

const _tournamentCreated = (tournamentInfo) => {
  tournament = tournamentInfo;
  tournament.finalPlacement = {
    list: [],
    winner: {},
  };
};

const _updateGamePlan = (jsonData) => {
  tournament.gamePlan = jsonData;
};

const _getActiveGame = () => games[_activeGameState.id];

function _setUpdateFrequency(freq) {
  _activeGameState.updateFrequency = freq;
}

const _setCurrentFrame = (frame) => {
  _activeGameState.currentFrame = frame;
  BaseStore.emitChange();
};

const _updateSettings = (key, value) => {
  tournament.gameSettings[key] = value;
};

const _frameCount = () => {
  if (_hasActiveGame()) {
    return _getActiveGame().mapEvents.length - 1;
  }
  return 0;
};

const _setNextFrame = () => {
  if (_activeGameState.currentFrame >= _frameCount()) {
    console.log('Reached end of frames, pausing game');
    _stopUpdatingFrames();
    return;
  }

  const nextFrame = _activeGameState.currentFrame + 1;
  const isValidIndex = nextFrame >= 0 && nextFrame <= _frameCount();
  if (!isValidIndex) {
    return;
  }

  _activeGameState.currentFrame = nextFrame;
  BaseStore.emitChange();
};

const _stopUpdatingFrames = () => {
  clearInterval(_activeGameState.frameChange);
  _activeGameState.running = false;
  BaseStore.emitChange();
};

const _startUpdatingFrames = () => {
  _stopUpdatingFrames();

  if (_activeGameState.started && _activeGameState.currentFrame < _frameCount()) {
    _activeGameState.running = true;
    _activeGameState.frameChange =
      setInterval(() => _setNextFrame(), _activeGameState.updateFrequency);
  }

  BaseStore.emitChange();
};

const _addMapUpdate = (event) => {
  const id = event.gameId;
  const game = id === _activeGameState.id ? _getActiveGame() : games[id];

  game.mapEvents.push(event.map);
  _assignSnakeColors(event.map);
  _activeGameState.running = true;
  BaseStore.emitChange();
};

const _tournamentEnded = (event) => {
  console.log('Tournament ended', tournament, event);
  tournament.finalPlacement.list = event.gameResult;
  tournament.finalPlacement.winner =
    tournament.finalPlacement.list.find(
      snake => snake.playerId === event.playerWinnerId);

  console.log('Tournament final placements are', tournament.finalPlacement);
};

const _killTournament = () => {
  Socket.send({
    tournamentId: tournament.tournamentId,
    type: 'se.cygni.snake.eventapi.request.KillTournament',
    token: _getToken(),
  });

  tournament = {};
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
    if (_hasActiveGame()) {
      return _getActiveGame();
    }
    _getActiveTournament();
    return {};
  },

  getActiveGameState() {
    return _activeGameState;
  },

  getFrameCount() {
    return _frameCount();
  },

  getOldGames() {
    return oldGames;
  },

  hasResults() {
    return oldGames.length === 0;
  },

  getActiveTournament() {
    return tournament;
  },

  getSettings() {
    return tournament.gameSettings;
  },

  getPlayerList() {
    if (tournament.gamePlan) {
      return tournament.gamePlan.players;
    }

    return [];
  },

  getTournamentGamePlan() {
    return tournament.gamePlan;
  },

  getActivePlayers() {
    return tournament.gamePlan.players.sort((a, b) => b.points - a.points);
  },

  getFinalPlacement() {
    return tournament.finalPlacement;
  },

  getUpdateFrequencyForTournament() {
    return _hasActiveGame() ? _activeGameState.updateFrequency : 100;
  },

  getTrainingGames() {
    return games;
  },

  hasActiveGame() {
    return _hasActiveGame();
  },

  initWS(gameid) {
    _initWS(gameid);
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
    console.log('Store received action', action);
    switch (action.actionType) {
      case Constants.SOCKET_IS_OPEN:
        Socket.send({
          type: 'se.cygni.snake.eventapi.request.GetActiveTournament',
          token: _getToken(),
        });
        _getActiveTournament();
        break;
      case Constants.START_TOURNAMENT_GAME:
        _startGame();
        break;
      case Constants.ADD_GAMES:
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
        _updateGamePlan(action.jsonData);
        break;
      case Constants.SET_ACTIVE_TOURNAMENT_GAME:
        hashHistory.push('/tournament/' + action.gameId);
        _setActiveGame(action.gameId);
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
      case Constants.TOURNAMENT_INFO_RECEIVED:
        _setActiveTournament(action.jsonData);
        break;
      case Constants.START_GAME:
        _startGame();
        _startUpdatingFrames();
        break;
      case Constants.PAUSE_GAME:
        _stopUpdatingFrames();
        break;
      case Constants.RESUME_GAME:
        _startUpdatingFrames();
        break;
      case Constants.RESTART_GAME:
        _activeGameState.currentFrame = 0;
        _startGame();
        _startUpdatingFrames();
        break;
      case Constants.SET_ACTIVE_TRAINING_GAME:
        _setActiveGame(action.gameId);
        break;
      case Constants.SET_CURRENT_FRAME:
        _setCurrentFrame(action.frame);
        _stopUpdatingFrames();
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
