import React from "react";
import {Table} from "react-bootstrap";
import StoreWatch from "../watch/StoreWatch";
import GameStore from "../../../baseStore/BaseStore";
import GameControl from "../header/GameControl";


function getActiveGame() {
    let game = GameStore.getActiveGame();
    return {game: game}
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.game) {
            return (
                <div>
                    <h3>Active Game</h3>

                    <Table striped bordered condensed>
                        <thead>
                        <tr>
                            <th>
                                Players
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.game.players.map(snake => {
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


                    <GameControl id={this.props.game.id}/>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default StoreWatch(Sidebar, getActiveGame);
