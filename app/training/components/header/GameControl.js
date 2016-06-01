import React from 'react'
import {Button} from 'react-bootstrap'
import AppAction from '../../action/training-actions'
import StoreWatch from '../watch/StoreWatch'
import GameStore from '../../../baseStore/BaseStore'
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider'

function gameControlStateCallback() {
    let activeGameSettings = GameStore.getActiveGameSettings();
    let game = GameStore.getActiveGame();

    // let gameRunning = GameStore.isGameRunning();
    // let gamePaused = GameStore.isGamePaused();
    // let updateFrequency = GameStore.getUpdateFrequencyForTournament();
    let frameInfo = GameStore.getFrameInfo();
    return {activeGameSettings: activeGameSettings, game: game, frameInfo: frameInfo}
}

class GameControl extends React.Component {
    constructor(props) {
        super(props);
    }

    static startGame( ) {
       AppAction.startGame( this.props.id );
    }

    static pauseGame() {
      AppAction.pauseGame( this.props.id );
    }

    static resumeGame() {
      AppAction.resumeGame( this.props.id );
    }


    updateFrequencyChanged(event) {
      AppAction.setUpdateFrequency(parseInt(event.target.value), this.props.id );
    }

    currentFrameChanged(event) {
      AppAction.setCurrentFrame(parseInt(event.target.value), this.props.id );
    }

    render() {
        if(this.props.game) {
            let text = this.props.activeGameSettings.started ? this.props.activeGameSettings.running ? "Pause Game" : "Resume Game" : "Start Game";
            let action = this.props.activeGameSettings.started ? this.props.activeGameSettings.running ? GameControl.pauseGame : GameControl.resumeGame : GameControl.startGame;
            return (
                <div>
                    <div>
                        <Button onClick={action.bind(this)} className="btn btn-default btn-lg">{text}</Button>
                    </div>
                    <div>
                        <h4>Frame delay: {this.props.game.updateFrequency}</h4>
                        <ReactSliderNativeBootstrap value={this.props.game.updateFrequency}
                                                    handleChange={this.updateFrequencyChanged.bind(this)} step={100} max={2000}
                                                    min={100}/>
                    </div>
                    <div>
                        <h4>Frame: {this.props.game.currentFrame}
                            / {this.props.frameInfo.lastFrame}</h4>
                        <ReactSliderNativeBootstrap value={this.props.game.currentFrame}
                                                    handleChange={this.currentFrameChanged.bind(this)} step={1}
                                                    max={this.props.frameInfo.lastFrame} min={0}/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

GameControl.PropTypes = {
    id: React.PropTypes.string.isRequired
};

export default StoreWatch(GameControl, gameControlStateCallback);
