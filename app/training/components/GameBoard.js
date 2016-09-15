import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Store from "../../baseStore/BaseStore";
import StoreWatch from "./watch/StoreWatch";
import BoardUtils from "../../util/BoardUtils";
import TileUtils from "../../util/TileUtils";
import TrainingAction from "../../training/action/training-actions"


let stage;

function getActiveGame() {
    let game = Store.getActiveGame();
    return {game: game}
}

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapEvents: [],
            snakes: [],
            currentFrame: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        /*This is important for performance!*/
        return false;
    };

    componentDidMount() {
        stage = new createjs.Stage(this.refs.canvas);
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage);
        TrainingAction.activeGame(this.props.params.trainingGameId);
        Store.initWS(this.props.params.trainingGameId);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.game) {
            this.setState({
                mapEvents: nextProps.game.mapEvents,
                currentFrame: nextProps.game.currentFrame
            });

            let map = this.state.mapEvents[this.state.currentFrame];
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
        stage.removeAllChildren();
        TileUtils.renderSnakes(stage, map, tileSize, activeGame);
        TileUtils.renderFood(stage, map, tileSize);
        TileUtils.renderObstacles(stage, map, tileSize);
    }
}

export default StoreWatch(GameBoard, getActiveGame);