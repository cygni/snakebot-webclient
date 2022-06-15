import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class ArenaSelectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arenaName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      arenaName: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    window.location = '/#arena/' + this.state.arenaName;
  }

  render() {
    return (
      <section className="page clear-fix">
        <article>
          <h1>View an arena.</h1>
          <p>
            Open the <Link to="arena/official">Official Arena</Link>
          </p>

          <p>
            You can also create a custom arena for private games, with friends
            or multiple instances of your bot.
            Connect to a websocket on ws://snake.cygni.se/arena/your-private-arena-name
          </p>

          <div className="text-content">
            <form className="clear-fix" onSubmit={this.handleSubmit}>
              <input
                id="arenaName"
                type="text"
                value={this.state.arenaName}
                placeholder="Arena name"
                onChange={this.handleChange}
                className="searchfield"
              />
              <input className="searchbtn" type="submit" value="Open" />
            </form>
          </div>
        </article>
      </section>
    );
  }
}

const RoutedArenaSelectPage = withRouter(ArenaSelectPage);

export default RoutedArenaSelectPage;
