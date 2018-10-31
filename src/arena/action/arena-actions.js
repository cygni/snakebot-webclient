import Constants from '../../constants/Constants';
import { dispatch } from '../../dispatchers/AppDispatcher';

// Request
export function setActiveArena(arenaName) {
  dispatch({
    actionType: Constants.SET_ACTIVE_ARENA,
    arenaName,
  });
}

export function startGame(arenaName) {
  dispatch({
    actionType: Constants.START_ARENA_GAME,
    arenaName,
  });
}

// Response
export function updateArena(arenaState) {
  dispatch({
    actionType: Constants.UPDATE_ARENA,
    arenaState,
  });
}
