import React from 'react';
import PropTypes from 'prop-types';

import * as GameActions from '../../action/game-actions';
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

class GameControl extends React.Component {
  static propTypes = {
    frameCount: PropTypes.number.isRequired,
    gameState: PropTypes.object.isRequired,
  };

  static startGame() {
    GameActions.startGame();
  }

  static pauseGame(id) {
    GameActions.pauseGame(id);
  }

  static resumeGame(id) {
    GameActions.resumeGame(id);
  }

  static restartGame(id) {
    GameActions.restartGame(id);
  }

  static currentFrameChanged(event) {
    GameActions.setCurrentFrame(parseInt(event.target.value, 10));
  }

  static decreaseFrequency() {
    GameActions.decreaseUpdateFrequency();
  }

  static increaseFrequency() {
    GameActions.increaseUpdateFrequency();
  }

  getState() {
    if (this.props.gameState.started) {
      if (this.props.gameState.running) {
        return {
          icon: Pause,
          action: () => GameControl.pauseGame(this.props.gameState.id),
        };
      } else if (this.props.gameState.currentFrame === this.props.frameCount) {
        return {
          icon: Replay,
          action: () => GameControl.restartGame(this.props.gameState.id),
        };
      }

      return {
        icon: Play,
        action: () => GameControl.resumeGame(this.props.gameState.id),
      };
    }

    return { icon: Play, action: () => GameControl.startGame() };
  }

  render() {
    const state = this.getState();
    return (
      <div className="box controlpanel">
        <input
          type="range"
          step="1"
          min="0"
          max={this.props.frameCount}
          value={this.props.gameState.currentFrame}
          className="react-native-slider"
          onChange={GameControl.currentFrameChanged}
        />
        <div className="controlbuttons">
          <input
            alt="Go back"
            type="image"
            src={Backwards}
            name="ButtonBackwards"
            className="backwardsButton"
            onClick={GameControl.decreaseFrequency}
          />
          <input
            alt="Play"
            type="image"
            src={state.icon}
            name="PlayButton"
            className="playButton"
            onClick={state.action}
          />
          <input
            alt="Go forward"
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

export default StoreWatch(GameControl, gameControlStateCallback);
