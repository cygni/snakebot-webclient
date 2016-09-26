import React from 'react';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';

import { Button } from 'react-bootstrap';
import AppAction from '../../action/training-actions';
import StoreWatch from '../watch/StoreWatch.jsx';
import GameStore from '../../../baseStore/BaseStore';

function gameControlStateCallback() {
  const game = GameStore.getActiveGame();
  const frameInfo = GameStore.getFrameInfo();
  return { game, frameInfo };
}

const propTypes = {
  id: React.PropTypes.string,
  game: React.PropTypes.object.isRequired,
  frameInfo: React.PropTypes.object.isRequired,
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

  static getState(game, id) {
    if (game.started) {
      if (game.running) {
        return { text: 'Pause Game', action: () => GameControl.pauseGame(id) };
      }
      return { text: 'Resume Game', action: () => GameControl.resumeGame(id) };
    }
    return { text: 'Start Game', action: () => GameControl.startGame(id) };
  }

  static updateFrequencyChanged(event) {
    AppAction.setUpdateFrequency(parseInt(event.target.value, 10));
  }

  static currentFrameChanged(event) {
    AppAction.setCurrentFrame(parseInt(event.target.value, 10));
  }

  render() {
    if (this.props.game) {
      const state = GameControl.getState(this.props.game, this.props.id);
      const text = state.text;
      const action = state.action;
      return (
        <div>
          <div>
            <Button
              onClick={action}
              className="btn btn-default btn-lg"
            >{text}</Button>
          </div>
          <div>
            <h4>Frame delay: {this.props.game.updateFrequency}</h4>
            <ReactSliderNativeBootstrap
              value={this.props.game.updateFrequency}
              handleChange={GameControl.updateFrequencyChanged} step={100} max={2000}
              min={100}
            />
          </div>
          <div>
            <h4>Frame: {this.props.game.currentFrame}
              / {this.props.frameInfo.lastFrame}</h4>
            <ReactSliderNativeBootstrap
              value={this.props.game.currentFrame}
              handleChange={GameControl.currentFrameChanged} step={1}
              max={this.props.frameInfo.lastFrame} min={0}
            />
          </div>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

GameControl.propTypes = propTypes;

export default new StoreWatch(GameControl, gameControlStateCallback);
