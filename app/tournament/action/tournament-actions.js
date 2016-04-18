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

    createTournamentTable ( settings ) {
        dispatch({
            actionType: Constants.CREATE_TOURNAMENT_TABLE, settings
        })
    },

    tournamentCreated  (jsonData) {
        dispatch({
            actionType: Constants.TOURNAMENT_CREATED, jsonData
        })
    }
}
