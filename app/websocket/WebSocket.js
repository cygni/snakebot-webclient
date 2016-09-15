import React from "react";
import SockJS from "sockjs-client";
import TournamentAction from "../tournament/action/tournament-actions";
import AppAction from "../training/action/training-actions";
import Config from "Config";

let socket = new SockJS(Config.server + "/events");

const listen = (gameid) => {
    if(socket.readyState === 1) {
        socket.send('{"includedGameIds": ["' + gameid + '"],"type":"se.cygni.snake.eventapi.request.SetGameFilter"}');
    }
    socket.onopen = function () {
        socket.send('{"includedGameIds": ["' + gameid + '"],"type":"se.cygni.snake.eventapi.request.SetGameFilter"}');
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
            AppAction.addGames(jsonData.games);
        }
        else if (jsonData.type == "se.cygni.snake.api.event.MapUpdateEvent") {
            AppAction.mapUpdateEvent(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.api.event.GameEndedEvent") {
            AppAction.mapUpdateEvent(jsonData);
        }
        else if (jsonData.type == "se.cygni.snake.api.event.TournamentEndedEvent") {
            TournamentAction.tournamentEndedEvent(jsonData)
        } else if (jsonData.type == "se.cygni.snake.eventapi.exception.Unauthorized") {
            TournamentAction.invalidToken();
        }
        else {
            console.log("Unrecognized datatype: " + jsonData.type);
        }
    };

    socket.onclose = function () {
        console.log("Socket connection closed");
    };
};

export default {
    init(gameid) {
        listen(gameid)
    },
    send(msg) {
        socket.send(msg);
    },
    state() {
        return socket.readyState;
    }
};
