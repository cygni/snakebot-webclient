import Constants from '../../constants/Constants';
import { dispatch } from '../../dispatchers/AppDispatcher';

export function addGames(games) {
  dispatch({
    actionType: Constants.ADD_GAMES,
    games,
  });
}

export function startGame() {
  dispatch({
    actionType: Constants.START_GAME,
  });
}

export function startPrefetchingGame(id) {
  dispatch({
    actionType: Constants.PREFETCH_GAME,
    id,
  });
}

export function pauseGame(id) {
  dispatch({
    actionType: Constants.PAUSE_GAME,
    id,
  });
}

export function resumeGame(id) {
  dispatch({
    actionType: Constants.RESUME_GAME,
    id,
  });
}

export function restartGame(id) {
  dispatch({
    actionType: Constants.RESTART_GAME,
    id,
  });
}

export function activeGame(gameId) {
  dispatch({
    actionType: Constants.SET_ACTIVE_GAME,
    gameId,
  });
}

export function increaseUpdateFrequency() {
  dispatch({
    actionType: Constants.INCREASE_UPDATE_FREQUENCY,
  });
}

export function decreaseUpdateFrequency() {
  dispatch({
    actionType: Constants.DECREASE_UPDATE_FREQUENCY,
  });
}

export function mapUpdateEvent(event) {
  dispatch({
    actionType: Constants.MAP_UPDATE_EVENT,
    event,
  });
}

export function setCurrentFrame(frame) {
  dispatch({
    actionType: Constants.SET_CURRENT_FRAME,
    frame,
  });
}

export function searchForOldGames(name) {
  dispatch({
    actionType: Constants.SEARCH_FOR_OLD_GAMES_FOR_USER,
    name,
  });
}

export function addDeadSnake(event) {
  dispatch({
    actionType: Constants.ADD_DEAD_SNAKE_EVENT,
    event,
  });
}
