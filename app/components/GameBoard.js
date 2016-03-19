import React from 'react'
import _ from 'lodash'
import Tile from './gamecomponents/Tile'
import { Button, Glyphicon,DropdownButton, MenuItem, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import Immutable from 'immutable'
import AppAction from '../action/app-actions'
import GameStore from '../stores/active-games'
import StoreWatch from './watch/StoreWatch'
import SocketUtils from '../utils/SocketUtils'

function getActiveGame() {
    let game = GameStore.getActiveGame();
    return {game}
}

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            world: [],
            snakes: [],
            tileHeight: 0
        }
    }

    componentDidMount() {
        GameStore.initWS();
    }

    updateList() {
        //this.state.socket.send('{"type":"se.cygni.snake.websocket.event.api.ListActiveGames"}');
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.game);
        if (nextProps.game.world) {
            this.setState({
                world: nextProps.game.world
            });
        }
        if (nextProps.game.tileHeight) {
            this.setState({
                tileHeight: nextProps.game.tileHeight
            });
        }
    };


    render() {
        var _this = this;
        var tiles = [];

        if (this.state.world.length > 0) {
            for (let i = 0; i < _this.state.world.length; i++) {
                let tileRow = [];
                let tileList = Immutable.List(_this.state.world[i]);
                for (var j = 0; j < tileList.size; j++) {
                    let tile = tileList.get(j);
                    tileRow.push(<Tile key={tile.key}
                                       gradient={tile.gradient}
                                       color={tile.color}
                                       height={tile.height}
                                       width={tile.width}
                                       tail={tile.tail}
                                       type={tile.type}
                    />
                    )
                }
                tiles.push(tileRow);
            }
        }

        var immutTiles = Immutable.List(tiles);

        return (
                <Grid>
                    <Col xs={14} md={9}>
                        <Grid >
                            <Row className="show-grid">
                                <Col xs={18} md={12} lg={12}>
                                    <Col xs={12} md={8} lg={8}>
                                        <div style={{border: "10px solid black", background: "radial-gradient(50% 126%, #EF9A9A 50%, #F44336 100%)", width: 720, height: 520}}>
                                            {immutTiles.map((tilerow, index) => {
                                                return (
                                                    <div key={index}
                                                         style={{width: 700, height: this.state.tileHeight}}>
                                                        {tilerow}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                        </Grid>
                    </Col>
                </Grid>
        )
    }
}

export default StoreWatch(GameBoard, getActiveGame);