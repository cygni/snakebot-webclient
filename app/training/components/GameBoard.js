import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Store from "../../baseStore/BaseStore";
import StoreWatch from "./watch/StoreWatch";
import BoardUtils from "../../util/BoardUtils";
import TileUtils from "../../util/TileUtils";
import TrainingAction from "../../training/action/training-actions";
import Sidebar from "./sidebar/Sidebar";



let worldLayer;
let snakeLayer;
let renderObstacles = true;

function getActiveGame() {
    let game = Store.getActiveGame();
    return {game: game}
}

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
    };

    shouldComponentUpdate(nextProps, nextState) {
        /*This is important for performance!*/
        return false;
    };

    componentDidMount() {
        worldLayer = new createjs.Stage(this.refs.canvas);
        snakeLayer = new createjs.Container();
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", worldLayer);
        worldLayer.addChild(snakeLayer);
        TrainingAction.activeGame(this.props.params.trainingGameId);
        Store.initWS(this.props.params.trainingGameId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.game) {
            let map;
            if(this.props.game) {
                map = this.props.game.mapEvents[this.props.game.currentFrame];
            }
            else {
                map = nextProps.game.mapEvents[nextProps.game.currentFrame];
            }



            let size = {width: 0, height: 0};
            let tileSize = 0;
            let mapIsEmpty = BoardUtils.mapIsEmpty(map);
            if (!mapIsEmpty) {
                size = BoardUtils.calculateSize(map);
                tileSize = BoardUtils.getTileSize(map);
            }
            GameBoard.validateCanvas(this.refs.canvas, size);
            this.renderGameBoard(map, mapIsEmpty, tileSize);
        }
    };

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
                                    <div id="map" style={{marginTop: 20}}>
                                        <canvas id="canvas" className="hidden" ref="canvas" width="2000" height="2000"/>
                                    </div>
                                </Row>
                            </Grid>
                        </Col>
                    </Grid>
                </Col>
            </Row>
        )
    };

    static validateCanvas(canvas, size) {
        if (canvas.width !== size.width && canvas.height !== size.height) {
            canvas.width = size.width;
            canvas.height = size.height;
            canvas.className = "";
        }
    };

    renderGameBoard(map, mapIsEmpty, tileSize) {
        if (mapIsEmpty || this.refs.canvas.getContext('2d') === undefined) {
            return;
        }
        let activeGame = getActiveGame();
        snakeLayer.removeAllChildren();
        TileUtils.renderSnakes(snakeLayer, map, tileSize, activeGame);
        TileUtils.renderFood(snakeLayer, map, tileSize);
        if (renderObstacles) {
            if (map.obstaclePositions[0].y !== undefined) {
                TileUtils.renderObstacles(worldLayer, map, tileSize);
                renderObstacles = false;
            }
        }
    }
}

export default StoreWatch(GameBoard, getActiveGame);