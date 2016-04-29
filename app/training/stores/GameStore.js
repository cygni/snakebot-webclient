import {register} from '../../dispatchers/AppDispatcher'
import Constants from '../constants/Constants'
import Socket from '../../websocket/WebSocket'
import BaseStore from '../../baseStore/BaseStore'
import GameRenderingFunction from '../../util/GameRenderingFunctions'
import AppAction from '../action/app-actions'

var _games = [];
var playerMap = new Map();

let _activeGame = undefined;

let activeGameSettings = {
    started: false,
    running:false
};
var startedGame = {};
var gameEvents = {};

const _addGames = (games) => {
    GameRenderingFunction.addGames(games, _games)
};

const _initWS = () => {
    Socket.init()
};

const _startGame = () => {
    Socket.send('{"includedGameIds": ["' + _activeGame.id + '"],"type":"se.cygni.snake.eventapi.request.SetGameFilter"}');
    Socket.send('{"gameId":"' + _activeGame.id + '","type":"se.cygni.snake.eventapi.request.StartGame"}');
    activeGameSettings.started = true;
    activeGameSettings.running = true;
};

const _setActiveGame = (id) => {
    _activeGame = _games.find(game => game.id === id);
};

const _setCurrentFrame = (frame) => {
    GameRenderingFunction.setCurrentFrame(_activeGame, frame)
};

const _setUpdateFrequency = (freq) => {
    _activeGame.updateFrequency = freq;
};

const _changeFrame = () => {
    if (activeGameSettings.started && activeGameSettings.running && (_activeGame.currentFrame == 0 || _activeGame.currentFrame <= _activeGame.mapEvents.length -1)) {
        GameRenderingFunction.changeFrame(_activeGame);
        setTimeout(() => _changeFrame(), _activeGame.updateFrequency);
        GameStore.emitChange();
    }


};

const _addMapUpdate = (event) => {
    var updatedGame = _games.find(game => game.id === event.gameId);
    updatedGame.mapEvents.push(event.map);
};

const GameStore = Object.assign(BaseStore, {
    getGames() {
        return _games;
    },

    getActiveGame() {
        return _activeGame;
    },

    getActiveGameSettings() {
        return activeGameSettings;
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

    initWS() {
        _initWS();
    },

    getSocketEvents() {
        return gameEvents;
    },

    getFrameInfo() {
        if (_activeGame) {
            return {currentFrame: _activeGame.currentFrame, lastFrame: Math.max(0, _activeGame.mapEvents.length - 1)};
        }
        return {currentFrame: 0, lastFrame: 0};
    },

    dispatherIndex: register(action => {
        switch (action.actionType) {
            case Constants.ADD_GAMES:
                _addGames(action.games);
                break;
            case Constants.START_GAME:
                _startGame();
                _changeFrame();
                break;
            case Constants.PAUSE_GAME:
                activeGameSettings.running = false;
                break;
            case Constants.RESUME_GAME:
                activeGameSettings.running = true;
                console.log("RESUME");
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
