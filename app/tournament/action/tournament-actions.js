import Constants from '../../constants/Constants';
import { dispatch } from '../../dispatchers/AppDispatcher';

export default {
  createTournament(name) {
    dispatch({
      actionType: Constants.CREATE_TOURNAMENT, name,
    });
  },

  updateSettings(key, value) {
    dispatch({
      actionType: Constants.UPDATE_SETTINGS, key, value,
    });
  },

  createTournamentTable() {
    dispatch({
      actionType: Constants.CREATE_TOURNAMENT_TABLE,
    });
  },

  killTournament() {
    dispatch({
      actionType: Constants.KILL_TOURNAMENT,
    });
  },

  tournamentCreated(jsonData) {
    dispatch({
      actionType: Constants.TOURNAMENT_CREATED, jsonData,
    });
  },

  startTournament() {
    dispatch({
      actionType: Constants.START_TOURNAMENT,
    });
  },

  tournamentInfoReceived(jsonData) {
    dispatch({
      actionType: Constants.TOURNAMENT_INFO_RECEIVED, jsonData,
    });
  },

  tournamentGamePlanReceived(jsonData) {
    dispatch({
      actionType: Constants.GAME_PLAN_RECEIVED, jsonData,
    });
  },

  updatePlayers(players) {
    dispatch({
      actionType: Constants.UPDATE_PLAYERS, players,
    });
  },

  setActiveTournamentGame(gameId) {
    dispatch({
      actionType: Constants.SET_ACTIVE_TOURNAMENT_GAME, gameId,
    });
  },

  startGame() {
    dispatch({
      actionType: Constants.START_GAME,
    });
  },

  tournamentEndedEvent(event) {
    dispatch({
      actionType: Constants.TOURNAMENT_ENDED_EVENT, event,
    });
  },

  setUpdateFrequency(freq) {
    dispatch({
      actionType: Constants.SET_UPDATE_FREQUENCY, freq,
    });
  },

  setCurrentFrame(frame) {
    dispatch({
      actionType: Constants.SET_CURRENT_FRAME, frame,
    });
  },

  loginUser(token, user) {
    dispatch({
      actionType: Constants.LOGIN_USER,
      token,
      user,
    });
  },

  logoutUser() {
    dispatch({
      actionType: Constants.LOGOUT_USER,
    });
  },

  invalidToken() {
    dispatch({
      actionType: Constants.INVALID_TOKEN,
    });
  },

  fetchActiveTournament() {
    dispatch({
      actionType: Constants.FETCH_ACTIVE_TOURNAMENT,
    });
  },
};
