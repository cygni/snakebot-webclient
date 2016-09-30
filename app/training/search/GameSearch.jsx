import React from 'react';
import { Link } from 'react-router';

import AppAction from '../action/training-actions';
import GameStore from '../../baseStore/BaseStore';
import StoreWatch from '../components/watch/StoreWatch.jsx';

function getOldGames() {
  const games = GameStore.getOldGames();
  const results = GameStore.hasResults();

  return { games, results };
}

const propTypes = {
  text: React.PropTypes.string,
  results: React.PropTypes.bool.isRequired,
  games: React.PropTypes.array.isRequired,
};

class GameSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    AppAction.searchForOldGames(this.state.searchName);
  }

  handleChange(e) {
    this.setState({
      searchName: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input
            id="yourName"
            type="text"
            value={this.props.text}
            placeholder="Your name"
            onChange={this.handleChange}
          />
          <input type="submit" value="Post" />
          <label
            htmlFor="yourName"
            className={this.props.results ? 'show' : 'hidden'}
            style={{ color: 'red' }}
          >No result found</label>
        </form>
        <div><h2>Old games</h2></div>
        <ul> {
          this.props.games.map((game, index) => (
            <li key={index}>
              <Link to={{ pathname: '/viewgame/' + game.gameId }}>{index}: {game.gameId} </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

GameSearch.propTypes = propTypes;
export default new StoreWatch(GameSearch, getOldGames);
