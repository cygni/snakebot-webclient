import React from 'react'
import {Button} from 'react-bootstrap'
import AppAction from '../../action/app-actions'
import StoreWatch from '../watch/StoreWatch'
import GameStore from '../../stores/GameStore'
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider'

function gameControlStateCallback() {
    let activeGameSettings = GameStore.getActiveGameSettings();
    let game = GameStore.getActiveGame();

    // let gameRunning = GameStore.isGameRunning();
    // let gamePaused = GameStore.isGamePaused();
    // let updateFrequency = GameStore.getUpdateFrequency();
    let frameInfo = GameStore.getFrameInfo();
    return {activeGameSettings: activeGameSettings, game: game, frameInfo: frameInfo}
}

class GameControl extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
            // frequencyMinValue: 100,
            // frequencyMaxValue: 2000,
            // frequencyStep: 100,
            // gameActive: false,
            // gamePaused: false,
            // gameRunning: false,
            // updateFrequency: 500,
            // currentFrame: 0,
            // lastFrame: 0,
            // firstFrame: 0
        // };
    }

    static startGame() {
       AppAction.startGame();
    }

    static pauseGame() {
      AppAction.pauseGame();
    }

    static resumeGame() {
      AppAction.resumeGame();
    }

    componentWillReceiveProps(nextProps) {
            // this.setState ({
            //   gameActive: nextProps.gameActive,
            //   gamePaused: nextProps.gamePaused,
            //   gameRunning: nextProps.gameRunning,
            //   updateFrequency: nextProps.updateFrequency,
            //   currentFrame: nextProps.frameInfo.currentFrame,
            //   lastFrame: nextProps.frameInfo.lastFrame
            // });
    }

    updateFrequencyChanged(event) {
      AppAction.setUpdateFrequency(parseInt(event.target.value));
    }

    currentFrameChanged(event) {
      AppAction.setCurrentFrame(parseInt(event.target.value));
    }

    render() {
        if(this.props.game) {
            let text = this.props.activeGameSettings.started ? this.props.activeGameSettings.running ? "Pause Game" : "Resume Game" : "Start Game";
            let action = this.props.activeGameSettings.started ? this.props.activeGameSettings.running ? GameControl.pauseGame : GameControl.resumeGame : GameControl.startGame;
            return (
                <div>
                    <div>
                        <Button onClick={action} className="btn btn-default btn-lg">{text}</Button>
                    </div>
                    <div>
                        <h4>Frame delay: {this.props.game.updateFrequency}</h4>
                        <ReactSliderNativeBootstrap value={this.props.game.updateFrequency}
                                                    handleChange={this.updateFrequencyChanged} step={100} max={2000}
                                                    min={100}/>
                    </div>
                    <div>
                        <h4>Frame: {this.props.game.currentFrame}
                            / {this.props.frameInfo.lastFrame}</h4>
                        <ReactSliderNativeBootstrap value={this.props.game.currentFrame}
                                                    handleChange={this.currentFrameChanged} step={1}
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

export default StoreWatch(GameControl, gameControlStateCallback);
