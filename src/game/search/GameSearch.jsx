import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import * as GameActions from '../action/game-actions';
import GameStore from '../../baseStore/BaseStore';
import StoreWatch from '../components/watch/StoreWatch';

function getSearchResults() {
  const searchResults = GameStore.getSearchResults();

  return { searchResults };
}

class GameSearch extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    searchResults: PropTypes.object.isRequired,
  };

  state = {
    searchName: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    GameActions.searchForOldGames(this.state.searchName);
  };

  handleChange = e => {
    this.setState({
      searchName: e.target.value,
    });
  };

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
        <p className={this.noResultsFound() ? 'show' : 'hidden'} style={{ color: 'red' }}>
          No result found
        </p>
      );
    } else {
      results = (
        <ul className="searchresults">
          {' '}
          {this.props.searchResults.matchingGames.map((game, index) => (
            <li key={index}>
              <h3 className="searchheadline">
                <Link to={{ pathname: '/viewgame/' + game.gameId }}>
                  <span className="date">Date: {game.gameDate}</span>
                </Link>
              </h3>
              <ul className="players">
                {' '}
                {game.players.map((player, i) => (
                  <li key={i} className={this.state.searchName === player ? 'match' : ''}>
                    {player}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <section className="page clear-fix">
        <article>
          <h1>Search for old games</h1>
          <p className="searchintro">You can find old games here by searching for the snake name.</p>
          <div className="text-content">
            <form className="clear-fix" onSubmit={this.handleSubmit}>
              <input
                id="yourName"
                type="text"
                value={this.props.text}
                placeholder="Snake name"
                onChange={this.handleChange}
                className="searchfield"
              />
              <input className="searchbtn" type="submit" value="Search" />
            </form>
            <h2 className="searchresultsheadline">Results</h2>
            {results}
          </div>
        </article>
      </section>
    );
  }
}

export default StoreWatch(GameSearch, getSearchResults);
