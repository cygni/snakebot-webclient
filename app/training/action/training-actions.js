import Constants from "../../constants/Constants";
import {dispatch} from "../../dispatchers/AppDispatcher";

export default {
    addGames (games) {
        dispatch({
            actionType: Constants.ADD_GAMES, games
        })
    },
    startGame (id) {
        dispatch({
            actionType: Constants.START_GAME, id
        })
    },

    pauseGame (id) {
        dispatch({
            actionType: Constants.PAUSE_GAME, id
        })
    },

    resumeGame (id) {
        dispatch({
            actionType: Constants.RESUME_GAME, id
        })
    },

    activeGame (id) {
        dispatch({
            actionType: Constants.SET_ACTIVE_TRAINING_GAME, id
        })
    },

    setUpdateFrequency (freq) {
        dispatch({
            actionType: Constants.SET_UPDATE_FREQUENCY, freq
        })
    },

    mapUpdateEvent (event) {
        dispatch({
            actionType: Constants.MAP_UPDATE_EVENT, event
        })
    },

    setCurrentFrame (frame) {
        dispatch({
            actionType: Constants.SET_CURRENT_FRAME, frame
        })
    }
}
