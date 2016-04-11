import {register} from '../../dispatchers/AppDispatcher'
import Constants from '../constants/Constants'
import {EventEmitter} from 'events'
import SockJS from 'sockjs-client'

const CHANGE_EVENT = 'change';
var socket = new SockJS('http://localhost:8080/events');
var activeTournament = {};


const _createTournament = (name) => {
    console.log(name);
    activeTournament.name = name;
};

const _createTournamentTable = () => {

};

const _startTournament = () => {

};


const GameStore = Object.assign(EventEmitter.prototype, {
    emitChange () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    getActiveTournament () {
        return activeTournament;
    },
    
    dispatherIndex: register(action => {
        switch (action.actionType) {
            case Constants.CREATE_TOURNAMENT:
                _createTournament( action.name );
                break;
            case Constants.CREATE_TOURNAMENT_TABLE:
                _createTournamentTable();
                break;
            case Constants.START_TOURNAMENT:
                _startTournament();
                break;

        }

        GameStore.emitChange();
    })
});

export default GameStore;
