import React from 'react';
import TournamentAction from '../../action/tournament-actions';

class CreateTournamentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.createTournament = this.createTournament.bind(this);
    this.state = {
      tempGameName: '',
    };
  }

  handleTextChange(e) {
    this.setState(
      {
        tempGameName: e.target.value,
      }
        );
  }

  createTournament(e) {
    e.preventDefault();
    TournamentAction.createTournament(this.state.tempGameName);
  }

  render() {
    return (
    <section className="page clear-fix">
      <article>
        <h1>Create a new tournament</h1>
        <div className="text-content">
          <div className="box">
            <form onSubmit={this.createTournament}>
              <label htmlFor="username">Tournament name</label>
              <input
                value={this.state.tempGameName} onChange={this.handleTextChange} type="text"
                id="tournamentName" placeholder="your tournament game..."
              />
              <input type="submit" value="Create Tournament" />
            </form>
          </div>
        </div>
      </article>
    </section>
    );
  }
}

export default CreateTournamentForm;
