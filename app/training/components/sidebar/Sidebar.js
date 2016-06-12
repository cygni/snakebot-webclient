import React from "react";
import {Panel, Accordion, Table, ListGroup, ListGroupItem} from "react-bootstrap";
import StoreWatch from "../watch/StoreWatch";
import GameStore from "../../../baseStore/BaseStore";
import AppAction from "../../action/training-actions";
import GameControl from "../header/GameControl";


function getActiveGames() {
    let games = GameStore.getTrainingGames();
    return {games: games}
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    static selectedGame(key) {
        AppAction.activeGame(key);
    }

    render() {
        return (
            <Accordion style={{marginTop: "10px"}}>
                <h3>Active Games</h3>
                {this.props.games.map((game, index) => {
                    var boundClick = Sidebar.selectedGame.bind(this, game.id);

                    return (
                        <Panel header={game.id} eventKey={index} key={game.id} onClick={boundClick}>
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
                                            <td style={{background: snake.alive ? snake.color : "grey", color: "white"}}>
                                                Name: {snake.name}
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

                            <GameControl id={game.id}/>
                        </Panel>
                    )
                })}
            </Accordion>
        )
    }
}

export default StoreWatch(Sidebar, getActiveGames);
