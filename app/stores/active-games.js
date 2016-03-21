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
            game.players.forEach((player, index) => {
                if (! gameInArray.players.find(entry => entry.id === player.id)) {
                    gameInArray.players.push({"index": index, "name": player.name, id: player.id, 'color': snakeColors[index]});
                }
            });
        }
        else {
            let tmpGame = Object.assign(game);

            let size = calculateSize(tmpGame.gameFeatures.width, tmpGame.gameFeatures.height);
            let tileSize = size[1] / tmpGame.gameFeatures.height;
            let players = [];

            game.players.forEach((player, index) => {
                    players.push({"index": index, "name": player.name, id: player.id, 'color': snakeColors[index]});
            });


            _games.push({
                "id": tmpGame.gameId,
                "gameFeatures": tmpGame.gameFeatures,
                "color": boardColors[index],
                "players": players,
                "world": createEmptyWorld(tmpGame.gameFeatures.width, tmpGame.gameFeatures.height, tileSize),
                "tileSize": tileSize,
                "height": size[1],
                "width": size[0]
            });
        }
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

//const _addPlayers = (game) => {
//    let gameInMap = playerMap.get(game.id);
//    let players = gameInMap ? gameInMap : [];
//
//    game.players.forEach((player, index) => {
//        if (!players.find(entry => entry.id === player.id)) {
//            players.push({"index": index, "name": player.name, id: player.id, 'color': snakeColors[index]});
//        }
//    });
//    playerMap.set(game.gameId, players);
//};

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
    _updateSnakes(updatedGame.players, event.map.snakeInfos)
};

const _updateSnakes = (oldList, snakeList) => {
    snakeList.forEach(snake => {
        let tmpSnake = oldList.find(existingSnake => snake.id === existingSnake.id);
        if (tmpSnake) {
            tmpSnake.length = snake.length;
        }
        else {
            oldList.push({
                "id": snake.id,
                "name": snake.name,
                "length": snake.length,
                "color": snakeColors[oldList.length]
            })
        }
    })
};

function createEmptyWorld(boardWidth, boardHeight, size) {
    let tiles = [];

    for (let i = 0; i < boardHeight; i++) {
        let emptyTileRow = [];
        for (let j = 0; j < boardWidth; j++) {
            let key = "" + i + "-" + j;
            emptyTileRow.push({
                    "key": key,
                    "height": size,
                    "width": size,
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

    let size = calculateSize(world.width, world.height);
    let tileSize = size[1] / world.height;

    for (let i = 0; i < world.tiles.length; i++) {
        let tileRow = [];
        let tileList = Immutable.List(world.tiles[i]);
        for (let j = 0; j < tileList.size; j++) {
            let key = "" + i + "-" + j;
            let tile = tileList.get(j);
            tileRow.push(buildTileObject(tile, key, tileSize))
        }
        tiles.push(tileRow);
    }

    return tiles;
}

function buildTileObject(tile, key, tileSize) {

    let item = {};

    switch (tile.content) {
        case "empty":
        {
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
                "color": "",
                "gradient": 1,
                "tail": false,
                "type": "empty"
            };
            break;
        }
        case "snakebody" :
        {
            console.log("players");
            console.log(_activeGame.players);
            let snake = _activeGame.players.find(snake => snake.id === tile.playerId);

            console.log("snake");
            console.log(snake);
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
                "height": tileSize,
                "width": tileSize,
                "color": snake.color,
                "gradient": opacity,
                "tail": tile.tail,
                "type": "snakebody"
            };
            break;
        }
        case "snakehead" :
        {
            let snake = _activeGame.players.find(snake => snake.id === tile.playerId);
            item = {
                "key": key,
                "height": tileSize,
                "width": tileSize,
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
                "height": tileSize,
                "width": tileSize,
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
                "height": tileSize,
                "width": tileSize,
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

function calculateSize (width, height) {
    if(width === height) {
        return [750, 750];
    }
    else{
        if(width > height) {
            let ratio = width/height;
            return [750, 750/ratio]
        }
        else {
            let ratio = height/width;
            return [750/ratio, 750]
        }
    }
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