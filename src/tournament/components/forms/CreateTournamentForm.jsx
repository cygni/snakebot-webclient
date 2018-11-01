import React from 'react';
import * as TournamentActions from '../../action/tournament-actions';

export default class CreateTournamentForm extends React.Component {
  state = {
    tempGameName: '',
  };

  handleTextChange = e => {
    this.setState({
      tempGameName: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    TournamentActions.createTournament(this.state.tempGameName);
  };

  render() {
    return (
      <section className="page clear-fix">
        <article>
          <h1>Create a new tournament</h1>
          <div className="text-content">
            <div className="box">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="tournamentName">Tournament name</label>
                <input
                  value={this.state.tempGameName}
                  onChange={this.handleTextChange}
                  type="text"
                  id="tournamentName"
                  placeholder="tournament name..."
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
