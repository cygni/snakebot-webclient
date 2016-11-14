import { EventEmitter } from 'events';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import restclient from '../util/RestClient';
import Socket from '../websocket/WebSocket';
import { register } from '../dispatchers/AppDispatcher';
import Constants from '../constants/Constants';
import Colors from '../util/Colors';

const CHANGE_EVENT = 'change';
const UPDATE_FREQUENCY_STEP = 50;

const searchResults = {
  hasSearched: false,
  matchingGames: [],
};

let _tournament = {};
const _activeGameState = {};

const _hasActiveGame = () => !_.isEmpty(_activeGameState);

// Handling the frame updating
const _frameCount = () => {
  if (_hasActiveGame()) {
    return _activeGameState.mapEvents.length - 1;
  }
  return 0;
};

const _isLastFrame = () => _activeGameState.currentFrame >= _frameCount();

const _stopUpdatingFrames = () => {
  clearInterval(_activeGameState.frameChange);
  _activeGameState.frameChange = undefined;
  _activeGameState.running = false;
};

const _setNextFrame = (emitChange) => {
  if (_activeGameState.currentFrame >= _frameCount()) {
    console.log('Reached end of frames, pausing game');
    _stopUpdatingFrames();
    emitChange();
    return;
  }

  const nextFrame = _activeGameState.currentFrame + 1;
  const isValidIndex = nextFrame >= 0 && nextFrame <= _frameCount();
  if (!isValidIndex) {
    return;
  }

  _activeGameState.currentFrame = nextFrame;
  emitChange();
};

const _startUpdatingFrames = (emitChange) => {
  console.log('Starting to update frames', _activeGameState.updateFrequency);

  _stopUpdatingFrames();

  if (_activeGameState.started && !_isLastFrame()) {
    _activeGameState.running = true;
    _activeGameState.frameChange =
      setInterval(() => _setNextFrame(emitChange), _activeGameState.updateFrequency);
  }
};

// Utility functions

const _assignSnakeColors = (snakes) => {
  snakes.forEach((snake) => {
    if (!_activeGameState.colors[snake.id]) {
      _activeGameState.colors[snake.id] = Colors.getSnakeColor(_activeGameState.colorIndex);
      _activeGameState.colorIndex += 1;
    }
  });
};

const _renderObstacles = (emitChange) => {
  _activeGameState.renderObstacles = true;
  emitChange();
  _activeGameState.renderObstacles = false;
  emitChange();
};

// Requests to start the game

const _startGame = (emitChange) => {
  _activeGameState.started = true;
  _startUpdatingFrames(emitChange);

  console.log('Starting the game', _activeGameState);

  if (!_activeGameState.fetched) {
    console.log('Game has not been fetched, so ask the server to start it');
    Socket.send({
      gameId: _activeGameState.id,
      type: 'se.cygni.snake.eventapi.request.StartGame',
    });
    _activeGameState.fetched = true;
  }
};

const _startPrefetchingGame = () => {
  console.log('Starting the game', _activeGameState);

  if (!_activeGameState.fetched) {
    console.log('Game has not been fetched, so ask the server to start it');
    Socket.send({
      gameId: _activeGameState.id,
      type: 'se.cygni.snake.eventapi.request.StartGame',
    });
    _activeGameState.fetched = true;
  }
};


const _addGameInfo = (addedGames) => {
  const game = addedGames.find(g => g.gameId === _activeGameState.id);
  if (!game) {
    console.log('Games added did not match the id of the current game', addedGames, _activeGameState);
    return;
  }

  _activeGameState.players = game.players.map((snake) => {
    snake.positions = [];
    snake.points = 0;
    return snake;
  });
  _assignSnakeColors(game.players);
};

// Handling the logging in and out for a user

const _getToken = () => localStorage.getItem('token');
const _getUser = () => localStorage.getItem('savedUser');

const _clearCredentials = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('savedUser');
};

const _loginUser = (action) => {
  if (_getToken() !== action.token) {
    localStorage.setItem('token', action.token);
    localStorage.setItem('savedUser', action.user);
  }
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

// All _tournament-related actions

const _setActiveTournament = (_tournamentInfo) => {
  _tournament = _tournamentInfo;
  _tournament.finalPlacement = {
    list: [],
    winner: {},
  };
  console.log('Active tournament is set', _tournament);
};

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
    gameSettings: _tournament.gameSettings,
  });
};

