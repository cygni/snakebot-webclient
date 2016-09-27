import React from 'react';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';

import AppAction from '../../action/tournament-actions';
import StoreWatch from '../../watch/StoreWatch.jsx';
import TournamentStore from '../../../baseStore/BaseStore';

function gameControlStateCallback() {
  const gameState = TournamentStore.getActiveGameState();
  const frameCount = TournamentStore.getFrameCount();
  return { gameState, frameCount };
}

class GameControl extends React.Component {
  static updateFrequencyChanged(event) {
    AppAction.setUpdateFrequency(parseInt(event.target.value, 10));
  }

  static currentFrameChanged(event) {
    AppAction.setCurrentFrame(parseInt(event.target.value, 10));
  }

  constructor(props) {
    super(props);
    this.state = {
      frequencyMinValue: 100,
      frequencyMaxValue: 2000,
      frequencyStep: 100,
      gameActive: false,
      gameRunning: false,
      updateFrequency: 500,
      currentFrame: 0,
      lastFrame: 0,
      firstFrame: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      gameActive: nextProps.gameState.started,
      gameRunning: nextProps.running,
      updateFrequency: nextProps.gameState.updateFrequency,
      currentFrame: nextProps.gameState.currentFrame,
      lastFrame: nextProps.frameCount,
    });
  }

  render() {
    return (
      <div>
        <div>
          <h4>Frame delay: {this.state.updateFrequency}</h4>
          <ReactSliderNativeBootstrap
            value={this.state.updateFrequency}
            handleChange={GameControl.updateFrequencyChanged}
            step={this.state.frequencyStep} max={this.state.frequencyMaxValue}
            min={this.state.frequencyMinValue} disabled="disabled"
          />
        </div>
        <div>
          <h4>Frame: {this.state.currentFrame}</h4>
          <ReactSliderNativeBootstrap
            value={this.state.currentFrame}
            handleChange={GameControl.currentFrameChanged}
            step={1} max={this.state.lastFrame} min={this.state.firstFrame}
            disabled="disabled"
          />
        </div>
      </div>
    );
  }
}

export default new StoreWatch(GameControl, gameControlStateCallback);
