import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Immutable from 'immutable';
import Tile from '../../../common/gamecomponents/Tile.jsx';
import TournamentStore from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch.jsx';
import TileUtils from '../../../util/TileUtils';
import BoardUtils from '../../../util/BoardUtils';
import TournamentAction from '../../action/tournament-actions';
import ActivePlayerList from '../players/ActivePlayerList.jsx';


function getActiveGame() {
  const game = TournamentStore.getActiveGame();
  return { game };
}

const propTypes = {
  game: React.PropTypes.object.isRequired,
};

class GameBoard extends React.Component {
  static startGame() {
    TournamentAction.startGame();
  }

  constructor(props) {
    super(props);
    GameBoard.startGame = GameBoard.startGame.bind(this);
    this.state = {
      mapEvents: [],
      snakes: [],
      currentFrame: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game) {
      this.setState({
        mapEvents: nextProps.game.mapEvents,
        currentFrame: nextProps.game.currentFrame,
      });
    }
  }

  render() {
    const tiles = [];
    const map = this.state.mapEvents[this.state.currentFrame];

    let size = { width: 0, height: 0 };
    let tileSize = 0;

    if (map !== undefined && map.width !== undefined) {
      size = BoardUtils.calculateSize(map);
      tileSize = BoardUtils.getTileSize(map);

      for (let y = 0; y < map.height; y += 1) {
        const tileRow = [];

        for (let x = 0; x < map.width; x += 1) {
          const tile = TileUtils.getTileAt(x, y, map, tileSize, this.props.game);
          tileRow.push(
            <Tile
              key={tile.key}
              color={tile.color}
              height={tile.height}
              width={tile.width}
              type={tile.type}
              tileType={tile.tileType}
            />
          );
        }
        tiles.push(tileRow);
      }
    }

    const immutTiles = Immutable.List(tiles);
    return (
      <Grid fluid>
        <Row>
          <Col xs={14} md={9}>
            <Grid >
              <Row className="show-grid">
                <Col xs={18} md={12} lg={12}>
                  <Col xs={12} md={8} lg={8}>
                    <div
                      className={!map || !map.width || map.width === 0 ? 'hidden' : ''}
                      style={{ border: '10px solid black',
                        background: 'radial-gradient(50% 126%, #EF9A9A 50%, #F44336 100%)',
                        width: size.width + 20,
                        height: size.height + 20 }}
                    > {
                      immutTiles.map((tilerow, index) => (
                        <div
                          key={index}
                          style={{ width: size.width, height: tileSize }}
                        >
                          {tilerow}
                        </div>
                      ))}
                    </div>
                  </Col>
                </Col>
              </Row>
            </Grid>
          </Col>
          <Col xs={4} md={3}>
            <ActivePlayerList />
          </Col>
        </Row>
        <Row>
          <Col md={2} mdPush={5}>
            <div className="center-block" style={{ paddingTop: '30px' }}>
              <Button
                onClick={GameBoard.startGame}
                className="btn btn-primary btn-lg"
              > Start game</Button>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

GameBoard.propTypes = propTypes;

export default new StoreWatch(GameBoard, getActiveGame);
