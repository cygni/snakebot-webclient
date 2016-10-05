import Config from 'Config'; // eslint-disable-line
import SockJS from 'sockjs-client';
import TournamentAction from '../tournament/action/tournament-actions';
import GameAction from '../game/action/game-actions';

const TOURNAMENT_INFO = 'se.cygni.snake.eventapi.model.TournamentInfo';
const TOURNAMENT_CREATED = 'se.cygni.snake.eventapi.response.TournamentCreated';
const TOURNAMENT_GAME_PLAN = 'se.cygni.snake.eventapi.model.TournamentGamePlan';
const ACTIVE_GAMES_LIST = 'se.cygni.snake.eventapi.response.ActiveGamesList';
const MAP_UPDATE_EVENT = 'se.cygni.snake.api.event.MapUpdateEvent';
const GAME_ENDED_EVENT = 'se.cygni.snake.api.event.GameEndedEvent';
const TOURNAMENT_ENDED_EVENT = 'se.cygni.snake.api.event.TournamentEndedEvent';
const UNAUTHORIZED = 'se.cygni.snake.eventapi.exception.Unauthorized';

const socket = new SockJS(Config.server + '/events');

const sendObj = (msg) => {
  console.log('Sending message via socket:', msg);
  socket.send(JSON.stringify(msg));
};

const setGameFilter = (gameid) => {
  const included = gameid ? [gameid] : [];
  sendObj({
    includedGameIds: included,
    type: 'se.cygni.snake.eventapi.request.SetGameFilter',
  });
};

const listen = (gameid) => {
  if (socket.readyState === 1) {
    setGameFilter(gameid);
  }

  socket.onopen = function onSocketOpen() {
    console.log('Socket is open');
    setGameFilter(gameid);
  };

  socket.onmessage = function onSocketMessage(e) {
    const jsonData = JSON.parse(e.data);
    console.log('Received json message', jsonData);

    switch (jsonData.type) {
      case TOURNAMENT_INFO:
        TournamentAction.tournamentInfoReceived(jsonData);
        break;
      case TOURNAMENT_CREATED:
        TournamentAction.tournamentCreated(jsonData);
        break;
      case TOURNAMENT_GAME_PLAN:
        TournamentAction.tournamentGamePlanReceived(jsonData);
        break;
      case ACTIVE_GAMES_LIST:
        GameAction.addGames(jsonData.games);
        break;
      case MAP_UPDATE_EVENT:
        GameAction.mapUpdateEvent(jsonData);
        break;
      case GAME_ENDED_EVENT:
        GameAction.mapUpdateEvent(jsonData);
        break;
      case TOURNAMENT_ENDED_EVENT:
        TournamentAction.tournamentEndedEvent(jsonData);
        break;
      case UNAUTHORIZED:
        TournamentAction.invalidToken();
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
    console.log('Initialized socket with with gameid:', gameid);
    listen(gameid);
  },
  send: sendObj,
  state() {
    return socket.readyState;
  },
};
