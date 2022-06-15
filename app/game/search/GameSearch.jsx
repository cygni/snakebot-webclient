import React from 'react';
import { Link } from 'react-router-dom';

import GameAction from '../action/game-actions';
import GameStore from '../../baseStore/BaseStore';
import StoreWatch from '../components/watch/StoreWatch';

import PropTypes from 'prop-types';

function getSearchResults() {
  const searchResults = GameStore.getSearchResults();

  return { searchResults };
}

const propTypes = {
  text: PropTypes.string,
  searchResults: PropTypes.object.isRequired,
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
        <ul className="searchresults"> {
          this.props.searchResults.matchingGames.map((game, index) => (
            <li key={index}>
              <h3 className="searchheadline">
                <Link to={{ pathname: '/viewgame/' + game.gameId }}>
                  <span className="date">Date: {game.gameDate}</span>
                </Link>
              </h3>
              <ul className="players"> {
                game.players.map((player, i) => (
                  <li key={i} className={(this.state.searchName === player ? 'match' : '')}>
                    { player }
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>);
    }

    return (
      <section className="page clear-fix">
        <article>
          <h1>Search for old games</h1>
          <p className="searchintro">
            You can find old games here by searching for the snake name.
          </p>
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
            { results }
          </div>
        </article>
      </section>
    );
  }
}

GameSearch.propTypes = propTypes;
export default new StoreWatch(GameSearch, getSearchResults);
