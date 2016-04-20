import {register} from '../../dispatchers/AppDispatcher'
import Constants from '../constants/Constants'
import {EventEmitter} from 'events'
import SockJS from 'sockjs-client'
import TournamentAction from '../action/tournament-actions'
import { hashHistory } from 'react-router'

const CHANGE_EVENT = 'change';
var socket = new SockJS('http://localhost:8080/events');

let playerList = [];
let tournament = {};
let tournamentGameplan = {
  "type": "se.cygni.snake.eventapi.model.TournamentGamePlan",
  "noofLevels": 5,
  "players": [
    {
      "name": "#emil_163",
      "id": "bc6ab6c0-3c20-49d2-b70c-bc29b0edaf03"
    },
    {
      "name": "#emil_807",
      "id": "099aa6c4-74f6-4e2e-9163-80abc8f4406c"
    },
    {
      "name": "#emil_142",
      "id": "60a2eda3-52d4-495a-8400-82c69e80f388"
    },
    {
      "name": "#emil_430",
      "id": "60079f08-d071-476e-a47f-e91cdced41c4"
    },
    {
      "name": "#emil_352",
      "id": "84000e3c-1f04-4b52-a38c-ff82337730ac"
    },
    {
      "name": "#emil_541",
      "id": "8f12a681-8227-4ed1-b6db-35b2116ba4a2"
    },
    {
      "name": "#emil_87",
      "id": "e7d25beb-d683-46a9-bf4a-42e839323c22"
    },
    {
      "name": "#emil_271",
      "id": "a2ad45b2-9faa-4b52-a211-6d541e85759f"
    },
    {
      "name": "#emil_942",
      "id": "318a1fb1-104f-438c-91bc-1e1268435af8"
    },
    {
      "name": "#emil_173",
      "id": "5b8a2272-c4a0-4676-9d79-4d8c183737f0"
    },
    {
      "name": "#emil_299",
      "id": "776470dc-8952-4de0-8585-48c675063e3e"
    },
    {
      "name": "#emil_260",
      "id": "21a1f7b8-4a35-4a67-948b-72e68b1d1e8f"
    },
    {
      "name": "#emil_899",
      "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
    },
    {
      "name": "#emil_628",
      "id": "8267faec-41ad-4ac5-8830-f123b96b3255"
    }
  ],
  "tournamentName": "xedas",
  "tournamentId": "1c8e02df-a298-42cf-bc08-3d0be0982ee2",
  "tournamentLevels": [
    {
      "level": 0,
      "expectedNoofPlayers": 14,
      "players": [],
      "tournamentGames": [
        {
          "gameId": null,
          "expectedNoofPlayers": 5,
          "players": [
            {
              "name": "#emil_163",
              "id": "bc6ab6c0-3c20-49d2-b70c-bc29b0edaf03"
            },
            {
              "name": "#emil_807",
              "id": "099aa6c4-74f6-4e2e-9163-80abc8f4406c"
            },
            {
              "name": "#emil_142",
              "id": "60a2eda3-52d4-495a-8400-82c69e80f388"
            },
            {
              "name": "#emil_430",
              "id": "60079f08-d071-476e-a47f-e91cdced41c4"
            },
            {
              "name": "#emil_352",
              "id": "84000e3c-1f04-4b52-a38c-ff82337730ac"
            }
          ]
        },
        {
          "gameId": null,
          "expectedNoofPlayers": 5,
          "players": [
            {
              "name": "#emil_541",
              "id": "8f12a681-8227-4ed1-b6db-35b2116ba4a2"
            },
            {
              "name": "#emil_87",
              "id": "e7d25beb-d683-46a9-bf4a-42e839323c22"
            },
            {
              "name": "#emil_271",
              "id": "a2ad45b2-9faa-4b52-a211-6d541e85759f"
            },
            {
              "name": "#emil_942",
              "id": "318a1fb1-104f-438c-91bc-1e1268435af8"
            },
            {
              "name": "#emil_173",
              "id": "5b8a2272-c4a0-4676-9d79-4d8c183737f0"
            }
          ]
        },
        {
          "gameId": null,
          "expectedNoofPlayers": 4,
          "players": [
            {
              "name": "#emil_299",
              "id": "776470dc-8952-4de0-8585-48c675063e3e"
            },
            {
              "name": "#emil_260",
              "id": "21a1f7b8-4a35-4a67-948b-72e68b1d1e8f"
            },
            {
              "name": "#emil_899",
              "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
            },
            {
              "name": "#emil_628",
              "id": "8267faec-41ad-4ac5-8830-f123b96b3255"
            }
          ]
        }
      ]
    },
    {
      "level": 1,
      "expectedNoofPlayers": 11,
      "players": [],
      "tournamentGames": [
        {
          "gameId": null,
          "expectedNoofPlayers": 4,
          "players": [
            {
              "name": "#emil_299",
              "id": "776470dc-8952-4de0-8585-48c675063e3e"
            },
            {
              "name": "#emil_260",
              "id": "21a1f7b8-4a35-4a67-948b-72e68b1d1e8f"
            },
            {
              "name": "#emil_899",
              "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
            },
            {
              "name": "#emil_628",
              "id": "8267faec-41ad-4ac5-8830-f123b96b3255"
            }
          ]
        },
        {
          "gameId": null,
          "expectedNoofPlayers": 4,
          "players": [
            {
              "name": "#emil_299",
              "id": "776470dc-8952-4de0-8585-48c675063e3e"
            },
            {
              "name": "#emil_260",
              "id": "21a1f7b8-4a35-4a67-948b-72e68b1d1e8f"
            },
            {
              "name": "#emil_899",
              "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
            },
            {
              "name": "#emil_628",
              "id": "8267faec-41ad-4ac5-8830-f123b96b3255"
            }
            ]
        },
        {
          "gameId": null,
          "expectedNoofPlayers": 3,
          "players": [
            {
              "name": "#emil_299",
              "id": "776470dc-8952-4de0-8585-48c675063e3e"
            },
            {
              "name": "#emil_260",
              "id": "21a1f7b8-4a35-4a67-948b-72e68b1d1e8f"
            },
            {
              "name": "#emil_899",
              "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
            }
          ]
        }
      ]
    },
    {
      "level": 2,
      "expectedNoofPlayers": 8,
      "players": [],
      "tournamentGames": [
        {
          "gameId": null,
          "expectedNoofPlayers": 4,
          "players": []
        },
        {
          "gameId": null,
          "expectedNoofPlayers": 4,
          "players": [
            {
              "name": "#emil_299",
              "id": "776470dc-8952-4de0-8585-48c675063e3e"
            },
            {
              "name": "#emil_260",
              "id": "21a1f7b8-4a35-4a67-948b-72e68b1d1e8f"
            },
            {
              "name": "#emil_899",
              "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
            },
            {
              "name": "#emil_628",
              "id": "8267faec-41ad-4ac5-8830-f123b96b3255"
            }
            ]
        }
      ]
    },
    {
      "level": 3,
      "expectedNoofPlayers": 6,
      "players": [],
      "tournamentGames": [
        {
          "gameId": null,
          "expectedNoofPlayers": 3,
          "players": []
        },
        {
          "gameId": null,
          "expectedNoofPlayers": 3,
          "players": [
            {
              "name": "#emil_299",
              "id": "776470dc-8952-4de0-8585-48c675063e3e"
            },
            {
              "name": "#emil_260",
              "id": "21a1f7b8-4a35-4a67-948b-72e68b1d1e8f"
            },
            {
              "name": "#emil_899",
              "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
            }
            ]
        }
      ]
    },
    {
      "level": 4,
      "expectedNoofPlayers": 4,
      "players": [],
      "tournamentGames": [
        {
          "gameId": null,
          "expectedNoofPlayers": 4,
          "players": [
            {
              "name": "#emil_260",
              "id": "21a1f7b8-4a35-4a67-948b-72e68b1d1e8f"
            },
            {
              "name": "#emil_899",
              "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
            },
            {
              "name": "#emil_628",
              "id": "8267faec-41ad-4ac5-8830-f123b96b3255"
            },
            {
              "name": "#emil_899",
              "id": "d136a99a-95cb-4a5e-bfd5-43b9479bdb4e"
            }
            ]
        }
      ]
    }
  ]
};

