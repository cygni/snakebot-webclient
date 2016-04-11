import React from 'react';
import {Row, Col, Input, Label, ListGroup, ListGroupItem} from 'react-bootstrap';
import Action from '../../action/tournament-actions';
import WorldSize from '../slider/WorldSize';
import LinkedStateMixin from 'react-addons-linked-state-mixin';


const ConfigureTournamentForm = React.createClass({
    mixins: [LinkedStateMixin],

    getInitialState() {
        return {
            tournamentName: this.props.name,
            width: 25, // 25,50,75,100
            height: 25, // 25,50,75,100
            maxPlayers: 5, //min 5
            startSnakeLength: 1, // max 10 min 1
            timeInMsPerTick: 250, // min 250 max 1500
            pointsPerLength: 1, // 0-25
            pointsPerFood: 1, // 0-25
            pointsPerCausedDeath: 5, // 0-25
            pointsPerNibble: 10, // 0-25
            pointsLastSnakeLiving: 10, //0-25
            pointsPerSuicide: -1, // -1 till -25
            noofRoundsTailProtectedAfterNibble: 3, //0-10
            addFoodLikelihood: 15, // 1-100%
            removeFoodLikelihood: 5, // 1-100%
            addObstacleLikelihood: 15, // 1-100%
            removeObstacleLikelihood: 15, // 1-100%
            obstaclesEnabled: true,
            foodEnabled: true,
            edgeWrapsAround: false,
            headToTailConsumes: true,
            tailConsumeGrows: false
        }
    },

    // createTournamentTable() {
    //     Action.createTournamentTable(this.state.tempGameName);
    // },

    settingsLinkState(name) {
        return {
            value: this.state[name],
            requestChange: (newValue) => {
                this.setState({[name]: newValue});
            }
        }
    },

    handleRadioOnChange(booleanName, name) {
        this.setState({[name]: booleanName});
    },

    render() {
        return (
            <div>
                <Row>
                    <Col md={12} >
                        <h1 style={{textAlign: "center"}}>Name: {this.state.tournamentName}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} mdPush={1}>
                        <h1>Settings</h1>
                        <form role="form" onSubmit={this.createTournamentTable}>
                            <Row className="width">
                                <Col md={6} >
                                    <h5>Width: {this.state.width} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input type="select" valueLink={this.settingsLinkState('width')}>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="75">75</option>
                                        <option value="100">100</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="height">
                                <Col md={6} >
                                    <h5>Height: {this.state.height} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input type="select" valueLink={this.settingsLinkState('height')}>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="75">75</option>
                                        <option value="100">100</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="maxPlayers">
                                <Col md={6} >
                                    <h5>MaxPlayers: {this.state.maxPlayers} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="maxPlayers" type="number" min="5" valueLink={this.settingsLinkState('maxPlayers')}/>
                                </Col>
                            </Row>
                            <Row className="startSnakeLength">
                                <Col md={6} >
                                    <h5>StartSnakeLength: {this.state.startSnakeLength} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="startSnakeLength" type="number" min="1" max="10" valueLink={this.settingsLinkState('startSnakeLength')}/>
                                </Col>
                            </Row>
                            <Row className="timeInMsPerTick">
                                <Col md={6} >
                                    <h5>TimeInMsPerTick: {this.state.timeInMsPerTick} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="timeInMsPerTick" type="number" min="250" max="1500" valueLink={this.settingsLinkState('timeInMsPerTick')}/>
                                </Col>
                            </Row>
                            <Row className="pointsPerLength">
                                <Col md={6} >
                                    <h5>PointsPerLength: {this.state.pointsPerLength} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="pointsPerLength" type="number" min="0" max="25" valueLink={this.settingsLinkState('pointsPerLength')}/>
                                </Col>
                            </Row>
                            <Row className="pointsPerFood">
                                <Col md={6} >
                                    <h5>PointsPerFood: {this.state.pointsPerFood} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="pointsPerFood" type="number" min="0" max="25" valueLink={this.settingsLinkState('pointsPerFood')}/>
                                </Col>
                            </Row>
                            <Row className="pointsPerCausedDeath">
                                <Col md={6} >
                                    <h5>PointsPerCausedDeath: {this.state.pointsPerCausedDeath} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="pointsPerCausedDeath" type="number" min="0" max="25" valueLink={this.settingsLinkState('pointsPerCausedDeath')}/>
                                </Col>
                            </Row>
                            <Row className="pointsPerNibble">
                                <Col md={6} >
                                    <h5>PointsPerNibble: {this.state.pointsPerNibble} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="pointsPerNibble" type="number" min="0" max="25" valueLink={this.settingsLinkState('pointsPerNibble')}/>
                                </Col>
                            </Row>
                            <Row className="pointsLastSnakeLiving">
                                <Col md={6} >
                                    <h5>PointsLastSnakeLiving: {this.state.pointsLastSnakeLiving} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="pointsLastSnakeLiving" type="number" min="0" max="25" valueLink={this.settingsLinkState('pointsLastSnakeLiving')}/>
                                </Col>
                            </Row>
                            <Row className="pointsPerSuicide">
                                <Col md={6} >
                                    <h5>PointsPerSuicide: {this.state.pointsPerSuicide} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="pointsPerSuicide" type="number" min="-25" max="-1" valueLink={this.settingsLinkState('pointsPerSuicide')}/>
                                </Col>
                            </Row>
                            <Row className="noofRoundsTailProtectedAfterNibble">
                                <Col md={6} >
                                    <h5>NoofRoundsTailProtectedAfterNibble: {this.state.noofRoundsTailProtectedAfterNibble} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="noofRoundsTailProtectedAfterNibble" type="number" min="0" max="10" valueLink={this.settingsLinkState('noofRoundsTailProtectedAfterNibble')}/>
                                </Col>
                            </Row>
                            <Row className="addFoodLikelihood">
                                <Col md={6} >
                                    <h5>AddFoodLikelihood: {this.state.addFoodLikelihood} %</h5>
                                </Col>
                                <Col md={6} >
                                    <input name="addFoodLikelihood" type="range" min="0" max="100" defaultValue={this.state.addFoodLikelihood} valueLink={this.settingsLinkState('addFoodLikelihood')}/>
                                </Col>
                            </Row>
                            <Row className="removeFoodLikelihood">
                                <Col md={6} >
                                    <h5>RemoveFoodLikelihood: {this.state.removeFoodLikelihood} %</h5>
                                </Col>
                                <Col md={6} >
                                    <input name="removeFoodLikelihood" type="range" min="0" max="100" defaultValue={this.state.removeFoodLikelihood} valueLink={this.settingsLinkState('removeFoodLikelihood')}/>
                                </Col>
                            </Row>
                            <Row className="addObstacleLikelihood">
                                <Col md={6} >
                                    <h5>AddObstacleLikelihood: {this.state.addObstacleLikelihood} %</h5>
                                </Col>
                                <Col md={6} >
                                    <input name="addObstacleLikelihood" type="range" min="0" max="100" defaultValue={this.state.addObstacleLikelihood} valueLink={this.settingsLinkState('addObstacleLikelihood')}/>
                                </Col>
                            </Row>
                            <Row className="removeObstacleLikelihood">
                                <Col md={6} >
                                    <h5>RemoveObstacleLikelihood: {this.state.removeObstacleLikelihood} %</h5>
                                </Col>
                                <Col md={6} >
                                    <input name="removeObstacleLikelihood" type="range" min="0" max="100" defaultValue={this.state.removeObstacleLikelihood} valueLink={this.settingsLinkState('removeObstacleLikelihood')}/>
                                </Col>
                            </Row>
                            <Row className="obstaclesEnabled">
                                <Col md={6} >
                                    <h5>ObstaclesEnabled: {this.state.obstaclesEnabled} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="obstaclesEnabled" type="radio" label="True" defaultValue={true} checked={this.state.obstaclesEnabled === true} onChange={this.handleRadioOnChange.bind(this, true, "obstaclesEnabled")}/>
                                    <Input name="obstaclesEnabled" type="radio" label="False"  defaultValue={false} checked={this.state.obstaclesEnabled === false} onChange={this.handleRadioOnChange.bind(this, false, "obstaclesEnabled")}/>
                                </Col>
                            </Row>
                            <Row className="foodEnabled">
                                <Col md={6} >
                                    <h5>FoodEnabled: {this.state.foodEnabled} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="foodEnabled" type="radio" label="True" defaultValue={true} checked={this.state.foodEnabled === true} onChange={this.handleRadioOnChange.bind(this, true, "foodEnabled")}/>
                                    <Input name="foodEnabled" type="radio" label="False"  defaultValue={false} checked={this.state.foodEnabled === false} onChange={this.handleRadioOnChange.bind(this, false, "foodEnabled")}/>
                                </Col>
                            </Row>
                            <Row className="edgeWrapsAround">
                                <Col md={6} >
                                    <h5>EdgeWrapsAround: {this.state.edgeWrapsAround} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="edgeWrapsAround" type="radio" label="True" defaultValue={true} checked={this.state.edgeWrapsAround === true} onChange={this.handleRadioOnChange.bind(this, true, "edgeWrapsAround")}/>
                                    <Input name="edgeWrapsAround" type="radio" label="False"  defaultValue={false} checked={this.state.edgeWrapsAround === false} onChange={this.handleRadioOnChange.bind(this, false, "edgeWrapsAround")}/>
                                </Col>
                            </Row>
                            <Row className="headToTailConsumes">
                                <Col md={6} >
                                    <h5>HeadToTailConsumes: {this.state.headToTailConsumes} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="headToTailConsumes" type="radio" label="True" defaultValue={true} checked={this.state.headToTailConsumes === true} onChange={this.handleRadioOnChange.bind(this, true, "headToTailConsumes")}/>
                                    <Input name="headToTailConsumes" type="radio" label="False"  defaultValue={false} checked={this.state.headToTailConsumes === false} onChange={this.handleRadioOnChange.bind(this, false, "headToTailConsumes")}/>
                                </Col>
                            </Row>
                            <Row className="tailConsumeGrows">
                                <Col md={6} >
                                    <h5>TailConsumeGrows: {this.state.tailConsumeGrows} </h5>
                                </Col>
                                <Col md={6} >
                                    <Input name="tailConsumeGrows" type="radio" label="True" defaultValue={true} checked={this.state.tailConsumeGrows === true} onChange={this.handleRadioOnChange.bind(this, true, "tailConsumeGrows")}/>
                                    <Input name="tailConsumeGrows" type="radio" label="False"  defaultValue={false} checked={this.state.tailConsumeGrows === false} onChange={this.handleRadioOnChange.bind(this, false, "tailConsumeGrows")}/>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                    <Col md={4} mdPush={3}>
                        <h1>Available players</h1>
                        <ListGroup>
                            <ListGroupItem>Player 1</ListGroupItem>
                            <ListGroupItem>Player 2</ListGroupItem>
                            <ListGroupItem>Player 3</ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        )
    }
});

export default ConfigureTournamentForm;
