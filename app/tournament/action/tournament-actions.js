import Constants from'../constants/Constants'
import {dispatch} from '../../dispatchers/AppDispatcher'

export default {
    createTournament ( name ) {
        dispatch({
            actionType: Constants.CREATE_TOURNAMENT, name
        })
    },

    createTournamentTable ( settings ) {
        dispatch({
            actionType: Constants.CREATE_TOURNAMENT_TABLE, settings
        })
    }
}
