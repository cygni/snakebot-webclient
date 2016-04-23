import React from 'react'
import StoreWatch from '../../watch/StoreWatch'
import TournamentStore from '../../stores/TournamentStore'
import GameControl from '../controls/GameControl'


function getActiveGames() {
    let game = TournamentStore.getActiveGame();
    return {game: game}
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (



                            <GameControl />

        )
    }
}

export default StoreWatch(Sidebar, getActiveGames);
