import React from 'react'
import {Button} from 'react-bootstrap'
import AppAction from '../../action/app-actions'
import StoreWatch from '../watch/StoreWatch'
import GameStore from '../../stores/active-games'

function startActiveGame() {
    let startedGame = GameStore.hasActiveGame();
    return {startedGame}
}

class StartGameButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeGame: false
        };
    }

    static startGame() {
       AppAction.startGame();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.startedGame) {
            this.setState ({
              activeGame: true
            })
        }
    }

    render() {
        return (
            <Button disabled={!this.state.activeGame} onClick={StartGameButton.startGame} className="btn btn-default btn-lg">Start Game</Button>
        )
    }
}

export default StoreWatch(StartGameButton, startActiveGame);