import React from "react";
import Tile from "../../common/gamecomponents/Tile";
import {Grid, Row, Col} from "react-bootstrap";
import Immutable from "immutable";
import Store from "../../baseStore/BaseStore";
import StoreWatch from "./watch/StoreWatch";
import TileUtils from "../../util/TileUtils";
import BoardUtils from "../../util/BoardUtils";


const squareImg1 = new Image();
squareImg1.onload = function () {
    console.log("Loaded squareImg1");
};
squareImg1.src = "img/ruta/ruta-1.svg";

const squareImg2 = new Image();
squareImg2.onload = function () {
    console.log("Loaded squareImg2");
};
squareImg2.src = "img/ruta/ruta-2.svg";

const starImg = new Image();
starImg.onload = function () {
    console.log("Loaded starImg");
};
starImg.src = "img/star/star.svg";

const blackholeImg = new Image();
blackholeImg.onload = function () {
    console.log("Loaded blackholeImg");
};
blackholeImg.src = "img/blackhole/blackhole.svg";

const snakeHeadBlueImg = new Image();
snakeHeadBlueImg.onload = function () {
    console.log("Loaded snakeHeadBlueImg");
};
snakeHeadBlueImg.src = "img/Snakes/blue/Blue-0ebde7-head.png";

const snakeHeadGreenImg = new Image();
snakeHeadGreenImg.onload = function () {
    console.log("Loaded snakeHeadGreenImg");
};
snakeHeadGreenImg.src = "img/Snakes/green/Green-3cc321-head.png";

const snakeHeadOrangeImg = new Image();
snakeHeadOrangeImg.onload = function () {
    console.log("Loaded snakeHeadOrangeImg");
};
snakeHeadOrangeImg.src = "img/Snakes/orange/Orange-ff8f35-head.png";

const snakeHeadYellowImg = new Image();
snakeHeadYellowImg.onload = function () {
    console.log("Loaded snakeHeadYellowImg");
};
snakeHeadYellowImg.src = "img/Snakes/yellow/Yellow-ffdf4a-head.png";

const worldMap = {};


function getActiveGame() {
    let game = Store.getActiveGame();
    return {game: game}
}

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            context: null,
            shouldRender: false,
            mapEvents: [],
            snakes: [],
            currentFrame: 0
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    };

    componentDidMount() {
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
               // size = BoardUtils.calculateSize(map);
                tileSize = BoardUtils.getTileSize(map);
            }
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
                                <canvas ref="canvas" width="2000" height="2000"/>
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

        let ctx = this.refs.canvas.getContext('2d');
        let activeGame = getActiveGame();
        //console.log("map: "  + JSON.stringify(worldMap));
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                let tile = TileUtils.getTileAt(x, y, map, tileSize, activeGame.game);
                let yPos = y * tile.width;
                let xPos = x * tile.width;
                if (tile.type !== undefined && tile.type !== "empty") {
                    if (tile.type === "snakehead") {
                        worldMap[x + "" +  y] = 1;
                        this.renderImg(ctx, xPos, yPos, this.getHeadImg(tile), tile);
                    } else if (tile.type === "food") {
                        worldMap[x + "" +  y] = 1;
                        this.drawRotatedRect(ctx, xPos, yPos, starImg, tile, 90);
                    } else if (tile.type === "obstacle") {
                        worldMap[x + "" +  y] = 1;
                        this.renderImg(ctx, xPos, yPos, blackholeImg, tile);
                    } else {
                        worldMap[x + "" +  y] = 1;
                        ctx.fillStyle = tile.color;
                        ctx.fillRect(xPos, yPos, tile.width, tile.height);
                    }
                } else {
                    if (worldMap[x + "" +  y] !== undefined && worldMap[x + "" +  y]=== 0) {
                    } else {
                        worldMap[x + "" +  y] = 0;
                        ctx.clearRect(xPos, yPos, tile.width, tile.height);
                        this.renderImg(ctx, xPos, yPos, y % 2 === 0 ? squareImg1 : squareImg2, tile);
                    }
                }
            }
        }
    };

    renderImg(ctx, x, y, img, tile) {
        ctx.drawImage(img, x, y, tile.width, tile.height);
    };

    drawRotatedRect(ctx, x, y, img, tile, degrees) {

       // console.log("rotate");
        // first save the untranslated/unrotated context
        ctx.save();
        this.renderImg(ctx, x, y, img, tile);
        // move the rotation point to the center of the rect
        ctx.translate(x + tile.width / 2, y + tile.height / 2);
        // rotate the rect
        ctx.rotate(degrees * Math.PI / 180);
        // restore the context to its untranslated/unrotated state
        ctx.restore();

    };

    getHeadImg(tile) {
        if (tile.color === "#3cc321") {
            return snakeHeadGreenImg;
        }
        if (tile.color === "#0ebde7") {
            return snakeHeadBlueImg;
        }
        if (tile.color === "#ff8f35") {
            return snakeHeadOrangeImg;
        }
        if (tile.color === "#ffdf4a") {
            return snakeHeadYellowImg;
        }
        //TODO return
        return snakeHeadBlueImg;
    };


}

export default StoreWatch(GameBoard, getActiveGame);
