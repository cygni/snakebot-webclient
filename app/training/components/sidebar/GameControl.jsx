import React from 'react';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';

import { Button } from 'react-bootstrap';
import AppAction from '../../action/training-actions';
import StoreWatch from '../watch/StoreWatch.jsx';
import GameStore from '../../../baseStore/BaseStore';

function gameControlStateCallback() {
  const gameState = GameStore.getActiveGameState();
  const frameCount = GameStore.getFrameCount();
  return { gameState, frameCount };
}

const propTypes = {
  frameCount: React.PropTypes.number.isRequired,
  gameState: React.PropTypes.object.isRequired,
};

class GameControl extends React.Component {
  static startGame(id) {
    AppAction.startGame(id);
  }

  static pauseGame(id) {
    AppAction.pauseGame(id);
  }

  static resumeGame(id) {
    AppAction.resumeGame(id);
  }

  static restartGame(id) {
    AppAction.restartGame(id);
  }

  static updateFrequencyChanged(event) {
    AppAction.setUpdateFrequency(parseInt(event.target.value, 10));
  }

  static currentFrameChanged(event) {
    AppAction.setCurrentFrame(parseInt(event.target.value, 10));
  }

  getState() {
    if (this.props.gameState.started) {
      if (this.props.gameState.running) {
        return { text: 'Pause Game', action: () => GameControl.pauseGame(this.props.gameState.id) };
      } else if (this.props.gameState.currentFrame === this.props.frameCount) {
        return { text: 'Restart Game', action: () => GameControl.restartGame(this.props.gameState.id) };
      }
      return { text: 'Resume Game', action: () => GameControl.resumeGame(this.props.gameState.id) };
    }
    return { text: 'Start Game', action: () => GameControl.startGame(this.props.gameState.id) };
  }

  render() {
    const state = this.getState();
    return (
      <div>
        <div>
          <Button
            onClick={state.action}
            className="btn btn-default btn-lg"
          >{state.text}</Button>
        </div>
        <div>
          <h4>Frame delay: {this.props.gameState.updateFrequency}</h4>
          <ReactSliderNativeBootstrap
            value={this.props.gameState.updateFrequency}
            handleChange={GameControl.updateFrequencyChanged} step={100} max={2000}
            min={100}
          />
        </div>
        <div>
          <h4>Frame: {this.props.gameState.currentFrame}
            / {this.props.frameCount}</h4>
          <ReactSliderNativeBootstrap
            value={this.props.gameState.currentFrame}
            handleChange={GameControl.currentFrameChanged} step={1}
            max={this.props.frameCount} min={0}
          />
        </div>
      </div>
    );
  }
}

GameControl.propTypes = propTypes;

export default new StoreWatch(GameControl, gameControlStateCallback);