const _createTournament = (name) => {
    socket.send('{"tournamentName":"' + name + '","type":"se.cygni.snake.eventapi.request.CreateTournament", "token":"token-here"}');
};

const _createTournamentTable = () => {
    socket.send('{"type":"se.cygni.snake.eventapi.request.UpdateTournamentSettings", "token":"token-here", "gameSettings": ' + JSON.stringify(tournament.gameSettings) + '}');
};

const _startTournament = () => {
    socket.send('{"type":"se.cygni.snake.eventapi.request.StartTournamentGame", "token":"token-here", "gameId":"' + tournament.tournamentId + '"}');
    hashHistory.push('/tournamentbracket');
};

const _tournamentCreated = (jsonData) => {
    tournament.tournamentName = jsonData.tournamentName;
    tournament.tournamentId = jsonData.tournamentId;
    tournament.gameSettings = jsonData.gameSettings;
    localStorage.setItem("tournament", JSON.stringify(tournament));
};

const _updateGameplan = (jsonData) => {
    tournamentGameplan = jsonData
};

const _updatePlayers = (players) => {
    playerList = players;
};


const _initWS = () => {
    socket.onmessage = function (e) {
        var jsonData = JSON.parse(e.data);

        if (jsonData.type == "se.cygni.snake.eventapi.response.TournamentCreated") {
            TournamentAction.tournamentCreated(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.eventapi.model.TournamentGamePlan") {
            TournamentAction.tournamentGamePlanReceived(jsonData);
            TournamentAction.updatePlayers(jsonData.players)
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
        // console.log("wuut");
        // console.log(tournament);
        // let t = localStorage.getItem("tournament");
        // console.log(t);
        // console.log(!tournament && localStorage.getItem("tournament"));

        // console.log(tournament);
        // if (!tournament.tournamentId && localStorage.getItem("tournament")) {
        //     console.log("TRUER");
        //     tournament = localStorage.getItem("tournament");
        // }
        return tournament
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
        return tournamentGameplan;
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

        }

        GameStore.emitChange();
    })
});

export default GameStore;
