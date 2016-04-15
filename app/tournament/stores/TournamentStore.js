import {register} from '../../dispatchers/AppDispatcher'
import Constants from '../constants/Constants'
import {EventEmitter} from 'events'
import SockJS from 'sockjs-client'
import TournamentAction from '../action/tournament-actions'

const CHANGE_EVENT = 'change';
var socket = new SockJS('http://localhost:8080/events');

var tournament = {};
// var settings = {
//     tournamentName: '',
//     width: 25, // 25,50,75,100
//     height: 25, // 25,50,75,100
//     maxPlayers: 5, //min 5
//     startSnakeLength: 1, // max 10 min 1
//     timeInMsPerTick: 250, // min 250 max 1500
//     pointsPerLength: 1, // 0-25
//     pointsPerFood: 1, // 0-25
//     pointsPerCausedDeath: 5, // 0-25
//     pointsPerNibble: 10, // 0-25
//     pointsLastSnakeLiving: 10, //0-25
//     pointsPerSuicide: -1, // -1 till -25
//     noofRoundsTailProtectedAfterNibble: 3, //0-10
//     addFoodLikelihood: 15, // 1-100%
//     removeFoodLikelihood: 5, // 1-100%
//     addObstacleLikelihood: 15, // 1-100%
//     removeObstacleLikelihood: 15, // 1-100%
//     obstaclesEnabled: true,
//     foodEnabled: true,
//     edgeWrapsAround: false,
//     headToTailConsumes: true,
//     tailConsumeGrows: false
// };


const _createTournament = (name) => {
    socket.send('{"tournamentName":"' + name +'","type":"se.cygni.snake.eventapi.request.CreateTournament", "token":"token-here"}');
};

const _createTournamentTable = () => {
    var gameSettings = {gameSettings: tournament.gameSettings}
    socket.send('{"type":"se.cygni.snake.eventapi.request.UpdateTournamentSettings", "token":"token-here", "gameSettings": ' + JSON.stringify(gameSettings) + '}');
};

const _startTournament = () => {

};

const _tournamentCreated = (jsonData) => {
    tournament.tournamentName = jsonData.tournamentName;
    tournament.tournamentId = jsonData.tournamentId;
    tournament.gameSettings = jsonData.gameSettings;
    localStorage.setItem("tournament", tournament)
};


const _initWS = () => {
    socket.onmessage = function (e) {
        var jsonData = JSON.parse(e.data);
        
        if (jsonData.type == "se.cygni.snake.eventapi.response.TournamentCreated") {
            TournamentAction.tournamentCreated(jsonData);
        }

        else {
            console.log(jsonData);
        }

    }.bind(this);

    socket.onclose = function () {
        console.log('close');
    };
};

const  _updateSettings = (key, value) => {
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
      if(!tournament && localStorage.getItem("tournament")) {
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
                _createTournament( action.name );
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

        }

        GameStore.emitChange();
    })
});

export default GameStore;
