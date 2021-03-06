import React from 'react';
import '../design/styles/stylesheet.scss';

function GettingStartedPage() {
  return (
    <section className="page clear-fix">
      <article>
        <h1>Getting started</h1>
        <div className="text-content">
          <p>
            Your mission is to write the best Snake Bot and survive within the
            game world. We have prepared several language bindings for you to make it
            really easy to get started. All the boring stuff concerning server-client
            communication, message parsing and event handling is already implemented.
          </p>
          <h2>General principles</h2>
          <p>
            The game progresses through Game Ticks. For each Game Tick participating
            Snake Bots have to choose an action (and they have to do it fast,
            response is expected within 250ms). Actions are defined by a direction to
            move the Snake head in. A Snake head may move UP, DOWN, RIGHT or LEFT.
          </p>
          <p>
            On every Game Tick each Snake Bot receives the current Map. The map contains
            the positions of all the objects in the map.
          </p>
          <h2>Language bindings</h2>
          <p>Below are listed the currently implemented (and up to date) language
            bindings. Each project has a Readme file that explains how to get
            going.
          </p>
          <ul>
            <li><a href="https://github.com/cygni/snakebot-client-java">Java</a></li>
            <li><a href="https://github.com/cygni/snakebot-client-js">JS</a></li>
            <li><a href="https://github.com/cygni/snakebot-client-python">Python</a></li>
            <li><a href="https://github.com/cygni/snakebot-client-dotnet">.Net</a></li>
            <li><a href="https://github.com/cygni/snakebot-client-golang">Go</a></li>
            <li><a href="https://github.com/cygni/snakebot-client-clojurescript">ClojureScript</a></li>
            <li><a href="https://github.com/cygni/snakebot-client-rust">Rust</a></li>
            <li><a href="https://github.com/cygni/snakebot-client-cpp">C++</a></li>
          </ul>
        </div>
      </article>
    </section>
  );
}
export default GettingStartedPage;
