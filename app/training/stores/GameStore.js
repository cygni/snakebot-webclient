import {dispatch, register} from '../../dispatchers/AppDispatcher'
import Constants from '../constants/Constants'
import {EventEmitter} from 'events'
import SockJS from 'sockjs-client'
import AppAction from '../action/app-actions'

import TileUtils from '../../util/TileUtils'

const CHANGE_EVENT = 'change';
var _games = [];
var playerMap = new Map();
var _activeGame = undefined;
var startedGame = {};
var gameEvents = {};
var socket = new SockJS('http://localhost:8080/events');

const _addGames = (games) => {
    games.map((game, index) => {
        if(_games.find(g => game.gameId === g.id)){
          return;
        }

        let players = [];
        game.players.forEach((player, index) => {
          players.push({"index": index, "name": player.name, id: player.id, 'color': snakeColors[index]});
        });

        _games.push({
               "id": game.gameId,
               "gameFeatures": game.gameFeatures,
               "color": boardColors[_games.length],
               "players": players,
               "currentFrame": 0,
               "mapEvents": [],
               "updateFrequency": 500
           });
    });
};

const _initWS = () => {
    socket.onmessage = function (e) {
        var jsonData = JSON.parse(e.data);

        if (jsonData.type == "se.cygni.snake.api.event.MapUpdateEvent") {
            AppAction.mapUpdateEvent(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.eventapi.response.ActiveGamesList") {
            AppAction.addGames(jsonData.games);
        }
        else {
            console.log(jsonData);
        }

    }.bind(this);

    socket.onclose = function () {
        console.log('close');
    };
};

const _startGame = () => {
    socket.send('{"includedGameIds": ["' + _activeGame.id + '"],"type":"se.cygni.snake.eventapi.request.SetGameFilter"}');
    socket.send('{"gameId":"' + _activeGame.id + '","type":"se.cygni.snake.eventapi.request.StartGame"}');
};

const _setActiveGame = (id) => {
    _activeGame = _games.find(game => game.id === id);
};

const _addMapUpdate = (event) => {
    var updatedGame = _games.find(game => game.id === event.gameId);
    _parseSnakes(updatedGame.players, event.map.snakeInfos);

    event.map.foodPositions = event.map.foodPositions.map(function(pos) { return TileUtils.getTileCoordinate(pos, event.map.width); });
    event.map.obstaclePositions = event.map.obstaclePositions.map(function(pos) { return TileUtils.getTileCoordinate(pos, event.map.width); });
    event.map.snakeInfos.forEach(snake => {
      snake.positions = snake.positions.map(function(pos) { return TileUtils.getTileCoordinate(pos, event.map.width); });
    });

    updatedGame.mapEvents.push(event.map);
};

function _parseSnakes (oldList, snakeList) {
    snakeList.forEach(snake => {
        if (oldList.find(existingSnake => snake.id === existingSnake.id) ) {
          return;
        }

        oldList.push({
            "id": snake.id,
            "name": snake.name,
            "length": snake.positions.length,
            "color": snakeColors[oldList.length],
            "alive": snake.positions.length <= 0,
            "points": snake.points
        });
    })
}

const _updateSnakes = (playerList, frame) => {
  frame.snakeInfos.forEach(snake => {
    var player = playerList.find(p => p.id === snake.id);
    if(!player){
      console.log("unable to find player");
      return;
    }

    player.points = snake.points;
    player.length = snake.positions.length;
    player.alive = snake.positions.length > 0;
  });
};

const _changeFrame = () => {
  if(GameStore.isGameRunning() && GameStore.isGamePaused() == false)
    setTimeout(() => _changeFrame(), _activeGame.updateFrequency);

  _activeGame.currentFrame = Math.max(0, Math.min(_activeGame.currentFrame + 1, _activeGame.mapEvents.length - 1));
  _updateSnakes(_activeGame.players, _activeGame.mapEvents[_activeGame.currentFrame]);

  GameStore.emitChange();
};

function _setUpdateFrequency(freq){
  _activeGame.updateFrequency = freq;
}

function _setCurrentFrame(frame){
  _activeGame.currentFrame = frame;
  _updateSnakes(_activeGame.players, _activeGame.mapEvents[_activeGame.currentFrame]);
}

const GameStore = Object.assign(EventEmitter.prototype, {
    emitChange () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    getGames() {
        return _games;
    },

    getActiveGame() {
        return _activeGame;
    },

    hasActiveGame() {
        return !!_activeGame;
    },

    getSnakes() {
        return (_activeGame && playerMap.get(_activeGame.id)) ? playerMap.get(_activeGame.id) : [];
    },

    startGame() {
        return startedGame;
    },

    isGamePaused() {
        return !!(_activeGame && _activeGame.paused);

    },

    isGameRunning() {
        return !!(_activeGame && _activeGame.running);

    },

    getUpdateFrequency() {
      if(_activeGame)
        return _activeGame.updateFrequency;
      return 100;
    },

    initWS() {
        _initWS();
    },

    getSocketEvents() {
        return gameEvents;
    },

    getFrameInfo() {
      if(_activeGame)
        return {currentFrame: _activeGame.currentFrame, lastFrame: Math.max(0, _activeGame.mapEvents.length - 1)};
      return { currentFrame: 0, lastFrame: 0};
    },

    dispatherIndex: register(action => {
        switch (action.actionType) {
            case Constants.ADD_GAMES:
                _addGames(action.games);
                break;
            case Constants.START_GAME:
                _startGame();
                _activeGame.running = true;
                _changeFrame();
                break;
            case Constants.PAUSE_GAME:
                _activeGame.paused = true;
                break;
            case Constants.RESUME_GAME:
                _activeGame.paused = false;
                _changeFrame();
                break;
            case Constants.ACTIVE_GAME:
                _setActiveGame(action.id);
                break;
            case Constants.SET_UPDATE_FREQUENCY:
                _setUpdateFrequency(action.freq);
                break;
            case Constants.SET_CURRENT_FRAME:
                _setCurrentFrame(action.frame);
                break;
            case Constants.MAP_UPDATE_EVENT:
                _addMapUpdate(action.event);
                break;
        }

        GameStore.emitChange();
    })
});

export default GameStore;
