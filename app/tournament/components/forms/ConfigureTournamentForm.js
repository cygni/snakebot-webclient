import React from 'react'
import {Row, Col, Input, Label} from 'react-bootstrap'
import Action from '../../action/tournament-actions'
import WorldSize from '../slider/WorldSize'


class ConfigureTournamentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.createTournamentTable = this.createTournamentTable.bind(this);
        this.handleObstacles = this.handleObstacles.bind(this);
        this.state = {
            tournamentName: this.props.name,
            settings: {
                width: 25,
                height: 25,
                maxPlayers: 5,
                startSnakeLength: 1,
                timeInMsPerTick: 250,
                obstaclesEnabled: true,
                foodEnabled: true,
                edgeWrapsAround: false,
                headToTailConsumes: true,
                tailConsumeGrows: false,
                addFoodLikelihood: 15,
                removeFoodLikelihood: 5,
                addObstacleLikelihood: 15,
                removeObstacleLikelihood: 15,
                pointsPerLength: 1,
                pointsPerFood: 1,
                pointsPerCausedDeath: 5,
                pointsPerNibble: 10,
                pointsLastSnakeLiving: 10,
                noofRoundsTailProtectedAfterNibble: 3
            }
        }
    }

    handleTextChange(e) {
        this.setState(
            {
                tempGameName: e.target.value
            }
        );
    }

    handleObstacles (e) {
        this.setState(
            {
                settings: {
                    obstaclesEnabled: e.target.value
                }
            }
        )
    }


    createTournamentTable() {
        Action.createTournamentTable(this.state.tempGameName);
    };

    render() {
        console.log("SA: " + this.state.settings.obstaclesEnabled);
        return (

            <Row>
                <Col xs={18} md={12}>
                    <h1>Name: {this.state.tournamentName}</h1>
                </Col>
                <Col xs={10} md={6}>
                    <form role="form" onSubmit={this.createTournamentTable}>
                        <WorldSize width={this.state.settings.width} height={this.state.settings.height}/>

                        <Input name="Sa" type="radio" label="True" value={true} checked={this.state.settings.obstaclesEnabled == true} onChange={this.handleObstacles}/>
                        <Input name="Sa" type="radio" label="False"  value={false} checked={this.state.settings.obstaclesEnabled == false} onChange={this.handleObstacles}/>

                    </form>
                </Col>
            </Row>
        )
    }
}

ConfigureTournamentForm.PropTypes = {
    name: React.PropTypes.string.isRequired
};

export default ConfigureTournamentForm;
