import Constants from '../../constants/Constants';
import { dispatch } from '../../dispatchers/AppDispatcher';

export function createTournament(name) {
  dispatch({
    actionType: Constants.CREATE_TOURNAMENT,
    name,
  });
}

export function updateSettings(key, value) {
  dispatch({
    actionType: Constants.UPDATE_SETTINGS,
    key,
    value,
  });
}

export function createTournamentTable() {
  dispatch({
    actionType: Constants.CREATE_TOURNAMENT_TABLE,
  });
}

export function killTournament() {
  dispatch({
    actionType: Constants.KILL_TOURNAMENT,
  });
}

export function tournamentCreated(jsonData) {
  dispatch({
    actionType: Constants.TOURNAMENT_CREATED,
    jsonData,
  });
}

export function startTournament() {
  dispatch({
    actionType: Constants.START_TOURNAMENT,
  });
}

export function tournamentInfoReceived(jsonData) {
  dispatch({
    actionType: Constants.TOURNAMENT_INFO_RECEIVED,
    jsonData,
  });
}

export function tournamentGamePlanReceived(jsonData) {
  dispatch({
    actionType: Constants.GAME_PLAN_RECEIVED,
    jsonData,
  });
}

export function updatePlayers(players) {
  dispatch({
    actionType: Constants.UPDATE_PLAYERS,
    players,
  });
}

export function setActiveTournamentGame(gameId) {
  dispatch({
    actionType: Constants.SET_ACTIVE_TOURNAMENT_GAME,
    gameId,
  });
}

export function tournamentEndedEvent(event) {
  dispatch({
    actionType: Constants.TOURNAMENT_ENDED_EVENT,
    event,
  });
}

export function loginUser(token, user) {
  dispatch({
    actionType: Constants.LOGIN_USER,
    token,
    user,
  });
}

export function logoutUser() {
  dispatch({
    actionType: Constants.LOGOUT_USER,
  });
}

export function invalidToken() {
  dispatch({
    actionType: Constants.INVALID_TOKEN,
  });
}

export function fetchActiveTournament() {
  dispatch({
    actionType: Constants.FETCH_ACTIVE_TOURNAMENT,
  });
}
