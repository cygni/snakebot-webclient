import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';
import Config from 'Config'; // eslint-disable-line

const client = rest.wrap(mime).wrap(errorCode);

export default {
  fetchTournament: (success, error) => {
    client({ path: `${Config.server}/tournament/active` })
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
    client({ path: `${Config.server}/history/${id}` })
      .then((response) => {
        const json = response.entity;
        const mapUpdateEvent = 'se.cygni.snake.api.event.MapUpdateEvent';
        const mapEvents = json
                .messages
                .filter(event => event.type === mapUpdateEvent)
                .map(type => type.map);

        console.log('Game was found in history', mapEvents);

        success(mapEvents);
      }, (response) => {
        console.log('Unable to fetch game with id = ' + id);
        if (error) {
          error(response);
        }
      });
  },

  searchForGames: (name, success, error) => {
    console.log(`Searching for games with name = \'${name}\'`);
    client({ path: Config.server + '/history/search/' + name })
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
