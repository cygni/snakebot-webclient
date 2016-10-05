import React from 'react';
import '../design/styles/stylesheet.scss';

function AboutPage() {
  return (
    <section className="clear-fix information">
      <h2>About</h2>
      <p>
        We at Cygni love programming. We also love a friendly competetion over
        a couple of beers. What better way to combine these two things than a
        battle in programming!
      </p>
      <p>
        Feel free to hack your own Snake Bot and train it in the Training room.
        From time to time we hold tournaments where you will be able to face
        other player&apos;s Snake Bots.
      </p>
      <h3>Game rules</h3>
      <p>
        The rules are configurable per game, upon every game start the clients
        will be notified of the current game settings.
        Here are the default rules:
      </p>
      <ul>
        <li>- Snake grows every third game tick</li>
        <li>- Each client must respond within 250ms</li>
        <li>- 1 point per Snake growth</li>
        <li>- 2 points per star consumed</li>
        <li>- 10 points per tail nibble</li>
        <li>- 5 points per caused death (another snake crashes and dies into your snake)</li>
        <li>- 5 black holes</li>
        <li>- A nibbled tail is protected for 3 game ticks</li>
        <li>- The last surviving Snake always wins.
          The ranking for dead snakes is based on accumulated points
        </li>
      </ul>
    </section>
  );
}

export default AboutPage;
