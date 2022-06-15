import React from 'react';
import _ from 'lodash';
import Store from '../../baseStore/BaseStore';
import StoreWatch from './watch/StoreWatch';
import BoardUtils from '../../util/BoardUtils';
import TileUtils from '../../util/TileUtils';
import GameAction from '../../game/action/game-actions';
import Sidebar from './sidebar/Sidebar';
import GameControl from './sidebar/GameControl';

import PropTypes from 'prop-types';

function getGameState() {
  const state = Store.getActiveGameState();
  return { state };
}

const COUNTDOWN_DELAY_MS = 7100;

const propTypes = {
  state: PropTypes.object.isRequired, // eslint-disable-line
  params: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  autostart: PropTypes.bool,
  suppressAutoDispatch: PropTypes.bool,
};

class GameBoard extends React.Component {
  static moveToBracket() {
    Store.moveToBracket();
  }

  static startGame() {
    GameAction.startGame();
  }

  static sleep(ms) {
    setTimeout(() => GameAction.startGame(), ms);
  }

  componentWillMount() {
    this.setActiveGame();
  }

  componentDidMount() {
    this.worldLayer = new createjs.Stage(this.canvas);
    this.snakeLayer = new createjs.Container();
    this.deadSnakeLayer = new createjs.Container();
    this.countDownLayer = new createjs.Container();
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener('tick', this.worldLayer);
    this.worldLayer.addChild(this.deadSnakeLayer);
    this.worldLayer.addChild(this.snakeLayer);
    this.worldLayer.addChild(this.countDownLayer);

    if (this.isTournament()) {
      window.speechSynthesis.getVoices();
    }

    this.checkForAutostart();
  }

  componentWillReceiveProps(nextProps) {
    const renderableProps =
      !_.isEmpty(nextProps.state) &&
      nextProps.state.mapEvents &&
      nextProps.state.mapEvents.length > 0;

    if (renderableProps) {
      this.renderBoard(nextProps.state);
    }
  }

  shouldComponentUpdate() {
    /* This is important for performance!*/
    return false;
  }

  componentDidUpdate() {
    this.snakeLayer.removeAllChildren();
    this.deadSnakeLayer.removeAllChildren();
    this.worldLayer.removeAllChildren();
    this.worldLayer.addChild(this.deadSnakeLayer);
    this.worldLayer.addChild(this.snakeLayer);
    this.worldLayer.addChild(this.countDownLayer);
    this.setActiveGame();
    this.checkForAutostart();
  }

  componentWillUnmount() {
    console.log('Unmounting GameBoard');
    if (this.allowAutoDispatch()) {
      GameAction.pauseGame();
    }
  }

  setActiveGame() {
    if (this.allowAutoDispatch()) {
      GameAction.activeGame(this.props.params.gameId);
    }
  }

  // Having the gameboard dispatching on mount and state changes will break parent components
  // Allow parent components to suppress this behavior
  allowAutoDispatch() {
    return this.props.suppressAutoDispatch !== true;
  }

  countdownAndStartGame() {
    if (this.allowAutoDispatch()) {
      GameAction.startPrefetchingGame(this.props.params.gameId);
    }
    TileUtils.addCountDown(this.countDownLayer);
    GameBoard.sleep(COUNTDOWN_DELAY_MS);
  }

  moveToNextGame(id) {
    Store.moveToNextTournamentGame(id);
    this.forceUpdate();
  }

  isTournament() {
    return this.props.routes && this.props.routes[0].path.startsWith('/tournament');
  }

  checkForAutostart() {
    if (this.isTournament() || this.props.autostart) {
      this.countdownAndStartGame();
    }
  }

  renderDeadSnakes(mapEvent, tileSize, state) {
    const allDeadSnakes = state.deadSnakes.filter(snake =>
      (mapEvent.worldTick > snake.worldTick && snake.worldTick + snake.ttl >= mapEvent.worldTick)
    );

    const collisions = state.deadSnakes.filter(snake =>
      mapEvent.worldTick === (snake.worldTick + 1)
    );

    this.deadSnakeLayer.removeAllChildren();
    if (allDeadSnakes.length > 0) {
      TileUtils.renderDeadSnakes(
        this.deadSnakeLayer, mapEvent, allDeadSnakes, tileSize, state.colors
      );
      if (collisions.length > 0) {
        TileUtils.renderCollisions(this.worldLayer, collisions, tileSize, this.isTournament());
      }
    }
  }

  renderGameBoard(mapEvent, state) {
    const tileSize = BoardUtils.getTileSize();
    this.snakeLayer.removeAllChildren();

    this.renderDeadSnakes(mapEvent, tileSize, state);

    TileUtils.renderSnakes(this.snakeLayer, mapEvent, tileSize, state.colors);
    TileUtils.renderFood(this.snakeLayer, mapEvent, tileSize);

    if (state.renderObstacles && mapEvent.obstaclePositions.length > 0) {
      TileUtils.renderObstacles(this.worldLayer, mapEvent, tileSize);
    }
  }

  renderBoard(state) {
    const map = state.mapEvents[state.currentFrame];
    this.renderGameBoard(map, state);
  }


  render() {
    const size = BoardUtils.calculateSize();

    const navigation =
      this.isTournament() ? (<div>
        <div>
          <button onClick={() => GameBoard.moveToBracket()}>Back</button>
          <button style={{ float: 'right' }} onClick={() => this.moveToNextGame(this.props.params.gameId)}>Forward
          </button>
        </div>
      </div>) : <div />;


    return (
      <section className="page clear-fix">
        {navigation}

        <div className="thegame clear-fix">
          <Sidebar />
          <div className="gameboard">
            <canvas
              id="canvas"
              width={size.width + 0}
              height={size.height + 0}
              ref={(c) => {
                this.canvas = c;
              }}
            />
            <GameControl />
          </div>
        </div>
      </section>
    );
  }
}

GameBoard.propTypes = propTypes;

export default new StoreWatch(GameBoard, getGameState);
