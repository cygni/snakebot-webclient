import rest from 'rest';
import mime from 'rest/interceptor/mime';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import Config from 'Config'; // eslint-disable-line

const client = rest
      .wrap(mime)
      .wrap(errorCode)
      .wrap(pathPrefix, { prefix: Config.server });

export default {
  fetchTournament: (success, error) => {
    client({ path: '/tournament/active' })
      .then((response) => {
        const json = response.entity;
        console.log('Active tournament found', json);

        success(json);
      }, (response) => {
        console.log('There is currently no active tournament');
        if (error) {
          error(response);
        }
      });
  },

  fetchGame: (id, success, error) => {
    const encoded = encodeURIComponent(id);
    client({ path: `/history/${encoded}` })
      .then((response) => {
        const json = response.entity;
        const mapUpdateEvent = 'se.cygni.snake.api.event.MapUpdateEvent';
        const snakeDeadEvent = 'se.cygni.snake.api.event.SnakeDeadEvent';
        const mapEvents = json
                .messages
                .filter(event => event.type === mapUpdateEvent)
                .map(type => type.map);

        const snakeDeadEvents = json
          .messages
          .filter(event => event.type === snakeDeadEvent);


        console.log('Game was found in history', mapEvents, snakeDeadEvents);

        success(mapEvents, snakeDeadEvents);
      }, (response) => {
        console.log('Unable to fetch game with id = ' + id);
        if (error) {
          error(response);
        }
      });
  },

  searchForGames: (name, success, error) => {
    const encoded = encodeURIComponent(name);
    console.log(`Searching for games with name = '${encoded}'`);
    client({ path: `/history/search/${encoded}` })
      .then(
        (response) => {
          const json = response.entity;
          console.log('Searching for games found:', json);

          success(json.items);
        },
        (response) => {
          console.error('Unable to find old games with name = \'' + name + '\'', response);
          if (error) {
            error(response);
          }
        }
      );
  },
};
