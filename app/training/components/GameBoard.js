import React from 'react'
import Tile from './gamecomponents/Tile'
import {Grid, Row, Col} from 'react-bootstrap';
import Immutable from 'immutable'
import GameStore from '../stores/GameStore'
import StoreWatch from './watch/StoreWatch'
import TileUtils from '../util/TileUtils'
import BoardUtils from '../util/BoardUtils'

function getActiveGame() {
    let game = GameStore.getActiveGame();
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
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.mapEvents != undefined && this.state.mapEvents.length > 0 && this.state.currentFrame < this.state.mapEvents.length;
    }

    componentDidMount() {
        GameStore.initWS();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.game) {
            this.setState({
                mapEvents: nextProps.game.mapEvents,
                currentFrame: nextProps.game.currentFrame
            });
        }
    };

    render() {
        let map = this.state.mapEvents[this.state.currentFrame];
        let size = {width: 0, height: 0};
        let tileSize = 0;
        let mapIsEmpty = BoardUtils.mapIsEmpty(map);
        if (!mapIsEmpty) {
            size = BoardUtils.calculateSize(map);
            tileSize = BoardUtils.getTileSize(map);
        }

        return (
            <Grid>
                <Col xs={14} md={9}>
                    <Grid >
                        <Row className="show-grid">
                            <div className={mapIsEmpty ? 'hidden' : ''} id="map"
                                 style={{marginTop: 20}}>
                                <canvas ref="canvas" width={size.width} height={size.height}/>
                                {this.renderGameBoard(map, mapIsEmpty, tileSize)}
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
        ctx.strokeStyle = "#D2D7D3";
        let activeGame = getActiveGame();

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                let tile = TileUtils.getTileAt(x, y, map, tileSize, activeGame.game);
                let yPos = y * tile.width;
                let xPos = x * tile.width;
                ctx.fillStyle = tile.color;
                ctx.fillRect(xPos, yPos, tile.width, tile.height);
                ctx.fillStyle = "#FFFFFF";
                ctx.strokeRect(xPos, yPos, tile.width, tile.height);
            }
        }
    }
}

export default StoreWatch(GameBoard, getActiveGame);
