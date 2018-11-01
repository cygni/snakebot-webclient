import SockJS from 'sockjs-client';
import * as TournamentActions from '../tournament/action/tournament-actions';
import * as GameActions from '../game/action/game-actions';
import * as ArenaActions from '../arena/action/arena-actions';
import { SERVER_URL } from '../constants/Constants';

const TOURNAMENT_INFO = 'se.cygni.snake.eventapi.model.TournamentInfo';
const TOURNAMENT_CREATED = 'se.cygni.snake.eventapi.response.TournamentCreated';
const TOURNAMENT_GAME_PLAN = 'se.cygni.snake.eventapi.model.TournamentGamePlan';
const ACTIVE_GAMES_LIST = 'se.cygni.snake.eventapi.response.ActiveGamesList';
const MAP_UPDATE_EVENT = 'se.cygni.snake.api.event.MapUpdateEvent';
const GAME_ENDED_EVENT = 'se.cygni.snake.api.event.GameEndedEvent';
const TOURNAMENT_ENDED_EVENT = 'se.cygni.snake.api.event.TournamentEndedEvent';
const UNAUTHORIZED = 'se.cygni.snake.eventapi.exception.Unauthorized';
const SNAKE_DEAD_EVENT = 'se.cygni.snake.api.event.SnakeDeadEvent';
const ARENA_UPDATE_EVENT = 'se.cygni.snake.api.event.ArenaUpdateEvent';

const socket = new SockJS(`${SERVER_URL}/events`);
let onConnectQueue = [];

const sendObj = msg => {
  if (socket.readyState === 1) {
    console.log('Sending message via socket:', msg);
    socket.send(JSON.stringify(msg));
  }
};

const sendWhenOpen = msg => {
  if (socket.readyState === 1) {
    sendObj(msg);
  } else {
    onConnectQueue.push(msg);
  }
};

const setGameFilter = gameid => {
  const included = gameid ? [gameid] : [];
  sendWhenOpen({
    includedGameIds: included,
    type: 'se.cygni.snake.eventapi.request.SetGameFilter',
  });
};

const setCurrentArena = arenaName => {
  sendWhenOpen({
    currentArena: arenaName,
    type: 'se.cygni.snake.eventapi.request.SetCurrentArena',
  });
};

const listen = () => {
  socket.onopen = function onSocketOpen() {
    console.log('Socket is open, sending stored messages', onConnectQueue);
    onConnectQueue.forEach(msg => sendObj(msg));
    onConnectQueue = [];
  };

  socket.onmessage = function onSocketMessage(e) {
    const jsonData = JSON.parse(e.data);
    console.log('Received json message', jsonData);

    switch (jsonData.type) {
      case TOURNAMENT_INFO:
        TournamentActions.tournamentInfoReceived(jsonData);
        break;
      case TOURNAMENT_CREATED:
        TournamentActions.tournamentCreated(jsonData);
        break;
      case TOURNAMENT_GAME_PLAN:
        TournamentActions.tournamentGamePlanReceived(jsonData);
        break;
      case ACTIVE_GAMES_LIST:
        GameActions.addGames(jsonData.games);
        break;
      case MAP_UPDATE_EVENT:
        GameActions.mapUpdateEvent(jsonData);
        break;
      case GAME_ENDED_EVENT:
        GameActions.mapUpdateEvent(jsonData);
        break;
      case TOURNAMENT_ENDED_EVENT:
        TournamentActions.tournamentEndedEvent(jsonData);
        break;
      case UNAUTHORIZED:
        TournamentActions.invalidToken();
        break;
      case SNAKE_DEAD_EVENT:
        GameActions.addDeadSnake(jsonData);
        break;
      case ARENA_UPDATE_EVENT:
        ArenaActions.updateArena(jsonData);
        break;
      default:
        console.log('Unrecognized datatype: ', jsonData.type);
        break;
    }
  };

  socket.onclose = function onSocketClose() {
    console.log('Socket connection closed');
  };
};

export default {
  init(gameid) {
    listen();
    setGameFilter(gameid);
    console.log('Initialized socket with with gameid:', gameid);
  },
  initArena(arenaName) {
    listen();
    setCurrentArena(arenaName);
    console.log('Initialized socket with with arena name:', arenaName);
  },
  send: sendObj,
  state() {
    return socket.readyState;
  },
};
