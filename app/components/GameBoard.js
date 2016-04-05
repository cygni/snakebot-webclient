import React from 'react'
import Tile from './gamecomponents/Tile'
import {  Grid, Row, Col} from 'react-bootstrap';
import Immutable from 'immutable'
import GameStore from '../stores/active-games'
import StoreWatch from './watch/StoreWatch'
import TileUtils from '../util/tile-utils'
import BoardUtils from '../util/board-utils'

function getActiveGame() {
    let game = GameStore.getActiveGame();
    return {game}
}

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: {},
            snakes: []
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

        if(nextProps.game.map) {
          this.setState({
            map: nextProps.game.map
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
        console.log(this.state.map);

        let tiles = [];
        let map = this.state.map;
        let size = BoardUtils.calculateSize(map);
        let tileSize = BoardUtils.getTileSize(map);
        let activeGame = getActiveGame();

        if (map != undefined && map.width != undefined) {
            for (let y = 0; y < map.height; y++) {
                let tileRow = [];

                for (var x = 0; x < map.width; x++) {
                    let tile = TileUtils.getTileAt(x, y, map, tileSize, activeGame.game)
                    tileRow.push(<Tile key={tile.key}
                                       color={tile.color}
                                       height={tile.height}
                                       width={tile.width}
                                       type={tile.type}
                                       tileType={tile.tileType}
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
                                        <div className={!map.width || map.width === 0 ? 'hidden' : ''} style={{border: "10px solid black", background: "radial-gradient(50% 126%, #EF9A9A 50%, #F44336 100%)",width: size.width + 20, height:  size.height + 20}}>
                                            {immutTiles.map((tilerow, index) => {
                                                return (
                                                    <div key={index}
                                                         style={{width: size.width , height: tileSize}}>
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