const _startTournament = () => {
  Socket.send({
    type: 'se.cygni.snake.eventapi.request.StartTournament',
    token: _getToken(),
    _tournamentId: _tournament._tournamentId,
  });
  hashHistory.push('tournament/tournamentbracket');
};

const _tournamentCreated = (_tournamentInfo) => {
  _tournament = _tournamentInfo;
  _tournament.finalPlacement = {
    list: [],
    winner: {},
  };
};

const _tournamentEnded = (event) => {
  console.log('Tournament ended', _tournament, event);
  _tournament.finalPlacement.list = event.gameResult;
  _tournament.finalPlacement.list.sort((s1, s2) => s2.points - s1.points);
  _tournament.winner =
    _tournament.finalPlacement.list.find(
      snake => snake.playerId === event.playerWinnerId);

  console.log('Tournament final placements are', _tournament.finalPlacement);
};

const _killTournament = () => {
  Socket.send({
    _tournamentId: _tournament._tournamentId,
    type: 'se.cygni.snake.eventapi.request.KillTournament',
    token: _getToken(),
  });

  _tournament = {};
};

const _addMapEvent = (event, emitChange) => {
  if (event.gameId !== _activeGameState.id) {
    console.error('Received map event for a different game than the active one', event);
  }
  _activeGameState.mapEvents.push(event.map);
  _assignSnakeColors(event.map.snakeInfos);

  if (_activeGameState.mapEvents.length === 1) {
    _renderObstacles(emitChange);
  }

  if (!_activeGameState.frameChange) {
    _startUpdatingFrames(emitChange);
  }
};

const _addDeadSnakeEvent = (event) => {
  const mapEvent = _activeGameState.mapEvents[event.gameTick];

  const deadSnake = mapEvent.snakeInfos.find(snake =>
    snake.id === event.playerId
  );

  deadSnake.deathX = event.x;
  deadSnake.deathY = event.y;
  deadSnake.ttl = 3;
  deadSnake.worldTick = event.gameTick;
  _activeGameState.deadSnakes.push(deadSnake);
};

const _addDeadSnakeEvents = (events) => {
  events.forEach(event =>
    _addDeadSnakeEvent(event)
  );
};


// Methods using the the restclient
const _fetchActiveTournament = (emitChange) => {
  if (!_isLoggedIn()) {
    return;
  }

  restclient.fetchTournament(
    (activeTournament) => {
      _setActiveTournament(activeTournament);
      emitChange();
    });
};

const _moveToBracket = () => {
  hashHistory.push('tournament/tournamentbracket');
};

const _moveToNextTournamentGame = (id) => {
  const currentLevel = _tournament.gamePlan.tournamentLevels.find(level =>
    level.tournamentGames.find(game =>
      game.gameId === id
    )
  );

  if (currentLevel) {
    const nextGame = currentLevel.tournamentGames.find(game =>
      game.gamePlayed === false && game.gameId !== id
    );
    if (nextGame) {
      hashHistory.push('tournament/' + nextGame.gameId);
    } else {
      hashHistory.push('tournament/tournamentbracket');
    }
  } else {
    hashHistory.push('tournament/tournamentbracket');
  }
};

const _fetchActiveGame = (gameid, emitChange) => {
  console.log('Setting active game to ' + gameid);

  _activeGameState.id = gameid;
  _activeGameState.fetched = false;
  _activeGameState.started = false;
  _activeGameState.running = false;
  _activeGameState.currentFrame = 0;
  _activeGameState.updateFrequency = 200;
  _activeGameState.colors = {};
  _activeGameState.colorIndex = 0;
  _activeGameState.renderObstacles = false;
  _activeGameState.mapEvents = [];
  _activeGameState.players = [];
  _activeGameState.deadSnakes = [];

  restclient.fetchGame(
    gameid,
    (mapEvents, snakeDeadEvents) => {
      _activeGameState.mapEvents = mapEvents;
      _addDeadSnakeEvents(snakeDeadEvents);
      _assignSnakeColors(mapEvents[0].snakeInfos);
      _activeGameState.fetched = true;
      _renderObstacles(emitChange);
    });
};

