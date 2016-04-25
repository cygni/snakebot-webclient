import {register} from '../../dispatchers/AppDispatcher'
import Constants from '../constants/Constants'
import {EventEmitter} from 'events'
import SockJS from 'sockjs-client'
import TournamentAction from '../action/tournament-actions'
import {hashHistory} from 'react-router'
import Colors from '../../util/Colors'
import TileUtils from '../../util/TileUtils'

const CHANGE_EVENT = 'change';
var socket;

let playerList = [];
let tournament = {};
let tournamentGameplan = {
    tournamentLevels: []
};
let activeGameList = [];
let activeGame = {};
let finalPlacement = {
    winner: {},
    list: []
};

const _createTournament = (name) => {
    socket.send('{"tournamentName":"' + name + '","type":"se.cygni.snake.eventapi.request.CreateTournament", "token":"token-here"}');
};

const _createTournamentTable = () => {
    socket.send('{"type":"se.cygni.snake.eventapi.request.UpdateTournamentSettings", "token":"token-here", "gameSettings": ' + JSON.stringify(tournament.gameSettings) + '}');
};

const _startTournament = () => {
    localStorage.removeItem("gameplan");
    localStorage.removeItem("finalPlacement");
    socket.send('{"type":"se.cygni.snake.eventapi.request.StartTournament", "token":"token-here", "tournamentId":"' + tournament.tournamentId + '"}');
    hashHistory.push('tournament/tournamentbracket');
};

