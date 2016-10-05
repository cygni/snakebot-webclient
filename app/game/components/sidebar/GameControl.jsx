import React from 'react';

import GameAction from '../../action/game-actions';
import StoreWatch from '../watch/StoreWatch';
import GameStore from '../../../baseStore/BaseStore';

import Backwards from '../../../design/images/icons/icon-backwards.svg';
import Play from '../../../design/images/icons/icon-play.svg';
import Pause from '../../../design/images/icons/icon-pause.svg';
import Replay from '../../../design/images/icons/icon-replay.svg';
import Forwards from '../../../design/images/icons/icon-forward.svg';

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
    GameAction.startGame(id);
  }

  static pauseGame(id) {
    GameAction.pauseGame(id);
  }

  static resumeGame(id) {
    GameAction.resumeGame(id);
  }

  static restartGame(id) {
    GameAction.restartGame(id);
  }

  static currentFrameChanged(event) {
    GameAction.setCurrentFrame(parseInt(event.target.value, 10));
  }

  static decreaseFrequency() {
    GameAction.decreaseUpdateFrequency();
  }

  static increaseFrequency() {
    GameAction.increaseUpdateFrequency();
  }

  getState() {
    if (this.props.gameState.started) {
      if (this.props.gameState.running) {
        return { icon: Pause, action: () => GameControl.pauseGame(this.props.gameState.id) };
      } else if (this.props.gameState.currentFrame === this.props.frameCount) {
        return { icon: Replay, action: () => GameControl.restartGame(this.props.gameState.id) };
      }

      return { icon: Play, action: () => GameControl.resumeGame(this.props.gameState.id) };
    }

    return { icon: Play, action: () => GameControl.startGame(this.props.gameState.id) };
  }

  render() {
    const state = this.getState();
    return (
      <div className="controlpanel">
        <input
          type="range"
          step="1"
          min="0" max={this.props.frameCount}
          value={this.props.gameState.currentFrame}
          className="react-native-slider"
          onChange={GameControl.currentFrameChanged}
        />
        <div className="controlbuttons">
          <input
            type="image"
            src={Backwards}
            name="ButtonBackwards"
            className="backwardsButton"
            onClick={GameControl.decreaseFrequency}
          />
          <input
            type="image"
            src={state.icon}
            name="PlayButton"
            className="playButton"
            onClick={state.action}
          />
          <input
            type="image"
            src={Forwards}
            name="ButtonForward"
            className="forwardButton"
            onClick={GameControl.increaseFrequency}
          />
        </div>
      </div>
    );
  }
}

GameControl.propTypes = propTypes;

export default new StoreWatch(GameControl, gameControlStateCallback);
