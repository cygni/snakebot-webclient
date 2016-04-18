import Constants from'../constants/Constants'
import {dispatch} from '../../dispatchers/AppDispatcher'

export default {
    createTournament ( name ) {
        dispatch({
            actionType: Constants.CREATE_TOURNAMENT, name
        })
    },

    updateSettings (key, value) {
        dispatch({
            actionType: Constants.UPDATE_SETTINGS, key, value
        })
    },

    createTournamentTable ( ) {
        dispatch({
            actionType: Constants.CREATE_TOURNAMENT_TABLE
        })
    },

    tournamentCreated  (jsonData) {
        dispatch({
            actionType: Constants.TOURNAMENT_CREATED, jsonData
        })
    },

    startTournament () {
        dispatch({
            actionType: Constants.START_TOURNAMENT
        })
    },

    tournamentGamePlanReceived (jsonData) {
        dispatch({
            actionType: Constants.GAME_PLAN_RECEIVED, jsonData
        })
    }
}
