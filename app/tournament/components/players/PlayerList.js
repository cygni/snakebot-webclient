import React from 'react'
import TournamentStore from '../../../baseStore/BaseStore'
import StoreWatch from '../../watch/StoreWatch'
import {ListGroup, ListGroupItem} from 'react-bootstrap'



function getPlayerList() {
    let playerList = TournamentStore.getPlayerList();
    return {playerList: playerList}
}

class PlayerList extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render () {
        return (
            <ListGroup>
                { this.props.playerList.map((player, index) => {
                    return (<ListGroupItem key={index}>{player.name}</ListGroupItem>)
                })}
            </ListGroup>
        )
    }
}


export default StoreWatch(PlayerList, getPlayerList)