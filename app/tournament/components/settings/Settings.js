import React from 'react'
import TournamentStore from '../../../baseStore/BaseStore'
import StoreWatch from '../../watch/StoreWatch'
import {ButtonInput, Grid} from 'react-bootstrap'
import CreateTournamentForm from './../forms/CreateTournamentForm'
import ConfigureTournamentForm from './../forms/ConfigureTournamentForm'

function getActiveTournament() {
    let tournament = TournamentStore.getActiveTournament();
    return {tournament: tournament}
}

const innerButton = (
    <ButtonInput value="Create Tournament" onClick={() => alert("hello")}/>
);

class Settings extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let table;
        if (!this.props.tournament.tournamentName) {
            table = <CreateTournamentForm />
        }
        else {
            table = <ConfigureTournamentForm tournamentName={this.props.tournament.tournamentName}/>
        }

        return (
            <Grid fluid>
                {table}
            </Grid >
        )
    }
}

export default StoreWatch(Settings, getActiveTournament);