const _getActiveTournament = () => {
    socket.send('{"type":"se.cygni.snake.eventapi.request.GetActiveTournament", "token":"token-here"}');
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

const _initWS = () => {
    if (!socket) {
        socket = new SockJS('http://snake.cygni.se:80/events')
    }
    _listen()
};

const _setActiveTournamentGame = (gameId) => {
    let game = activeGameList.find(game => game.gameId == gameId);
    let players = [];
    game.players.forEach((player, index) => {
        players.push({"index": index, "name": player.name, id: player.id, 'color': Colors.getSnakeColor()[index]});
    });

    activeGame = {
        "id": game.gameId,
        "gameFeatures": game.gameFeatures,
        "color": Colors.getBoardColor()[0],
        "players": players,
        "currentFrame": 0,
        "mapEvents": [],
        "updateFrequency": 250
    };
    localStorage.setItem("activeGame", JSON.stringify(activeGame));
    hashHistory.push('/tournament/activeTournamentGame');
};

const _startGame = () => {
    socket.send('{"includedGameIds": ["' + activeGame.id + '"],"type":"se.cygni.snake.eventapi.request.SetGameFilter"}');
    socket.send('{"gameId":"' + activeGame.id + '","type":"se.cygni.snake.eventapi.request.StartGame"}');
};

const _updateSnakes = (playerList, frame) => {
    if (frame) {
        frame.snakeInfos.forEach(snake => {
            var player = playerList.find(p => p.id === snake.id);
            if (!player) {
                console.log("unable to find player");
                return;
            }
            player.points = snake.points;
            player.length = snake.positions.length;
            player.alive = snake.positions.length > 0;
        });
    }
};

function _setUpdateFrequency(freq){
    activeGame.updateFrequency = freq;
}

function _setCurrentFrame(frame){
    activeGame.currentFrame = frame;
    _updateSnakes(activeGame.players, activeGame.mapEvents[activeGame.currentFrame]);
}

const _listen = () => {
    socket.onopen = function () {
        _getActiveTournament();
    };

    socket.onmessage = function (e) {
        var jsonData = JSON.parse(e.data);
        if (jsonData.type == "se.cygni.snake.eventapi.response.TournamentCreated") {
            TournamentAction.tournamentCreated(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.eventapi.model.TournamentGamePlan") {
            TournamentAction.tournamentGamePlanReceived(jsonData);
            TournamentAction.updatePlayers(jsonData.players)
        }
        else if (jsonData.type == "se.cygni.snake.eventapi.response.ActiveGamesList") {
            activeGameList = jsonData.games;
        }
        else if (jsonData.type == "se.cygni.snake.api.event.MapUpdateEvent") {
            TournamentAction.mapUpdateEvent(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.api.event.GameEndedEvent") {
            TournamentAction.mapUpdateEvent(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.api.event.TournamentEndedEvent") {
            TournamentAction.tournamentEndedEvent(jsonData)
        }
        else {
            console.log(jsonData.type);
        }
    }.bind(this);

    socket.onclose = function () {
        console.log('close');
    };
};

const _updateSettings = (key, value) => {
    tournament.gameSettings[key] = value;
};

const _changeFrame = () => {
    if (activeGame.currentFrame == 0 || activeGame.currentFrame < activeGame.mapEvents.length) {
        setTimeout(() => _changeFrame(), activeGame.updateFrequency);
    }

    activeGame.currentFrame = Math.max(0, Math.min(activeGame.currentFrame + 1, activeGame.mapEvents.length - 1));
    _updateSnakes(activeGame.players, activeGame.mapEvents[activeGame.currentFrame]);
    TournamentStore.emitChange();
};

const _addMapUpdate = (event) => {
    _parseSnakes(activeGame.players, event.map.snakeInfos);

    event.map.foodPositions = event.map.foodPositions.map(function (pos) {
        return TileUtils.getTileCoordinate(pos, event.map.width);
    });
    event.map.obstaclePositions = event.map.obstaclePositions.map(function (pos) {
        return TileUtils.getTileCoordinate(pos, event.map.width);
    });
    event.map.snakeInfos.forEach(snake => {
        snake.positions = snake.positions.map(function (pos) {
            return TileUtils.getTileCoordinate(pos, event.map.width);
        });
    });

    activeGame.mapEvents.push(event.map);
};

const _tournamentEnded = (event) => {
    finalPlacement.list = event.gameResult;
    finalPlacement.winner = finalPlacement.list.find(snake => snake.playerId === event.playerWinnerId);
    localStorage.setItem("finalPlacement", JSON.stringify(finalPlacement));
};

const _killTournament = () => {
    socket.send('{"tournamentId":"' + activeGame.id + '","type":"se.cygni.snake.eventapi.request.KillTournament", "token":"token-here"}');
    localStorage.removeItem("activeGame")
};

function _parseSnakes(oldList, snakeList) {
    snakeList.forEach(snake => {
        if (oldList.find(existingSnake => snake.id === existingSnake.id)) {
            return;
        }

        oldList.push({
            "id": snake.id,
            "name": snake.name,
            "length": snake.positions.length,
            "color": Colors.getSnakeColor()[oldList.length],
            "alive": snake.positions.length <= 0,
            "points": snake.points
        });
    })
}


const TournamentStore = Object.assign(EventEmitter.prototype, {
    emitChange () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    getActiveTournament () {
        return tournament;
    },

    getSettings () {
        return tournament.gameSettings;
    },
    initWS() {
        _initWS();
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

    getActiveGame() {
        if (Object.keys(activeGame).length == 0 && localStorage.getItem("activeGame")) {
            let tmp = localStorage.getItem("activeGame");
            activeGame = JSON.parse(tmp);
        }
        return activeGame;
    },

    getActivePlayers() {
        return activeGame.players.sort((a, b) => {
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

    getUpdateFrequency() {
        if(activeGame)
            return activeGame.updateFrequency;
        return 100;
    },

    getFrameInfo() {
        if(activeGame)
            return {currentFrame: activeGame.currentFrame, lastFrame: Math.max(0, activeGame.mapEvents.length - 1)};
        return { currentFrame: 0, lastFrame: 0};
    },

    dispatherIndex: register(action => {
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
            case Constants.SET_ACTIVE_GAME:
                _setActiveTournamentGame(action.gameId);
                break;
            case Constants.TOURNAMENT_MAP_UPDATE_EVENT:
                _addMapUpdate(action.event);
                break;
            case Constants.START_TOURNAMENT_GAME:
                _startGame();
                _changeFrame();
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

        }

        TournamentStore.emitChange();
    })
});

export default TournamentStore;
