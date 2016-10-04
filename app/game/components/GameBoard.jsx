import React from 'react';
import _ from 'lodash';
import Store from '../../baseStore/BaseStore';
import StoreWatch from './watch/StoreWatch.jsx';
import BoardUtils from '../../util/BoardUtils';
import TileUtils from '../../util/TileUtils';
import GameAction from '../../game/action/game-actions';
import Sidebar from './sidebar/Sidebar.jsx';
import GameControl from './sidebar/GameControl.jsx';

function getGameState() {
  const state = Store.getActiveGameState();
  return { state };
}

const propTypes = {
  state: React.PropTypes.object.isRequired, // eslint-disable-line
  params: React.PropTypes.object.isRequired,
};

class GameBoard extends React.Component {
  static validateCanvas(canvas, size) {
    if (canvas.width !== size.width && canvas.height !== size.height) {
      canvas.width = size.width;
      canvas.height = size.height;
      canvas.className = '';
    }
  }

  componentWillMount() {
    console.log('GameBoard will mount');
    GameAction.activeGame(this.props.params.gameId);
  }

  componentDidMount() {
    this.worldLayer = new createjs.Stage(this.canvas);
    this.snakeLayer = new createjs.Container();
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener('tick', this.worldLayer);
    this.worldLayer.addChild(this.snakeLayer);
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

  componentWillUnmount() {
    console.log('Unmounting GameBoard');
    GameAction.pauseGame();
  }

  renderGameBoard(map, tileSize, state) {
    this.snakeLayer.removeAllChildren();
    TileUtils.renderSnakes(this.snakeLayer, map, tileSize, state.colors);
    TileUtils.renderFood(this.snakeLayer, map, tileSize);

    if (state.renderObstacles && map.obstaclePositions.length > 0) {
      TileUtils.renderObstacles(this.worldLayer, map, tileSize);
    }
  }

  renderBoard(state) {
    const map = state.mapEvents[state.currentFrame];
    const mapIsEmpty = BoardUtils.mapIsEmpty(map);

    if (mapIsEmpty || this.canvas.getContext('2d') === undefined) {
      return;
    }

    const size = mapIsEmpty ? { width: 0, height: 0 } : BoardUtils.calculateSize(map);
    const tileSize = mapIsEmpty ? 0 : BoardUtils.getTileSize(map);

    GameBoard.validateCanvas(this.canvas, size);
    this.renderGameBoard(map, tileSize, state);
  }

  render() {
    return (
      <section className="clear-fix">
        <Sidebar />
        <div className="gameboard">
          <canvas
            id="canvas"
            className="hidden"
            ref={(c) => { this.canvas = c; }}
          />
          <GameControl />
        </div>
      </section>
    );
  }
}

GameBoard.propTypes = propTypes;

export default new StoreWatch(GameBoard, getGameState);
