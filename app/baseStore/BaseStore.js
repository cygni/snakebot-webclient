import {EventEmitter} from 'events'
const CHANGE_EVENT = 'change';
import Socket from '../websocket/WebSocket'
import {register} from '../dispatchers/AppDispatcher'
import Constants from '../constants/Constants'
import GameRenderingFunction from '../util/GameRenderingFunctions'
import Colors from '../util/Colors'
import {hashHistory} from 'react-router'


let _activeGame = undefined;
let finalPlacement = {
    winner: {},
    list: []
};
let playerList = [];
let tournament = {};
let tournamentGameplan = {
    tournamentLevels: []
};
let activeTournamentGame = undefined;
let games = [];

let playerMap = new Map();

// let activeGameSettings = {
//     started: false,
//     running: false
// };
let startedGame = {};
let gameEvents = {};

const _startGame = () => {
    _activeGame.started = true;
    _activeGame.running = true;
    Socket.send('{"includedGameIds": ["' + _activeGame.id + '"],"type":"se.cygni.snake.eventapi.request.SetGameFilter"}');
    Socket.send('{"gameId":"' + _activeGame.id + '","type":"se.cygni.snake.eventapi.request.StartGame"}');
};

const _initWS = () => {
    Socket.init()
};


const _addGames = (gamesList) => {
    GameRenderingFunction.addGames(gamesList, games);
};


// const _startGame = () => {
//     Socket.send('{"includedGameIds": ["' + _activeGame.id + '"],"type":"se.cygni.snake.eventapi.request.SetGameFilter"}');
//     Socket.send('{"gameId":"' + _activeGame.id + '","type":"se.cygni.snake.eventapi.request.StartGame"}');
//
// };

const _setActiveGame = (id) => {
    _activeGame = games.find(game => game.id === id);
    localStorage.setItem("activeGame", JSON.stringify(_activeGame))
};


const _createTournament = (name) => {
    Socket.init();
    Socket.send('{"tournamentName":"' + name + '","type":"se.cygni.snake.eventapi.request.CreateTournament", "token":"token-here"}');
};

const _createTournamentTable = () => {
    Socket.send('{"type":"se.cygni.snake.eventapi.request.UpdateTournamentSettings", "token":"token-here", "gameSettings": ' + JSON.stringify(tournament.gameSettings) + '}');
};

const _startTournament = () => {
    localStorage.removeItem("gameplan");
    localStorage.removeItem("finalPlacement");
    Socket.send('{"type":"se.cygni.snake.eventapi.request.StartTournament", "token":"token-here", "tournamentId":"' + tournament.tournamentId + '"}');
    hashHistory.push('tournament/tournamentbracket');
};

const _getActiveTournament = () => {
    Socket.send('{"type":"se.cygni.snake.eventapi.request.GetActiveTournament", "token":"token-here"}');
};

const _tournamentCreated = (jsonData) => {
    tournament.tournamentName = jsonData.tournamentName;
    tournament.tournamentId = jsonData.tournamentId;
    tournament.gameSettings = jsonData.gameSettings;
};

const _updateGameplan = (jsonData) => {
    localStorage.setItem("gameplan", JSON.stringify(jsonData));
    tournamentGameplan = jsonData
};

const _updatePlayers = (players) => {
    playerList = players;
};

const _setActiveTournamentGame = (gameId) => {
    let game = games.find(game => game.gameId == gameId);
    let players = [];
    game.players.forEach((player, index) => {
        players.push({"index": index, "name": player.name, id: player.id, 'color': Colors.getSnakeColor()[index]});
    });

    activeTournamentGame = {
        "id": game.gameId,
        "gameFeatures": game.gameFeatures,
        "color": Colors.getBoardColor()[0],
        "players": players,
        "currentFrame": 0,
        "mapEvents": [],
        "updateFrequency": 250
    };
    localStorage.setItem("activeTournamentGame", JSON.stringify(activeTournamentGame));
    hashHistory.push('/tournament/activeTournamentGame');
};


// const _updateSnakes = (playerList, frame) => {
//     if (frame) {
//         frame.snakeInfos.forEach(snake => {
//             var player = playerList.find(p => p.id === snake.id);
//             if (!player) {
//                 console.log("unable to find player");
//                 return;
//             }
//             player.points = snake.points;
//             player.length = snake.positions.length;
//             player.alive = snake.positions.length > 0;
//         });
//     }
// };

function _setUpdateFrequency(freq) {
    _activeGame.updateFrequency = freq;
}

// function _setCurrentFrame(frame) {
//     activeTournamentGame.currentFrame = frame;
//     _updateSnakes(activeTournamentGame.players, activeTournamentGame.mapEvents[activeTournamentGame.currentFrame]);
// }

const _setCurrentFrame = (frame) => {
    GameRenderingFunction.setCurrentFrame(_activeGame, frame)
};


