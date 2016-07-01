import React from "react";
import SockJS from "sockjs-client";
import TournamentAction from "../tournament/action/tournament-actions";
import AppAction from "../training/action/training-actions";
import Config from "Config";

let socket = new SockJS(Config.server + "/events");

const listen = () => {
    socket.onopen = function () {
        TournamentAction.getActiveTournament();
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
        }
        else {
            console.log("Unrecognized datatype: " + jsonData.type);
        }
    };

    socket.onclose = function () {
        console.log('close');
    };
};

export default {
    init() {
        listen()
    },
    send(msg) {
        socket.send(msg);
        listen();
    }
};
