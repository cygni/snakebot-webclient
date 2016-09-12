import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import Store from "../../baseStore/BaseStore";
import StoreWatch from "./watch/StoreWatch";
import TileUtils from "../../util/TileUtils";
import BoardUtils from "../../util/BoardUtils";
import Images from "../../constants/Images";
import TileTypes from "../../constants/TileTypes";

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
    };

    shouldComponentUpdate(nextProps, nextState) {
        /*This is important for performance!*/
        return false;
    };

    componentDidMount() {
        stage = new createjs.Stage(this.refs.canvas);
        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", stage);
        Store.initWS();
    };

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
            this.validateCanvas(this.refs.canvas, size);
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

    renderGameBoard(map, mapIsEmpty, tileSize) {
        if (mapIsEmpty || this.refs.canvas.getContext('2d') === undefined) {
            return;
        }

        let activeGame = getActiveGame();
        //TODO maybe cache non changing elements?
        stage.removeAllChildren();

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                let tile = TileUtils.getTileAt(x, y, map, tileSize, activeGame.game);
                let yPos = y * tile.width;
                let xPos = x * tile.width;
                if (tile.type !== undefined && tile.type !== TileTypes.EMPTY) {
                    switch (tile.type) {
                        case TileTypes.SNAKE_HEAD:
                            //TODO render head correct rotate etc!
                            let bitmap = new createjs.Bitmap(Images.SNAKE_HEAD_BLUE);
                            bitmap.scaleX = tile.width / bitmap.image.width;
                            bitmap.scaleY = tile.height / bitmap.image.height;
                            bitmap.x = xPos;
                            bitmap.y = yPos;
                            stage.addChild(bitmap);
                            break;
                        case TileTypes.FOOD:
                            //TODO change to star bitmap
/*                            let star = new createjs.Bitmap(Images.STAR);
                            star.scaleX = tile.width / star.image.width;
                            star.scaleY = tile.height / star.image.height;
                            star.x = xPos;
                            star.y = yPos;
                            stage.addChild(star);*/
                            let blackHole = new lib.blackhole();
                            blackHole.x = xPos;
                            blackHole.y = yPos;
                            stage.addChild(blackHole);
                            break;
                        case TileTypes.OBSTACLE:
/*                            let blackHole = new lib.blackhole();
                            blackHole.x = xPos;
                            blackHole.y = yPos;
                            stage.addChild(blackHole);*/
                            break;
                        default:
                            let rect = new createjs.Shape();
                            rect.graphics.beginStroke("#000000")
                                .beginFill(tile.color).drawRect(xPos, yPos, tile.width, tile.height);
                            stage.addChild(rect);
                    }
                }
            }
        }
    };

    //TODO remove
    /*    renderImg(ctx, x, y, img, tile) {
     ctx.drawImage(img, x, y, tile.width, tile.height);
     };*/

    validateCanvas(canvas, size) {
        if (canvas.width !== size.width && canvas.height !== size.height) {
            canvas.width = size.width;
            canvas.height = size.height;
            canvas.className = "";
        }
    };
}

export default StoreWatch(GameBoard, getActiveGame);
