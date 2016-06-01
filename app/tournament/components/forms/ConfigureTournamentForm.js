import React from 'react';
import {Row, Col, Input, Button, ButtonGroup} from 'react-bootstrap';
import TournamentStore from '../../../baseStore/BaseStore'
import StoreWatch from '../../watch/StoreWatch'
import Action from '../../action/tournament-actions'
import PlayerList from '../players/PlayerList'
import './configure-tournament-form.scss';


function getSettings() {
    let settings = TournamentStore.getSettings();
    return {settings: settings}
}


class ConfigureTournamentForm extends React.Component {
    constructor(props) {
        super(props);
        this.createTournamentTable = this.createTournamentTable.bind(this);
    }


    createTournamentTable() {
        Action.createTournamentTable();
    }

    startTournament() {
        Action.startTournament();
    }

    killTournament() {
        Action.killTournament()
    }

    static onInputChange(event) {
        if (event.target) {
            Action.updateSettings(event.target.id, event.target.value);
        }
    }

    render() {
        return (
            <div className="configure-tournament-form">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <Row>
                            <Col md={3}>
                                <Button onClick={this.killTournament} bsStyle="info" bsSize="large">Kill
                                    Tournament</Button>
                            </Col>
                            <Col md={6} mdPush={1}>
                                <div className="center-block" style={{align: "center"}}>
                                    <h1 className="tournament-name">Name: {this.props.tournamentName}</h1>
                                </div>
                            </Col>
                            <Col md={3}>
                                <ButtonGroup>
                                    <Button onClick={this.startTournament} bsStyle="info" bsSize="large">Setup
                                        tournament bracket</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col md={10} className="panel panel-default">
                                <div className="panel-heading">
                                    <h2 >Settings</h2>
                                </div>
                                <form role="form" onSubmit={this.createTournamentTable}>
                                    <Col md={6}>
                                        <Row className="width">
                                            <Col md={6}>
                                                <h5>Width: {this.props.settings.width} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input type="select" id="width"
                                                       onChange={ConfigureTournamentForm.onInputChange}>
                                                    <option value="SMALL">SMALL (25)</option>
                                                    <option value="MEDIUM">MEDIUM (50)</option>
                                                    <option value="LARGE">LARGE (75)</option>
                                                    <option value="XLARGE">XLARGE (100)</option>
                                                </Input>
                                            </Col>
                                        </Row>
                                        <Row className="height">
                                            <Col md={6}>
                                                <h5>Height: {this.props.settings.height} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input type="select" id="height" value={this.props.settings.height}
                                                       onChange={ConfigureTournamentForm.onInputChange}>
                                                    <option value="SMALL">SMALL (25)</option>
                                                    <option value="MEDIUM">MEDIUM (50)</option>
                                                    <option value="LARGE">LARGE (75)</option>
                                                    <option value="XLARGE">XLARGE (100)</option>
                                                </Input>
                                            </Col>
                                        </Row>
                                        <Row className="maxPlayers">
                                            <Col md={6}>
                                                <h5>MaxPlayers: {this.props.settings.maxNoofPlayers} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="maxPlayers" id="maxNoofPlayers" type="number" min="5"
                                                       max="100"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.maxNoofPlayers}/>
                                            </Col>
                                        </Row>
                                        <Row className="startSnakeLength">
                                            <Col md={6}>
                                                <h5>StartSnakeLength: {this.props.settings.startSnakeLength} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="startSnakeLength" id="startSnakeLength" type="number"
                                                       min="1"
                                                       max="10"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.startSnakeLength}/>
                                            </Col>
                                        </Row>
                                        <Row className="timeInMsPerTick">
                                            <Col md={6}>
                                                <h5>TimeInMsPerTick: {this.props.settings.timeInMsPerTick} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="timeInMsPerTick" type="number" id="timeInMsPerTick"
                                                       step="250"
                                                       min="250" max="1500"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.timeInMsPerTick}/>
                                            </Col>
                                        </Row>
                                        <Row className="pointsPerLength">
                                            <Col md={6}>
                                                <h5>PointsPerLength: {this.props.settings.pointsPerLength} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="pointsPerLength" id="pointsPerLength" type="number" min="0"
                                                       max="25"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.pointsPerLength}/>
                                            </Col>
                                        </Row>
                                        <Row className="pointsPerFood">
                                            <Col md={6}>
                                                <h5>PointsPerFood: {this.props.settings.pointsPerFood} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="pointsPerFood" id="pointsPerFood" type="number" min="0"
                                                       max="25"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.pointsPerFood}/>
                                            </Col>
                                        </Row>
                                        <Row className="pointsPerCausedDeath">
                                            <Col md={6}>
                                                <h5>
                                                    PointsPerCausedDeath: {this.props.settings.pointsPerCausedDeath} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="pointsPerCausedDeath" id="pointsPerCausedDeath"
                                                       type="number"
                                                       min="0" max="25"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.pointsPerCausedDeath}/>
                                            </Col>
                                        </Row>
                                        <Row className="pointsPerNibble">
                                            <Col md={6}>
                                                <h5>PointsPerNibble: {this.props.settings.pointsPerNibble} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="pointsPerNibble" id="pointsPerNibble" type="number" min="0"
                                                       max="25"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.pointsPerNibble}/>
                                            </Col>
                                        </Row>
                                        <Row className="pointsLastSnakeLiving">
                                            <Col md={6}>
                                                <h5>
                                                    PointsLastSnakeLiving: {this.props.settings.pointsLastSnakeLiving} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="pointsLastSnakeLiving" id="pointsLastSnakeLiving"
                                                       type="number"
                                                       min="0" max="25"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.pointsLastSnakeLiving}/>
                                            </Col>
                                        </Row>
                                        <Row className="pointsPerSuicide">
                                            <Col md={6}>
                                                <h5>PointsPerSuicide: {this.props.settings.pointsSuicide} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="pointsSuicide" id="pointsSuicide" type="number" min="-25"
                                                       max="-1"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.pointsSuicide}/>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col md={6}>
                                        <Row className="noofRoundsTailProtectedAfterNibble">
                                            <Col md={6}>
                                                <h5>
                                                    NoofRoundsTailProtectedAfterNibble: {this.props.settings.noofRoundsTailProtectedAfterNibble} </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="noofRoundsTailProtectedAfterNibble"
                                                       id="noofRoundsTailProtectedAfterNibble" type="number" min="0"
                                                       max="10"
                                                       onChange={ConfigureTournamentForm.onInputChange}
                                                       value={this.props.settings.noofRoundsTailProtectedAfterNibble}/>
                                            </Col>
                                        </Row>
                                        <Row className="addFoodLikelihood">
                                            <Col md={6}>
                                                <h5>AddFoodLikelihood: {this.props.settings.addFoodLikelihood} %</h5>
                                            </Col>
                                            <Col md={6}>
                                                <input name="addFoodLikelihood" id="addFoodLikelihood" type="range"
                                                       min="0"
                                                       max="100"
                                                       value={this.props.settings.addFoodLikelihood}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="removeFoodLikelihood">
                                            <Col md={6}>
                                                <h5>RemoveFoodLikelihood: {this.props.settings.removeFoodLikelihood}
                                                    %</h5>
                                            </Col>
                                            <Col md={6}>
                                                <input name="removeFoodLikelihood" id="removeFoodLikelihood"
                                                       type="range"
                                                       min="0" max="100"
                                                       value={this.props.settings.removeFoodLikelihood}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="addObstacleLikelihood">
                                            <Col md={6}>
                                                <h5>AddObstacleLikelihood: {this.props.settings.addObstacleLikelihood}
                                                    %</h5>
                                            </Col>
                                            <Col md={6}>
                                                <input name="addObstacleLikelihood" id="addObstacleLikelihood"
                                                       type="range"
                                                       min="0" max="100"
                                                       value={this.props.settings.addObstacleLikelihood}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="removeObstacleLikelihood">
                                            <Col md={6}>
                                                <h5>
                                                    RemoveObstacleLikelihood: {this.props.settings.removeObstacleLikelihood}
                                                    %</h5>
                                            </Col>
                                            <Col md={6}>
                                                <input name="removeObstacleLikelihood" id="removeObstacleLikelihood"
                                                       type="range" min="0" max="100"
                                                       value={this.props.settings.removeObstacleLikelihood}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="obstaclesEnabled">
                                            <Col md={6}>
                                                <h5>ObstaclesEnabled: </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="obstaclesEnabled" id="obstaclesEnabled" type="radio"
                                                       label="True" defaultValue={true}
                                                       defaultChecked={this.props.settings.obstaclesEnabled === true}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                                <Input name="obstaclesEnabled" id="obstaclesEnabled" type="radio"
                                                       label="False" defaultValue={false}
                                                       defaultChecked={this.props.settings.obstaclesEnabled === false}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="foodEnabled">
                                            <Col md={6}>
                                                <h5>FoodEnabled: </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="foodEnabled" id="foodEnabled" type="radio" label="True"
                                                       defaultValue={true}
                                                       defaultChecked={this.props.settings.foodEnabled === true}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                                <Input name="foodEnabled" id="foodEnabled" type="radio" label="False"
                                                       defaultValue={false}
                                                       defaultChecked={this.props.settings.foodEnabled === false}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="edgeWrapsAround">
                                            <Col md={6}>
                                                <h5>EdgeWrapsAround:</h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="edgeWrapsAround" id="edgeWrapsAround" type="radio"
                                                       label="True"
                                                       defaultValue={true}
                                                       defaultChecked={this.props.settings.edgeWrapsAround === true}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                                <Input name="edgeWrapsAround" id="edgeWrapsAround" type="radio"
                                                       label="False" defaultValue={false}
                                                       defaultChecked={this.props.settings.edgeWrapsAround === false}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="headToTailConsumes">
                                            <Col md={6}>
                                                <h5>HeadToTailConsumes: </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="headToTailConsumes" id="headToTailConsumes" type="radio"
                                                       label="True" defaultValue={true}
                                                       defaultChecked={this.props.settings.headToTailConsumes === true}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                                <Input name="headToTailConsumes" id="headToTailConsumes" type="radio"
                                                       label="False" defaultValue={false}
                                                       defaultChecked={this.props.settings.headToTailConsumes === false}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="tailConsumeGrows">
                                            <Col md={6}>
                                                <h5>TailConsumeGrows: </h5>
                                            </Col>
                                            <Col md={6}>
                                                <Input name="tailConsumeGrows" id="tailConsumeGrows" type="radio"
                                                       label="True" defaultValue={true}
                                                       defaultChecked={this.props.settings.tailConsumeGrows === true}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                                <Input name="tailConsumeGrows" id="tailConsumeGrows" type="radio"
                                                       label="False" defaultValue={false}
                                                       defaultChecked={this.props.settings.tailConsumeGrows === false}
                                                       onChange={ConfigureTournamentForm.onInputChange}/>
                                            </Col>
                                        </Row>
                                        <Row className="tailConsumeGrows">
                                            <Col md={6} mdPush={6}>
                                                <Button onClick={this.createTournamentTable} bsStyle="info"
                                                        bsSize="large">Update
                                                    Tournament Settings</Button>
                                            </Col>
                                        </Row>

                                    </Col>
                                </form>
                            </Col>


                            <Col md={2}>
                                <h2>Competing snakes</h2>
                                <PlayerList/>
                            </Col>
                        </Row>
                    </div>
                </div>


            </div>
        )
    }
}

ConfigureTournamentForm.PropTypes = {
    tournamentName: React.PropTypes.string.isRequired
};

export default StoreWatch(ConfigureTournamentForm, getSettings);
