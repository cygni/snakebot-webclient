import Constants from '../../constants/Constants';
import { dispatch } from '../../dispatchers/AppDispatcher';

export default {
  // Request
  setActiveArena(arenaName) {
    dispatch({
      actionType: Constants.SET_ACTIVE_ARENA, arenaName,
    });
  },

  // Response
  updateArena(arenaState) {
    dispatch({
      actionType: Constants.UPDATE_ARENA, arenaState,
    });
  },
};
