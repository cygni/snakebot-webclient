import React from 'react'
import TournamentStore from '../../stores/TournamentStore'
import StoreWatch from '../../watch/StoreWatch'
import {Table} from 'react-bootstrap'


function getActivePlayerList() {
    let playerList = TournamentStore.getActivePlayers();
    return {playerList: playerList}
}

class PlayerList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Place</th>
                    <th>Name</th>
                    <th>Length</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                { this.props.playerList.map((player, index) => {
                    return (
                        <tr key={index} style={{background: player.color, color: "white"}}>
                            <td>{index+1}</td>
                            <td>{player.name}</td>
                            <td>{player.length}</td>
                            <td>{player.points}</td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>

        )
    }
}


export default StoreWatch(PlayerList, getActivePlayerList)