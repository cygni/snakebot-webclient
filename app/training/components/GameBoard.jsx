import React from 'react';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import Store from '../../baseStore/BaseStore';
import StoreWatch from './watch/StoreWatch.jsx';
import BoardUtils from '../../util/BoardUtils';
import TileUtils from '../../util/TileUtils';
import TrainingAction from '../../training/action/training-actions';
import Sidebar from './sidebar/Sidebar.jsx';

function getActiveGame() {
  const game = Store.getActiveGame();
  const state = Store.getActiveGameState();
  return { game, state };
}

const propTypes = {
  game: React.PropTypes.object,
  state: React.PropTypes.object,
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

    Store.initWS(this.props.params.gameId);
    TrainingAction.activeGame(this.props.params.gameId);
  }

  componentDidMount() {
    this.worldLayer = new createjs.Stage(this.canvas);
    this.snakeLayer = new createjs.Container();
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener('tick', this.worldLayer);
    this.worldLayer.addChild(this.snakeLayer);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.game)) {
      if (this.props.game && this.props.game.mapEvents) {
        this.renderBoard(this.props.game, this.props.state);
      } else {
        this.renderBoard(nextProps.game, nextProps.state);
      }
    }
  }

  shouldComponentUpdate() {
    /* This is important for performance!*/
    return false;
  }

  componentWillUnmount() {
    console.log('Unmounting GameBoard');
    TrainingAction.pauseGame();
  }

  renderGameBoard(map, tileSize, state) {
    this.snakeLayer.removeAllChildren();
    TileUtils.renderSnakes(this.snakeLayer, map, tileSize, state.colors);
    TileUtils.renderFood(this.snakeLayer, map, tileSize);

    if (state.renderObstacles) {
      if (map.obstaclePositions.length > 0) {
        console.log('GameBoard will render obstacles', this.worldLayer.children);
        TileUtils.renderObstacles(this.worldLayer, map, tileSize);

        TrainingAction.obstaclesRendered();
      }
    }
  }

  renderBoard(game, state) {
    const map = game.mapEvents[state.currentFrame];
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
      <Row>
        <Col xs={3} md={2}>
          <Sidebar />
        </Col>
        <Col xs={15} md={10}>
          <Grid>
            <Col xs={14} md={9}>
              <Grid >
                <Row className="show-grid">
                  <div id="map" style={{ marginTop: 20 }}>
                    <canvas
                      id="canvas"
                      className="hidden"
                      ref={(c) => { this.canvas = c; }}
                      width="2000" height="2000"
                    />
                  </div>
                </Row>
              </Grid>
            </Col>
          </Grid>
        </Col>
      </Row>
    );
  }
}

GameBoard.propTypes = propTypes;

export default new StoreWatch(GameBoard, getActiveGame);
