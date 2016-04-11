import React from 'react'
import {Row, Col, Input, ButtonInput} from 'react-bootstrap'
import Action from '../../action/tournament-actions'

class CreateTournamentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.createTournament = this.createTournament.bind(this);
        this.state = {
            tempGameName: ''
        }
    }

    handleTextChange(e) {
        this.setState(
            {
                tempGameName: e.target.value
            }
        );
    }

    createTournament() {
        Action.createTournament(this.state.tempGameName);
    };

    render() {
        return (

            <Row>
                <Col xs={18} md={12}>
                    <h1> Create a new tournament</h1>
                </Col>
                <Col xs={10} md={6}>
                    <form role="form" onSubmit={this.createTournament}>
                        <Input value={this.state.tempGameName} onChange={this.handleTextChange} type="text"
                               label="Tournament name" placeholder="Enter name"/>
                        <ButtonInput type="submit" value="Create Tournament"/>
                    </form>
                </Col>
            </Row>
        )
    }
}

export default CreateTournamentForm;
