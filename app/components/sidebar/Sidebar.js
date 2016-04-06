import React from 'react'
import {Panel, Accordion,Table, ListGroup, ListGroupItem} from 'react-bootstrap'
import StoreWatch from '../watch/StoreWatch'
import GameStore from '../../stores/GameStore'
import AppAction from '../../action/app-actions'
import GameControl from '../header/GameControl'


function getActiveGames() {
    let games = GameStore.getGames();
    return {games}
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    selectedGame(key) {
        AppAction.activeGame(key);
    }

    render() {
        return (
            <Accordion style={{marginTop: "10px"}}>
                <h3>Active Games</h3>
                {this.props.games.map((game, index) => {
                    var boundClick = this.selectedGame.bind(this, game.id);
                    let title = game.gameFeatures.trainingGame ? game.players[0].name : game.id;
                    return (
                        <Panel header={title} eventKey={index} key={game.id} onClick={boundClick}>
                            <Table striped bordered condensed>
                                <thead>
                                <tr>
                                    <th>
                                        Players
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {game.players.map(snake => {
                                    return (
                                        <tr key={snake.id}>
                                            <td style={{background: snake.alive ? snake.color : "grey", color: "white"}}>Name: {snake.name}
                                                Length: {snake.length} Points: {snake.points} </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>

                            <ListGroup>
                                <ListGroupItem>Width: {game.gameFeatures.width}</ListGroupItem>
                                <ListGroupItem>Height: {game.gameFeatures.height}</ListGroupItem>
                            </ListGroup>

                            <GameControl />
                        </Panel>
                    )
                })}
            </Accordion>
        )
    }
}

export default StoreWatch(Sidebar, getActiveGames);
