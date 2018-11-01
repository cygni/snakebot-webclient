import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Store from '../../../baseStore/BaseStore';
import StoreWatch from '../../watch/StoreWatch';
import * as TournamentActions from '../../action/tournament-actions';
import PlayerList from '../../components/players/PlayerList';

function getSettings() {
  const settings = Store.getSettings();
  const playerList = Store.getPlayerList();
  return { settings, playerList };
}

const propTypes = {
  tournamentName: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  playerList: PropTypes.object.isRequired,
};

class ConfigureTournamentForm extends React.Component {
  static createTournamentTable() {
    TournamentActions.createTournamentTable();
  }

  static startTournament() {
    TournamentActions.startTournament();
  }

  static killTournament() {
    TournamentActions.killTournament();
  }

  static onInputChange(event) {
    if (event.target) {
      TournamentActions.updateSettings(event.target.id, event.target.value);
    }
  }

  constructor(props) {
    super(props);
    ConfigureTournamentForm.createTournamentTable = ConfigureTournamentForm.createTournamentTable.bind(this);
  }

  render() {
    console.log(JSON.stringify(this.props.settings));
    return (
      <section className="page clear-fix">
        <div>
          <article className="half">
            <div className="center-block" style={{ textAlign: 'center' }}>
              <h1 className="tournament-name">Name: {this.props.tournamentName}</h1>
            </div>

            <form onSubmit={ConfigureTournamentForm.createTournamentTable}>
              <div>
                <label htmlFor="maxNoofPlayers">MaxPlayers: {this.props.settings.maxNoofPlayers}</label>
                <input
                  name="maxPlayers"
                  id="maxNoofPlayers"
                  type="number"
                  min="5"
                  max="100"
                  onChange={ConfigureTournamentForm.onInputChange}
                  value={this.props.settings.maxNoofPlayers}
                />
              </div>

              <div>
                <label htmlFor="startSnakeLength">StartSnakeLength: {this.props.settings.startSnakeLength}</label>
                <input
                  name="startSnakeLength"
                  id="startSnakeLength"
                  type="number"
                  min="1"
                  max="10"
                  onChange={ConfigureTournamentForm.onInputChange}
                  value={this.props.settings.startSnakeLength}
                />
              </div>

              <div>
                <label htmlFor="timeInMsPerTick">TimeInMsPerTick: {this.props.settings.timeInMsPerTick}</label>
                <input
                  name="timeInMsPerTick"
                  type="number"
                  id="timeInMsPerTick"
                  step="250"
                  min="250"
                  max="1500"
                  onChange={ConfigureTournamentForm.onInputChange}
                  value={this.props.settings.timeInMsPerTick}
                />
              </div>

              <div>
                <label htmlFor="pointsPerLength">PointsPerLength: {this.props.settings.pointsPerLength}</label>
                <input
                  name="pointsPerLength"
                  id="pointsPerLength"
                  type="number"
                  min="0"
                  max="25"
                  onChange={ConfigureTournamentForm.onInputChange}
                  value={this.props.settings.pointsPerLength}
                />
              </div>

              <div>
                <label htmlFor="pointsPerFood">PointsPerFood: {this.props.settings.pointsPerFood}</label>
                <input
                  name="pointsPerFood"
                  id="pointsPerFood"
                  type="number"
                  min="0"
                  max="25"
                  onChange={ConfigureTournamentForm.onInputChange}
                  value={this.props.settings.pointsPerFood}
                />
              </div>

              <div>
                <label htmlFor="pointsPerCausedDeath">
                  PointsPerCausedDeath: {this.props.settings.pointsPerCausedDeath}
                </label>
                <input
                  name="pointsPerCausedDeath"
                  id="pointsPerCausedDeath"
                  type="number"
                  min="0"
                  max="25"
                  onChange={ConfigureTournamentForm.onInputChange}
                  value={this.props.settings.pointsPerCausedDeath}
                />
              </div>

              <div>
                <label htmlFor="pointsPerNibble">PointsPerNibble: {this.props.settings.pointsPerNibble}</label>
                <input
                  name="pointsPerNibble"
                  id="pointsPerNibble"
                  type="number"
                  min="0"
                  max="25"
                  onChange={ConfigureTournamentForm.onInputChange}
                  value={this.props.settings.pointsPerNibble}
                />
              </div>

              <div>
                <label htmlFor="noofRoundsTailProtectedAfterNibble">
                  NoofRoundsTailProtectedAfterNibble:
                  {this.props.settings.noofRoundsTailProtectedAfterNibble}
                </label>
                <input
                  name="noofRoundsTailProtectedAfterNibble"
                  id="noofRoundsTailProtectedAfterNibble"
                  type="number"
                  min="0"
                  max="10"
                  onChange={ConfigureTournamentForm.onInputChange}
                  value={this.props.settings.noofRoundsTailProtectedAfterNibble}
                />
              </div>

              <div>
                <div>
                  <label htmlFor="addFoodLikelihood">
                    AddFoodLikelihood: {this.props.settings.addFoodLikelihood} %
                  </label>
                </div>
                <input
                  style={{ float: 'left', width: '440px' }}
                  name="addFoodLikelihood"
                  id="addFoodLikelihood"
                  type="range"
                  min="0"
                  max="100"
                  value={this.props.settings.addFoodLikelihood}
                  onChange={ConfigureTournamentForm.onInputChange}
                />
              </div>

              <div>
                <div>
                  <label htmlFor="removeFoodLikelihood">
                    RemoveFoodLikelihood: {this.props.settings.removeFoodLikelihood} %
                  </label>
                </div>
                <div>
                  <input
                    style={{ float: 'left', width: '440px' }}
                    name="removeFoodLikelihood"
                    id="removeFoodLikelihood"
                    type="range"
                    min="0"
                    max="100"
                    value={this.props.settings.removeFoodLikelihood}
                    onChange={ConfigureTournamentForm.onInputChange}
                  />
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <div>
                  <label htmlFor="obstaclesEnabled">ObstaclesEnabled:</label>
                </div>
                <div>
                  <input
                    name="obstaclesEnabled"
                    id="obstaclesEnabled"
                    type="radio"
                    value="True"
                    defaultChecked={this.props.settings.obstaclesEnabled === true}
                    onChange={ConfigureTournamentForm.onInputChange}
                  />{' '}
                  True
                  <label htmlFor="obstaclesEnabled" style={{ marginLeft: '20px' }}>
                    <input
                      name="obstaclesEnabled"
                      id="obstaclesEnabled"
                      type="radio"
                      value="False"
                      defaultChecked={this.props.settings.obstaclesEnabled === false}
                      onChange={ConfigureTournamentForm.onInputChange}
                    />{' '}
                    False
                  </label>
                </div>
              </div>

              <div style={{ width: '440px' }}>
                <div>
                  <label htmlFor="foodEnabled">FoodEnabled:</label>
                </div>
                <div>
                  <input
                    name="foodEnabled"
                    id="foodEnabled"
                    type="radio"
                    value="True"
                    defaultChecked={this.props.settings.foodEnabled === true}
                    onChange={ConfigureTournamentForm.onInputChange}
                  />{' '}
                  True
                  <label htmlFor="foodEnabled" style={{ marginLeft: '20px' }}>
                    <input
                      name="foodEnabled"
                      id="foodEnabled"
                      type="radio"
                      value="False"
                      defaultChecked={this.props.settings.foodEnabled === false}
                      onChange={ConfigureTournamentForm.onInputChange}
                    />{' '}
                    False
                  </label>
                </div>
              </div>
              <div style={{ width: '440px' }}>
                <div>
                  <label htmlFor="headToTailConsumes" style={{ marginRight: '20px' }}>
                    HeadToTailConsumes:
                  </label>
                </div>
                <div>
                  <input
                    name="headToTailConsumes"
                    id="headToTailConsumes"
                    type="radio"
                    value="True"
                    defaultChecked={this.props.settings.headToTailConsumes === true}
                    onChange={ConfigureTournamentForm.onInputChange}
                  />{' '}
                  True
                  <label htmlFor="headToTailConsumes" style={{ marginLeft: '20px' }}>
                    <input
                      name="headToTailConsumes"
                      id="headToTailConsumes"
                      type="radio"
                      defaultChecked={this.props.settings.headToTailConsumes === false}
                      value="False"
                      onChange={ConfigureTournamentForm.onInputChange}
                    />{' '}
                    False
                  </label>
                </div>
              </div>
              <div style={{ width: '440px' }}>
                <div>
                  <label htmlFor="tailConsumeGrows" style={{ marginRight: '20px' }}>
                    TailConsumeGrows:
                  </label>
                </div>
                <div>
                  <input
                    name="tailConsumeGrows"
                    id="tailConsumeGrows"
                    type="radio"
                    value="True"
                    defaultChecked={this.props.settings.tailConsumeGrows === true}
                    onChange={ConfigureTournamentForm.onInputChange}
                  />{' '}
                  True
                  <label htmlFor="tailConsumeGrows" style={{ marginLeft: '20px' }}>
                    <input
                      name="tailConsumeGrows"
                      id="tailConsumeGrows"
                      type="radio"
                      value="False"
                      defaultChecked={this.props.settings.tailConsumeGrows === false}
                      onChange={ConfigureTournamentForm.onInputChange}
                    />{' '}
                    False
                  </label>
                </div>
              </div>

              <Button onClick={ConfigureTournamentForm.createTournamentTable} bsStyle="info" bsSize="large">
                Update Tournament Settings
              </Button>
              <Button onClick={ConfigureTournamentForm.killTournament} bsStyle="info" bsSize="large">
                Kill Tournament
              </Button>
              <Button
                onClick={ConfigureTournamentForm.startTournament}
                disabled={this.props.playerList.length === 0}
                title={this.props.playerList.length === 0 ? 'Unable to start. No connected snakes' : ''}
                bsStyle="info"
                bsSize="large"
              >
                Start Tournament
              </Button>
            </form>
          </article>

          <article className="third">
            <h2> Competing snakes</h2>
            <PlayerList />
          </article>
        </div>
      </section>
    );
  }
}

ConfigureTournamentForm.propTypes = propTypes;

export default StoreWatch(ConfigureTournamentForm, getSettings);
