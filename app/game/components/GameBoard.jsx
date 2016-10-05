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
  const deadSnakes = Store.getDeadSnakes();

  return { state, deadSnakes };
}

const propTypes = {
  deadSnakes: React.PropTypes.array.isRequired,// eslint-disable-line
  state: React.PropTypes.object.isRequired, // eslint-disable-line
  params: React.PropTypes.object.isRequired,
};

class GameBoard extends React.Component {
  componentWillMount() {
    console.log('GameBoard will mount');
    GameAction.activeGame(this.props.params.gameId);
  }

  componentDidMount() {
    this.worldLayer = new createjs.Stage(this.canvas);
    this.snakeLayer = new createjs.Container();
    this.deadSnakeLayer = new createjs.Container();
    this.collisionLayer = new createjs.Container();
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener('tick', this.worldLayer);
    this.worldLayer.addChild(this.deadSnakeLayer);
    this.worldLayer.addChild(this.snakeLayer);
    this.worldLayer.addChild(this.collisionLayer);
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

  renderDeadSnakes(mapEvent, tileSize, state) {
    const allDeadSnakes = this.props.deadSnakes.filter(snake =>
      (mapEvent.worldTick >= snake.worldTick && snake.worldTick + snake.ttl >= mapEvent.worldTick)
    );

    const collisions = this.props.deadSnakes.filter(snake =>
      mapEvent.worldTick === snake.worldTick
    );

    if (allDeadSnakes.length > 0) {
      TileUtils.renderDeadSnakes(
        this.deadSnakeLayer, mapEvent, allDeadSnakes, tileSize, state.colors
      );
      if (collisions.length > 0) {
        TileUtils.renderCollisions(this.collisionLayer, collisions, tileSize);
      } else {
        this.collisionLayer.removeAllChildren();
      }
    } else {
      this.deadSnakeLayer.removeAllChildren();
      this.collisionLayer.removeAllChildren();
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
    return (
      <section className="clear-fix">
        <Sidebar />
        <div className="gameboard">
          <canvas
            id="canvas"
            width={size.width}
            height={size.height}
            ref={(c) => {
              this.canvas = c;
            }}
          />
          <GameControl />
        </div>
      </section>
    );
  }
}

GameBoard.propTypes = propTypes;

export default new StoreWatch(GameBoard, getGameState);
