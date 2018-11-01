import rest from 'rest';
import mime from 'rest/interceptor/mime';
import pathPrefix from 'rest/interceptor/pathPrefix';
import errorCode from 'rest/interceptor/errorCode';
import { SERVER_URL } from '../constants/Constants';

const client = rest
  .wrap(mime)
  .wrap(errorCode)
  .wrap(pathPrefix, { prefix: SERVER_URL });

export async function fetchTournament() {
  try {
    const response = await client({ path: '/tournament/active' });
    const json = response.entity;
    console.log('Active tournament found', json);
    return json;
  } catch (error) {
    console.error('There is currently no active tournament');
    throw error;
  }
}

const mapUpdateEvent = 'se.cygni.snake.api.event.MapUpdateEvent';
const snakeDeadEvent = 'se.cygni.snake.api.event.SnakeDeadEvent';
const gameEndedEvent = 'se.cygni.snake.api.event.GameEndedEvent';

export async function fetchGame(id) {
  const encoded = encodeURIComponent(id);
  try {
    const response = await client({ path: `/history/${encoded}` });
    const json = response.entity;

    console.log(json.messages);
    const mapEvents = json.messages
      .filter(event => event.type === mapUpdateEvent || event.type === gameEndedEvent)
      .map(type => type.map);

    const snakeDeadEvents = json.messages.filter(event => event.type === snakeDeadEvent);

    console.log('Game was found in history', mapEvents, snakeDeadEvents);

    return { mapEvents, snakeDeadEvents };
  } catch (error) {
    console.error('Unable to fetch game with id = ' + id);
    throw error;
  }
}

export async function searchForGames(name) {
  const encoded = encodeURIComponent(name);

  console.log(`Searching for games with name = '${encoded}'`);

  try {
    const response = await client({ path: `/history/search/${encoded}` });
    const json = response.entity;
    console.log('Searching for games found:', json);
    return json.items;
  } catch (error) {
    console.error("Unable to find old games with name = '" + name + "'", error);
    throw error;
  }
}
