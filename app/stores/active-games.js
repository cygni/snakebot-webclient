import {dispatch, register} from '../dispatchers/app-dispatcher'
import AppConstants from '../constants/app-constants'
import {EventEmitter} from 'events'
import SockJS from 'sockjs-client'
import AppAction from '../action/app-actions'
import BoardUtils from '../util/board-utils'
import TileUtils from '../util/tile-utils'


const CHANGE_EVENT = 'change';
var _games = [];
var playerMap = new Map();
var _activeGame = {};
var startedGame = {};
var gameEvents = {};
var active = false;
var socket = new SockJS('http://localhost:8080/events');

var boardColors = [
    ["#F44336", "#EF9A9A"],
    ["#9C27B0", "#BA68C8"],
    ["#3F51B5", "#9FA8DA"],
    ["#2196F3", "#BBDEFB"],
    ["#03A9F4", "#81D4FA"],
    ["#00BCD4", "#B2EBF2"],
    ["#009688", "#B2DFDB"],
    ["#CAF50", "#C8E6C9"],
    ["#CDDC39", "#F0F4C3"],
    ["#FFEB3B", "#FFF59D"],
    ["#FF9800", "#FFE0B2"],
    ["#FF5722", "#FF8A65"],
    ["#795548", "#A1887F"],
    ["#9E9E9E", "#E0E0E0"],
    ["#607D8B", "#B0BEC5"]
];

var snakeColors = [
    'red',
    'black',
    'blue',
    'grey',
    'pink'
];

const _addGames = (games) => {
    let tmpGameList = [];
    games.map((game, index) => {
        let gameInArray = _games.find(gme => game.gameId === gme.id);
        if (gameInArray) {
            gameInArray.gameFeatures = game.gameFeatures;
            game.players.forEach((player, index) => {
                if (! gameInArray.players.find(entry => entry.id === player.id)) {
                    gameInArray.players.push({"index": index, "name": player.name, id: player.id, 'color': snakeColors[index], "alive": true});
                }
            });

            tmpGameList.push(gameInArray);
        }
        else {
            let tmpGame = Object.assign(game);
            let players = [];

            game.players.forEach((player, index) => {
                    players.push({"index": index, "name": player.name, id: player.id, 'color': snakeColors[index]});
            });


            tmpGameList.push({
                "id": tmpGame.gameId,
                "gameFeatures": tmpGame.gameFeatures,
                "color": boardColors[index],
                "players": players
            });
        }
    });

    if(active) {
        let game = tmpGameList.find(game => game.id === _activeGame.id);
        if (!game) {
            tmpGameList.push(_activeGame);
        }
    }
    _games = tmpGameList;
};

const _initWS = () => {
    socket.onmessage = function (e) {
        var jsonData = JSON.parse(e.data);

        if (jsonData.type == "se.cygni.snake.api.event.MapUpdateEvent") {
            AppAction.mapUpdateEvent(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.websocket.event.api.ActiveGamesList") {
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
    socket.send('{"includedGameIds": ["' + _activeGame.id + '"],"type":"se.cygni.snake.websocket.event.api.SetGameFilter"}');
    socket.send('{"gameId":"' + _activeGame.id + '","type":"se.cygni.snake.websocket.event.api.StartGame"}');
};

const _setActiveGame = (id) => {
    _activeGame = _games.find(game => game.id === id);
    active = true;
};

const _addMapUpdate = (event) => {
    var updatedGame = _games.find(game => game.id === event.gameId);
    _updateSnakes(updatedGame.players, event.map.snakeInfos);

    event.map.foodPositions = event.map.foodPositions.map(function(pos) { return TileUtils.getTileCoordinate(pos, event.map.width); });
    event.map.obstaclePositions = event.map.obstaclePositions.map(function(pos) { return TileUtils.getTileCoordinate(pos, event.map.width); });
    event.map.snakeInfos.forEach(snake => {
      snake.positions = snake.positions.map(function(pos) { return TileUtils.getTileCoordinate(pos, event.map.width); });
    });

    updatedGame.map = event.map;
};

function _updateSnakes (oldList, snakeList) {
    snakeList.forEach(snake => {
        let tmpSnake = oldList.find(existingSnake => snake.id === existingSnake.id);
        if (tmpSnake ) {
            tmpSnake.points = snake.points;
            tmpSnake.length = snake.positions.length;
            if(snake.positions.length <= 0) {
                tmpSnake.color = "grey";
                tmpSnake.alive = false;
            }
        }
        else {
            oldList.push({
                "id": snake.id,
                "name": snake.name,
                "length": snake.positions.length,
                "color": snakeColors[oldList.length],
                "alive": snake.positions.length <= 0,
                "points": snake.points
            })
        }
    })
};

const AppStore = Object.assign(EventEmitter.prototype, {
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
        return active;
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

    dispatherIndex: register(action => {
        switch (action.actionType) {
            case AppConstants.ADD_GAMES:
                _addGames(action.games);
                break;
            case AppConstants.START_GAME:
                _startGame();
                break;
            case AppConstants.ACTIVE_GAME:
                _setActiveGame(action.id);
                break;
            case AppConstants.MAP_UPDATE_EVENT:
                _addMapUpdate(action.event);
                break;
        }

        AppStore.emitChange()
    })
});

export default AppStore
