import React from 'react';
import { Link } from 'react-router';

import GameAction from '../action/game-actions.js';
import GameStore from '../../baseStore/BaseStore';
import StoreWatch from '../components/watch/StoreWatch.jsx';

function getSearchResults() {
  const searchResults = GameStore.getSearchResults();

  return { searchResults };
}

const propTypes = {
  text: React.PropTypes.string,
  searchResults: React.PropTypes.object.isRequired,
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
    GameAction.searchForOldGames(this.state.searchName);
  }

  handleChange(e) {
    this.setState({
      searchName: e.target.value,
    });
  }

  noResultsFound() {
    const results = this.props.searchResults;
    if (results.hasSearched) {
      return results.matchingGames.length === 0;
    }

    return false;
  }

  render() {
    let results;
    if (this.noResultsFound()) {
      results = (
        <p
          className={this.noResultsFound() ? 'show' : 'hidden'}
          style={{ color: 'red' }}
        >No result found</p>);
    } else {
      results = (
        <ul> {
          this.props.searchResults.matchingGames.map((game, index) => (
            <li key={index}>
              <Link to={{ pathname: '/viewgame/' + game.gameId }}>{index}: {game.gameId} </Link>
            </li>
          ))}
        </ul>);
    }

    return (
      <div className="information">
        <h2>Search for games by snake name</h2>
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input
            id="yourName"
            type="text"
            value={this.props.text}
            placeholder="Your name"
            onChange={this.handleChange}
          />
          <input type="submit" value="Search" />
        </form>
        <h2>Search results</h2>
        { results }
      </div>
    );
  }
}

GameSearch.propTypes = propTypes;
export default new StoreWatch(GameSearch, getSearchResults);
