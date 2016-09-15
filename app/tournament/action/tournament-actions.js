import Constants from "../../constants/Constants";
import {dispatch} from "../../dispatchers/AppDispatcher";


export default {
    createTournament (name) {
        dispatch({
            actionType: Constants.CREATE_TOURNAMENT, name
        })
    },

    updateSettings (key, value) {
        dispatch({
            actionType: Constants.UPDATE_SETTINGS, key, value
        })
    },

    createTournamentTable () {
        dispatch({
            actionType: Constants.CREATE_TOURNAMENT_TABLE
        })
    },

    killTournament () {
        dispatch({
            actionType: Constants.KILL_TOURNAMENT
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
    },

    updatePlayers (players) {
        dispatch({
            actionType: Constants.UPDATE_PLAYERS, players
        })
    },

    setActiveTrainingGame (gameId) {
        dispatch({
            actionType: Constants.SET_ACTIVE_TRAINING_GAME, gameId
        })
    },

    setActiveTournamentGame (gameId) {
        dispatch({
            actionType: Constants.SET_ACTIVE_TOURNAMENT_GAME, gameId
        })
    },

    startGame () {
        dispatch({
            actionType: Constants.START_TOURNAMENT_GAME
        })
    },

    tournamentEndedEvent (event) {
        dispatch({
            actionType: Constants.TOURNAMENT_ENDED_EVENT, event
        })
    },

    setUpdateFrequencyTournament (freq) {
        dispatch({
            actionType: Constants.SET_UPDATE_FREQUENCY_TOURNAMENT, freq
        })
    },

    setCurrentFrameTournament (frame) {
        dispatch({
            actionType: Constants.SET_CURRENT_TOURNAMENT_FRAME, frame
        })
    },

    getActiveTournament () {
        dispatch({
            actionType: Constants.GET_ACTIVE_TOURNAMENT
        })
    },

    loginUser (token, user) {
        dispatch({
            actionType: Constants.LOGIN_USER,
            token: token,
            user: user
        });
    },

    logoutUser () {
        dispatch({
            actionType: Constants.LOGOUT_USER
        });
    },

    invalidToken () {
        dispatch({
            actionType: Constants.INVALID_TOKEN
        });
    }
}
