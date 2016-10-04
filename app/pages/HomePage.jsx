import React from 'react';
import {
  Link,
} from 'react-router';
import '../design/styles/stylesheet.scss';
import exampleGame from '../design/images/matter/example_game.gif';
import Config from 'Config'; // eslint-disable-line

function HomePage() {
  return (
    <section className="clear-fix information">
      <h2>Welcome!</h2>
      <p>
        Remember the old game of Snake? One of the first common
        implementations was available on the phone Nokia 3310.
        <a
          href="https://www.youtube.com/watch?v=wjEdCd4t1m8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Snake Record - Nokia 3310
        </a>
      </p>
      <p>
        This game is a bit different. To play you need to program your own
        Snake Bot and you will be competing against other bots!
        The concept is simple, your snake can move UP, DOWN, RIGHT
        or LEFT and the winner is the last snake alive. Extra points are awarded
        when eating stars or nibbling on other snake's tails. Look out for the
        black holes though!
      </p>
      <p>
        <Link to="gettingstarted">Getting started</Link> is really easy.
        We have implementations in several popular programming languages. Checkout
        an example Snake bot and get going!
      </p>
      <p>
        <img src={exampleGame} alt="Example game" />
      </p>
    </section>
  );
}
export default HomePage;
