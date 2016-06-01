import React from 'react'
import TournamentStore from '../../../baseStore/BaseStore'
import StoreWatch from '../../watch/StoreWatch'
import {Table} from 'react-bootstrap'


function getFinalPlacement() {
    let finalPlacement = TournamentStore.getFinalPlacement();
    return {finalPlacement: finalPlacement}
}

class FinalPlacementList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.finalPlacement.list.length != 0) {
            return (
                <div>
                    <h2> WINNER! {this.props.finalPlacement.winner.name} </h2>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Place</th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.props.finalPlacement.list.map((player, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{player.name}</td>
                                    <td>{player.points}</td>
                                </tr>
                            )
                        })}

                        </tbody>
                    </Table>
                </div>

            )
        }
        else {
            return (
                <div/>
            )
        }
    }
}


export default StoreWatch(FinalPlacementList, getFinalPlacement)