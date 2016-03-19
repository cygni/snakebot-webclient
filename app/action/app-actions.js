import AppConstants from'../constants/app-constants'
import {dispatch} from '../dispatchers/app-dispatcher'

export default {
    addGames ( games ) {
        dispatch({
            actionType: AppConstants.ADD_GAMES, games
        })
    },
    startGame ( ) {
        dispatch({
            actionType: AppConstants.START_GAME
        })
    },

    activeGame ( id ) {
        dispatch({
            actionType: AppConstants.ACTIVE_GAME, id
        })
    },

    mapUpdateEvent ( event ) {
        dispatch({
            actionType: AppConstants.MAP_UPDATE_EVENT, event
        })
    }
}