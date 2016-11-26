import React from 'react';
import { withRouter } from 'react-router';
import GameBoard from '../../game/components/GameBoard';
import '../../design/styles/stylesheet.scss';

const propTypes = {
  params: React.PropTypes.object.isRequired,
};

function cleanState() {
  return {
    gameId: '7542b460-1728-4b73-a8e4-2d2bb914d6a1',
  };
}

class ArenaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = cleanState();
  }

  updateGameId() {
    this.setState({ gameId: 'a6efc10b-f46d-4629-8b36-621acf9154ed' });
  }

  render() {
    const params = { gameId: this.state.gameId };

    // setTimeout(() => this.updateGameId(), 10000);

    return (
      <section className="page clear-fix">
        This is an arena!
        {this.state.gameId ?
          <GameBoard key={this.state.gameId} params={params} autostart />
          : null }
      </section>
    );
  }
}

ArenaPage.propTypes = propTypes;

const RoutedArenaPage = withRouter(ArenaPage);

export default RoutedArenaPage;
