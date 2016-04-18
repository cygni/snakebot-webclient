import {register} from '../../dispatchers/AppDispatcher'
import Constants from '../constants/Constants'
import {EventEmitter} from 'events'
import SockJS from 'sockjs-client'
import TournamentAction from '../action/tournament-actions'

const CHANGE_EVENT = 'change';
var socket = new SockJS('http://localhost:8080/events');

var tournament = {};
var tournamentGameplan = {};

const _createTournament = (name) => {
    socket.send('{"tournamentName":"' + name + '","type":"se.cygni.snake.eventapi.request.CreateTournament", "token":"token-here"}');
};

const _createTournamentTable = () => {
    socket.send('{"type":"se.cygni.snake.eventapi.request.UpdateTournamentSettings", "token":"token-here", "gameSettings": ' + JSON.stringify(tournament.gameSettings) + '}');
};

const _startTournament = () => {
    socket.send('{"type":"se.cygni.snake.eventapi.request.StartTournamentGame", "token":"token-here", "gameId":"' + tournament.tournamentId + '"}');
};

const _tournamentCreated = (jsonData) => {
    tournament.tournamentName = jsonData.tournamentName;
    tournament.tournamentId = jsonData.tournamentId;
    tournament.gameSettings = jsonData.gameSettings;
    localStorage.setItem("tournament", tournament)
};

const _updateGameplan = (jsonData) => {
    console.log("UpdateGamePlan: " + JSON.stringify(jsonData));
    tournamentGameplan = jsonData
};


const _initWS = () => {
    socket.onmessage = function (e) {
        var jsonData = JSON.parse(e.data);

        if (jsonData.type == "se.cygni.snake.eventapi.response.TournamentCreated") {
            TournamentAction.tournamentCreated(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.eventapi.model.TournamentGamePlan") {
            TournamentAction.tournamentGamePlanReceived(jsonData)
        }

        else {
            console.log(jsonData);
        }

    }.bind(this);

    socket.onclose = function () {
        console.log('close');
    };
};

const _updateSettings = (key, value) => {
    tournament.gameSettings[key] = value;
};


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

    getActiveTournament () {
        if (!tournament && localStorage.getItem("tournament")) {
            tournament = localStorage.getItem("tournament");
        }
        return tournament
    },

    getSettings () {
        return tournament.gameSettings;
    },
    initWS() {
        _initWS();
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

        }

        GameStore.emitChange();
    })
});

export default GameStore;
