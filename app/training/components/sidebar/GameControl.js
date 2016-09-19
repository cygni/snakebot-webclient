import React from "react";
import {Button} from "react-bootstrap";
import AppAction from "../../action/training-actions";
import StoreWatch from "../watch/StoreWatch";
import GameStore from "../../../baseStore/BaseStore";
import ReactSliderNativeBootstrap from "react-bootstrap-native-slider";

function gameControlStateCallback() {
    let game = GameStore.getActiveGame();
    let frameInfo = GameStore.getFrameInfo();
    return {game: game, frameInfo: frameInfo}
}

class GameControl extends React.Component {
    constructor(props) {
        super(props);
    }
    
    static startGame() {
        AppAction.startGame(this.props.id);
    }

    static pauseGame() {
        AppAction.pauseGame(this.props.id);
    }

    static resumeGame() {
        AppAction.resumeGame(this.props.id);
    }
    
    static updateFrequencyChanged(event) {
        AppAction.setUpdateFrequency(parseInt(event.target.value));
    }

    static currentFrameChanged(event) {
        AppAction.setCurrentFrame(parseInt(event.target.value));
    }

    render() {
        if (this.props.game) {
            let text = this.props.game.started ? this.props.game.running ? "Pause Game" : "Resume Game" : "Start Game";
            let action = this.props.game.started ? this.props.game.running ? GameControl.pauseGame : GameControl.resumeGame : GameControl.startGame;
            return (
                <div>
                    <div>
                        <Button onClick={action.bind(this)} className="btn btn-default btn-lg">{text}</Button>
                    </div>
                    <div>
                        <h4>Frame delay: {this.props.game.updateFrequency}</h4>
                        <ReactSliderNativeBootstrap value={this.props.game.updateFrequency}
                                                    handleChange={GameControl.updateFrequencyChanged} step={100} max={2000}
                                                    min={100}/>
                    </div>
                    <div>
                        <h4>Frame: {this.props.game.currentFrame}
                            / {this.props.frameInfo.lastFrame}</h4>
                        <ReactSliderNativeBootstrap value={this.props.game.currentFrame}
                                                    handleChange={GameControl.currentFrameChanged} step={1}
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
