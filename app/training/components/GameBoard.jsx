import React from 'react';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import Store from '../../baseStore/BaseStore';
import StoreWatch from './watch/StoreWatch.jsx';
import BoardUtils from '../../util/BoardUtils';
import TileUtils from '../../util/TileUtils';
import TrainingAction from '../../training/action/training-actions';
import Sidebar from './sidebar/Sidebar.jsx';

let worldLayer;
let snakeLayer;
let renderObstacles = true;

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

  static renderGameBoard(canvas, map, mapIsEmpty, tileSize, colors) {
    if (mapIsEmpty || canvas.getContext('2d') === undefined) {
      return;
    }

    snakeLayer.removeAllChildren();
    TileUtils.renderSnakes(snakeLayer, map, tileSize, colors);
    TileUtils.renderFood(snakeLayer, map, tileSize);
    if (renderObstacles) {
      if (map.obstaclePositions[0] !== undefined) {
        TileUtils.renderObstacles(worldLayer, map, tileSize);
        renderObstacles = false;
      }
    }
  }

  static renderBoard(game, canvas, state) {
    const map = game.mapEvents[state.currentFrame];
    const mapIsEmpty = BoardUtils.mapIsEmpty(map);

    const size = mapIsEmpty ? { width: 0, height: 0 } : BoardUtils.calculateSize(map);
    const tileSize = mapIsEmpty ? 0 : BoardUtils.getTileSize(map);

    GameBoard.validateCanvas(canvas, size);
    GameBoard.renderGameBoard(canvas, map, mapIsEmpty, tileSize, state.colors);
  }

  componentDidMount() {
    worldLayer = new createjs.Stage(this.canvas);
    snakeLayer = new createjs.Container();
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener('tick', worldLayer);
    worldLayer.addChild(snakeLayer);
    TrainingAction.activeGame(this.props.params.gameId);
    Store.initWS(this.props.params.gameId);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.game)) {
      if (this.props.game && this.props.game.mapEvents) {
        GameBoard.renderBoard(this.props.game, this.canvas, this.props.state);
      } else {
        GameBoard.renderBoard(nextProps.game, this.canvas, nextProps.state);
      }
    }
  }

  shouldComponentUpdate() {
    /* This is important for performance!*/
    return false;
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
