import React from 'react'
import Tile from './gamecomponents/Tile'
import {  Grid, Row, Col} from 'react-bootstrap';
import Immutable from 'immutable'
import GameStore from '../stores/active-games'
import StoreWatch from './watch/StoreWatch'

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
            tileSize: 0,
            width: 0,
            height: 0
        }
    }

    componentDidMount() {
        GameStore.initWS();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.game.world) {
            this.setState({
                world: nextProps.game.world
            });
        }
        if (nextProps.game.tileSize) {
            this.setState({
                tileSize: nextProps.game.tileSize,
                height: nextProps.game.height,
                width: nextProps.game.width
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
                                        <div className={this.state.width === 0 ? 'hidden' : ''} style={{border: "10px solid black", background: "radial-gradient(50% 126%, #EF9A9A 50%, #F44336 100%)",width: this.state.width + 20, height:  this.state.height + 20}}>
                                            {immutTiles.map((tilerow, index) => {
                                                return (
                                                    <div key={index}
                                                         style={{width: this.state.width , height: this.state.tileSize}}>
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