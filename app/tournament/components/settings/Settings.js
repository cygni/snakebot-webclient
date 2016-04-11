import React from 'react'
import TournamentStore from '../../stores/TournamentStore'
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
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            tournamentName: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tournament.name) {
            this.setState({
                tournamentName: nextProps.tournament.name
            })
        }
    };

    render() {
        let table;
        if (!this.state.tournamentName) {
            table = <CreateTournamentForm />
        }
        else {
            table = <ConfigureTournamentForm name={this.state.tournamentName}/>
        }

        return (
            <Grid fluid>
                {table}
            </Grid >
        )
    }
}

export default StoreWatch(Settings, getActiveTournament);