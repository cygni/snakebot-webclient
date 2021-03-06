import Constants from '../../constants/Constants';
import { dispatch } from '../../dispatchers/AppDispatcher';

export default {
  addGames(games) {
    dispatch({
      actionType: Constants.ADD_GAMES, games,
    });
  },

  startGame() {
    dispatch({
      actionType: Constants.START_GAME,
    });
  },

  startPrefetchingGame(id) {
    dispatch({
      actionType: Constants.PREFETCH_GAME, id,
    });
  },

  pauseGame(id) {
    dispatch({
      actionType: Constants.PAUSE_GAME, id,
    });
  },

  resumeGame(id) {
    dispatch({
      actionType: Constants.RESUME_GAME, id,
    });
  },

  restartGame(id) {
    dispatch({
      actionType: Constants.RESTART_GAME, id,
    });
  },

  activeGame(gameId) {
    dispatch({
      actionType: Constants.SET_ACTIVE_GAME, gameId,
    });
  },

  increaseUpdateFrequency() {
    dispatch({
      actionType: Constants.INCREASE_UPDATE_FREQUENCY,
    });
  },

  decreaseUpdateFrequency() {
    dispatch({
      actionType: Constants.DECREASE_UPDATE_FREQUENCY,
    });
  },

  mapUpdateEvent(event) {
    dispatch({
      actionType: Constants.MAP_UPDATE_EVENT, event,
    });
  },

  setCurrentFrame(frame) {
    dispatch({
      actionType: Constants.SET_CURRENT_FRAME, frame,
    });
  },

  searchForOldGames(name) {
    dispatch({
      actionType: Constants.SEARCH_FOR_OLD_GAMES_FOR_USER, name,
    });
  },

  addDeadSnake(event) {
    dispatch({
      actionType: Constants.ADD_DEAD_SNAKE_EVENT, event,
    });
  },
};
