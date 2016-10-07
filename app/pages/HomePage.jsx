import React from 'react';
import {
  Link,
} from 'react-router';
import '../design/styles/stylesheet.scss';
import Config from 'Config'; // eslint-disable-line

function HomePage() {
  return (
    <section className="page clear-fix">
      <article>
        <h1>Welcome!</h1>
        <div className="text-content">
          <p>
            Remember the old game of Snake? One of the first common
            implementations was available on the phone Nokia 3310.<br />
            <a
              href="https://www.youtube.com/watch?v=wjEdCd4t1m8"
              target="_blank"
              rel="noopener noreferrer"
            > Snake Record - Nokia 3310
            </a>
          </p>
          <p>
            This game is a bit different. To play you need to program your own
            Snake Bot and you will be competing against other bots!
            The concept is simple, your snake can move UP, DOWN, RIGHT
            or LEFT and the winner is the last snake alive. Extra points are awarded
            when eating stars or nibbling on other snake&apos;s tails. Look out for the
            black holes though!
          </p>
          <p>
            <Link to="gettingstarted">Getting started</Link> is really easy.
            We have implementations in several popular programming languages. Clone
            an example Snake bot and get going!
          </p>
          <p>
            Checkout the screencasts below:
          </p>
          <p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/videoseries?list=PL_mlNK0QR9ykOvFg3z4nmAT_aZxCVCrD4"
              frameBorder="0"
              allowFullScreen
            />
          </p>
        </div>
      </article>
    </section>
  );
}
export default HomePage;