const _updateSettings = (key, value) => {
    tournament.gameSettings[key] = value;
};

const _changeFrame = () => {
    console.log("Change frame: " + JSON.stringify(_activeGame.running));
    if (_activeGame && _activeGame.started && _activeGame.running &&
        (_activeGame.currentFrame == 0 || _activeGame.currentFrame < _activeGame.mapEvents.length - 1)) {
        console.log(_activeGame.currentFrame);
        GameRenderingFunction.changeFrame(_activeGame);
        setTimeout(() => _changeFrame(), _activeGame.updateFrequency);
        BaseStore.emitChange();
    }
};

const _addMapUpdate = (event) => {
    var updatedGame = games.find(game => game.id === event.gameId);
    updatedGame.mapEvents.push(event.map);
};

// const _addMapUpdate = (event) => {
//     _parseSnakes(activeTournamentGame.players, event.map.snakeInfos);
//
//     event.map.foodPositions = event.map.foodPositions.map(function (pos) {
//         return TileUtils.getTileCoordinate(pos, event.map.width);
//     });
//     event.map.obstaclePositions = event.map.obstaclePositions.map(function (pos) {
//         return TileUtils.getTileCoordinate(pos, event.map.width);
//     });
//     event.map.snakeInfos.forEach(snake => {
//         snake.positions = snake.positions.map(function (pos) {
//             return TileUtils.getTileCoordinate(pos, event.map.width);
//         });
//     });
//
//     activeTournamentGame.mapEvents.push(event.map);
// };

const _tournamentEnded = (event) => {
    finalPlacement.list = event.gameResult;
    finalPlacement.winner = finalPlacement.list.find(snake => snake.playerId === event.playerWinnerId);
    localStorage.setItem("finalPlacement", JSON.stringify(finalPlacement));
};

const _killTournament = () => {
    Socket.send('{"tournamentId":"' + activeTournamentGame.id + '","type":"se.cygni.snake.eventapi.request.KillTournament", "token":"token-here"}');
    localStorage.removeItem("activeTournamentGame")
};

// function _parseSnakes(oldList, snakeList) {
//     snakeList.forEach(snake => {
//         if (oldList.find(existingSnake => snake.id === existingSnake.id)) {
//             return;
//         }
//
//         oldList.push({
//             "id": snake.id,
//             "name": snake.name,
//             "length": snake.positions.length,
//             "color": Colors.getSnakeColor()[oldList.length],
//             "alive": snake.positions.length <= 0,
//             "points": snake.points
//         });
//     })
// }


const BaseStore = Object.assign(EventEmitter.prototype, {
    emitChange () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    getActiveGame() {
        if (!_activeGame && localStorage.getItem("activeGame")) {
            let tmp = localStorage.getItem("activeGame");
            _activeGame = JSON.parse(tmp);
        }
        return _activeGame;
    },

    getActiveTournamentGame() {
        return _activeGame;
    },

    getFrameInfo() {
        if (_activeGame) {
            return {currentFrame: _activeGame.currentFrame, lastFrame: Math.max(0, _activeGame.mapEvents.length - 1)};
        }
        return {currentFrame: 0, lastFrame: 0};
    },

    getActiveTournament () {
        return tournament;
    },

    getSettings () {
        return tournament.gameSettings;
    },

    getPlayerList () {
        return playerList;
    },

    getTournamentGameplan() {
        if (localStorage.getItem("gameplan")) {
            let tmp = localStorage.getItem("gameplan");
            tournamentGameplan = JSON.parse(tmp);
        }
        return tournamentGameplan;
    },

    getActivePlayers() {
        return activeTournamentGame.players.sort((a, b) => {
            return b.points - a.points
        });
    },
    getFinalPlacement () {
        if (localStorage.getItem("finalPlacement")) {
            let tmp = localStorage.getItem("finalPlacement");
            finalPlacement = JSON.parse(tmp);
        }
        return finalPlacement;
    },

    getUpdateFrequencyForTournament() {
        if (activeTournamentGame)
            return activeTournamentGame.updateFrequency;
        return 100;
    },

    getTrainingGames() {
        return games;
    },

    getTournamentGames() {
        return games;
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


    dispatherIndex: register(action => {
        switch (action.actionType) {
            case Constants.START_TOURNAMENT_GAME:
                _startGame(action.id);
                _changeFrame(action.id);
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
            case Constants.TOURNAMENT_MAP_UPDATE_EVENT:
                _addMapUpdate(action.event);
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
                _setActiveGame(action.id);
                break;
            case Constants.SET_CURRENT_FRAME:
                _setCurrentFrame(action.frame);
                break;
            case Constants.MAP_UPDATE_EVENT:
                _addMapUpdate(action.event);
                break;

        }

        BaseStore.emitChange();
    })
});

export default BaseStore;