const _fetchGamesByName = (name, emitChange) => {
  restclient.searchForGames(
    name,
    (matchingGames) => {
      searchResults.matchingGames = matchingGames;
      searchResults.hasSearched = true;
      emitChange();
    },
    () => {
      searchResults.matchingGames = [];
      searchResults.hasSearched = true;
      emitChange();
    });
};

const BaseStore = Object.assign({}, EventEmitter.prototype, {


  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getActiveGameState() {
    return _activeGameState;
  },

  getDeadSnakes() {
    return _activeGameState.deadSnakes;
  },

  getFrameCount() {
    return _frameCount();
  },

  isLastFrame() {
    _isLastFrame();
  },

  getSearchResults() {
    return searchResults;
  },

  getActiveTournament() {
    return _tournament;
  },

  getSettings() {
    return _tournament.gameSettings;
  },

  getPlayerList() {
    if (_tournament.gamePlan) {
      return _tournament.gamePlan.players;
    }

    return [];
  },

  getTournamentGamePlan() {
    return _tournament.gamePlan;
  },

  moveToNextTournamentGame(id) {
    _moveToNextTournamentGame(id);
  },

  moveToBracket() {
    _moveToBracket();
  },

  getTournamentWinner() {
    return _tournament.winner;
  },

  getFinalPlacement() {
    return _tournament.finalPlacement;
  },

  getUpdateFrequencyForTournament() {
    return _hasActiveGame() ? _activeGameState.updateFrequency : 100;
  },

  hasActiveGame() {
    return _hasActiveGame();
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
});

const emitChange = () => BaseStore.emitChange();

BaseStore.dispatcher = register(
  (action) => {
    console.log('Store received action', action);
    switch (action.actionType) {
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
        _tournament.gameSettings[action.key] = action.value;
        break;
      case Constants.TOURNAMENT_CREATED:
        _tournamentCreated(action.jsonData);
        break;
      case Constants.GAME_PLAN_RECEIVED:
        _tournament.gamePlan = action.jsonData;
        break;
      case Constants.SET_ACTIVE_TOURNAMENT_GAME:
        hashHistory.push('/tournament/' + action.gameId);
        break;
      case Constants.TOURNAMENT_ENDED_EVENT:
        _tournamentEnded(action.event);
        break;
      case Constants.KILL_TOURNAMENT:
        _killTournament();
        break;
      case Constants.INCREASE_UPDATE_FREQUENCY:
        _activeGameState.updateFrequency -= UPDATE_FREQUENCY_STEP;
        // ensure that the value never goes to 0
        _activeGameState.updateFrequency =
          Math.max(_activeGameState.updateFrequency, UPDATE_FREQUENCY_STEP);
        _startUpdatingFrames(emitChange);
        break;
      case Constants.DECREASE_UPDATE_FREQUENCY:
        _activeGameState.updateFrequency += UPDATE_FREQUENCY_STEP;
        _startUpdatingFrames(emitChange);
        break;
      case Constants.TOURNAMENT_INFO_RECEIVED:
        _setActiveTournament(action.jsonData);
        break;
      case Constants.START_GAME:
        _startGame(emitChange);
        break;
      case Constants.PAUSE_GAME:
        _stopUpdatingFrames();
        break;
      case Constants.RESUME_GAME:
        _startUpdatingFrames(emitChange);
        break;
      case Constants.RESTART_GAME:
        _activeGameState.currentFrame = 0;
        _startGame(emitChange);
        break;
      case Constants.SET_ACTIVE_GAME:
        Socket.init(action.gameId);
        _fetchActiveGame(action.gameId, emitChange);
        break;
      case Constants.ADD_GAMES:
        _addGameInfo(action.games);
        break;
      case Constants.SET_CURRENT_FRAME:
        _activeGameState.currentFrame = action.frame;
        _stopUpdatingFrames();
        break;
      case Constants.MAP_UPDATE_EVENT:
        _addMapEvent(action.event, emitChange);
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
        _fetchGamesByName(action.name, emitChange);
        break;
      case Constants.FETCH_ACTIVE_TOURNAMENT:
        _fetchActiveTournament(emitChange);
        break;
      case Constants.ADD_DEAD_SNAKE_EVENT:
        _addDeadSnakeEvent(action.event);
        break;
      case Constants.PREFETCH_GAME:
        _startPrefetchingGame();
        break;
      default:
        console.log('Store received unknown action', action);
        break;
    }

    BaseStore.emitChange();
  });

export default BaseStore;
