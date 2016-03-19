import {dispatch, register} from '../dispatchers/app-dispatcher'
import AppConstants from '../constants/app-constants'
import {EventEmitter} from 'events'
import SockJS from 'sockjs-client'
import AppAction from '../action/app-actions'
import Immutable from 'immutable'


const CHANGE_EVENT = 'change';
var _games = [];
var playerMap = new Map();
var _activeGame = {};
var startedGame = {};
var gameEvents = {};
var active = false;
var socket = new SockJS('http://localhost:8080/events');
const HEIGHT = 500;
const WIDTH = 700;


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

var percentage = new Map([
    [ 1, 0.75 ],
    [ 2,  0.50 ],
    [ 3, 0.25 ],
    [4, 0.125]
]);


const _addGames = (games) => {
    games.map((game, index) => {
        let gameInArray = _games.find(gme => game.gameId === gme.id);
        if (gameInArray) {
            gameInArray.gameFeatures = game.gameFeatures;
            gameInArray.players = game.players;
        }
        else {
            let tmpGame = Object.assign(game);


            _games.push({
                "id": tmpGame.gameId,
                "gameFeatures": tmpGame.gameFeatures,
                "color": boardColors[index],
                "players": tmpGame.players,
                "world": createEmptyWorld(tmpGame.gameFeatures.width, tmpGame.gameFeatures.height),
                "tileHeight": HEIGHT / tmpGame.gameFeatures.height
            });
        }
        _addPlayers(game);
    })
};

const _addGameEvent = (game) => {
    //console.log("game " + game)
};

const _initWS = () => {
    socket.onopen = function () {
        _socketSend()
    };
    socket.onmessage = function (e) {
        var jsonData = JSON.parse(e.data);

        if (jsonData.type == "se.cygni.snake.api.event.MapUpdateEvent") {
            AppAction.mapUpdateEvent(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.websocket.event.api.ActiveGamesList") {
            AppAction.addGames(jsonData.games);
        }
        else {
            //console.log(jsonData);
        }

    }.bind(this);
    socket.onclose = function () {
        console.log('close');
    };
};

const _socketSend = () => {
    socket.send('{"type":"se.cygni.snake.websocket.event.api.ListActiveGames"}');
    setTimeout(_socketSend, 10000);
};

const _addPlayers = (game) => {
    let gameInMap = playerMap.get(game.id);
    let players = gameInMap ? gameInMap : [];

    game.players.forEach((player, index) => {
        if (!players.find(entry => entry.id === player.id)) {
            players.push({"index": index, "name": player.name, id: player.id, 'color': snakeColors[index]});
        }
    });
    playerMap.set(game.gameId, players);
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
    updatedGame.world = sortWorld(event.map);
    _updateSnakes(event.gameId, event.map.snakeInfos)
};

const _updateSnakes = (id, snakeList) => {
    let players = playerMap.get(id);
    snakeList.forEach(snake => {
        let tmpSnake = players.find(existingSnake => snake.id === existingSnake.id);
        if (tmpSnake) {
            tmpSnake.length = snake.length;
        }
        else {
            players.push({
                "id": snake.id,
                "name": snake.name,
                "length": snake.length,
                "color": snakeColors[players.length]
            })
        }
    })
};

function createEmptyWorld(boardWidth, boardHeight) {
    let tiles = [];
    let tileHeight = HEIGHT / boardHeight;
    let tileWidth = WIDTH / boardWidth;
    for (let i = 0; i < boardHeight; i++) {
        let emptyTileRow = [];
        for (let j = 0; j < boardWidth; j++) {
            let key = "" + i + "-" + j;
            emptyTileRow.push({
                    "key": key,
                    "height": tileHeight,
                    "width": tileWidth,
                    "color": "",
                    "gradient": 1,
                    "tail": false,
                    "type": "empty"
                }
            )
        }
        tiles.push(emptyTileRow);
    }
    return tiles
}

function sortWorld(world) {
    let tiles = [];
    let tileHeight = HEIGHT / world.height;
    let tileWidth = WIDTH / world.width;

    for (let i = 0; i < world.tiles.length; i++) {
        let tileRow = [];
        let tileList = Immutable.List(world.tiles[i]);
        for (let j = 0; j < tileList.size; j++) {
            let key = "" + i + "-" + j;
            let tile = tileList.get(j);
            tileRow.push(buildTileObject(tile, key, tileHeight, tileWidth))
        }
        tiles.push(tileRow);
    }

    return tiles;
}

function buildTileObject(tile, key, tileHeight, tileWidth) {

    let item = {};

    switch (tile.content) {
        case "empty":
        {
            item = {
                "key": key,
                "height": tileHeight,
                "width": tileWidth,
                "color": "",
                "gradient": 1,
                "tail": false,
                "type": "empty"
            };
            break;
        }
        case "snakebody" :
        {
            let snake = playerMap.get(_activeGame.id).find(snake => snake.id === tile.playerId);
            let opacity = 1;

            if (tile.order > 4) {
                let op = percentage.get(Math.floor(tile.order / 4));
                if (op) {
                    opacity = op;
                }
                else {
                    opacity = 0.125;
                }
            }

            console.log(opacity);

            item = {
                "key": key,
                "height": tileHeight,
                "width": tileWidth,
                "color": snake.color,
                "gradient": opacity,
                "tail": tile.tail,
                "type": "snakebody"
            };
            break;
        }
        case "snakehead" :
        {
            let snake = playerMap.get(_activeGame.id).find(snake => snake.id === tile.playerId);
            item = {
                "key": key,
                "height": tileHeight,
                "width": tileWidth,
                "color": snake ? snake.color : "white",
                "gradient": 1,
                "tail": tile.tail,
                "type": "snakehead"
            };
            break;
        }


        case "obstacle" :
        {
            item = {
                "key": key,
                "height": tileHeight,
                "width": tileWidth,
                "color": "black",
                "gradient": 1,
                "tail": false,
                "type": "obstacle"
            };
            break;
        }

        case "food" :
        {
            item = {
                "key": key,
                "height": tileHeight,
                "width": tileWidth,
                "color": "green",
                "gradient": 1,
                "tail": false,
                "type": "food"
            };
            break;
        }
        default :
        {
            console.log("default: " + tile.content);
        }
    }

    return item;
}


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