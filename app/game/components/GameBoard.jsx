import React from 'react';
import _ from 'lodash';
import Store from '../../baseStore/BaseStore';
import StoreWatch from './watch/StoreWatch';
import BoardUtils from '../../util/BoardUtils';
import TileUtils from '../../util/TileUtils';
import GameAction from '../../game/action/game-actions';
import Sidebar from './sidebar/Sidebar';
import GameControl from './sidebar/GameControl';

function getGameState() {
  const state = Store.getActiveGameState();
  const deadSnakes = Store.getDeadSnakes();
  return { state, deadSnakes };
}

const propTypes = {
  deadSnakes: React.PropTypes.array.isRequired,// eslint-disable-line
  state: React.PropTypes.object.isRequired, // eslint-disable-line
  params: React.PropTypes.object.isRequired,
  routes: React.PropTypes.object.isRequired,
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
    GameAction.activeGame(this.props.params.gameId);
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
      GameAction.startPrefetchingGame(this.props.params.gameId);
      TileUtils.addCountDown(this.countDownLayer);
      GameBoard.sleep(7100);
    }
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
    GameAction.activeGame(this.props.params.gameId);
    if (this.isTournament()) {
      GameAction.startPrefetchingGame(this.props.params.gameId);
      TileUtils.addCountDown(this.countDownLayer);
      GameBoard.sleep(7100);
    }
  }

  componentWillUnmount() {
    console.log('Unmounting GameBoard');
    GameAction.pauseGame();
  }

  moveToNextGame(id) {
    Store.moveToNextTournamentGame(id);
    this.forceUpdate();
  }

  isTournament() {
    return this.props.routes[0].path.startsWith('/tournament');
  }

  renderDeadSnakes(mapEvent, tileSize, state) {
    const allDeadSnakes = this.props.deadSnakes.filter(snake =>
      (mapEvent.worldTick > snake.worldTick && snake.worldTick + snake.ttl >= mapEvent.worldTick)
    );

    const collisions = this.props.deadSnakes.filter(snake =>
      mapEvent.worldTick === (snake.worldTick + 1)
    );

    this.deadSnakeLayer.removeAllChildren();
    if (allDeadSnakes.length > 0) {
      TileUtils.renderDeadSnakes(
        this.deadSnakeLayer, mapEvent, allDeadSnakes, tileSize, state.colors
      );
      if (collisions.length > 0) {
        TileUtils.renderCollisions(this.worldLayer, collisions, tileSize);
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
      this.isTournament() ? <div>
        <div>
          <button onClick={() => GameBoard.moveToBracket()}>Back</button>
          <button style={{ float: 'right' }} onClick={() => this.moveToNextGame(this.props.params.gameId)}>Forward
          </button>
        </div>
      </div> : <div />;


    return (
      <section className="page clear-fix">
        {navigation}

        <div className="thegame clear-fix">
          <Sidebar />
          <div className="gameboard">
            <canvas
              id="canvas"
              width={size.width + 1}
              height={size.height + 1}
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
