import React from 'react'
import Tile from './gamecomponents/Tile'
import { Grid, Row, Col} from 'react-bootstrap';
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
        if(nextProps.game) {
          this.setState({ mapEvents: nextProps.game.mapEvents,
                          currentFrame: nextProps.game.currentFrame });
        }
    };
    
    render() {
        let tiles = [];
        let map = this.state.mapEvents[this.state.currentFrame];

        let size = {width:0, height:0};
        let tileSize = 0;

        if (map != undefined && map.width != undefined) {

          size = BoardUtils.calculateSize(map);
          tileSize = BoardUtils.getTileSize(map);

          let activeGame = getActiveGame();

            for (let y = 0; y < map.height; y++) {
                let tileRow = [];

                for (var x = 0; x < map.width; x++) {
                    let tile = TileUtils.getTileAt(x, y, map, tileSize, activeGame.game);
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
                                        <div className={!map || !map.width || map.width === 0 ? 'hidden' : ''} style={{border: "10px solid black", background: "radial-gradient(50% 126%, #EF9A9A 50%, #F44336 100%)",width: size.width + 20, height:  size.height + 20}}>
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
