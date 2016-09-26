import Colors from './Colors';

export default {
  parseSnakes(oldList, snakeList) {
    snakeList.forEach((snake) => {
      if (oldList.find(existingSnake => snake.id === existingSnake.id)) {
        return;
      }
      oldList.push({
        id: snake.id,
        name: snake.name,
        length: snake.positions.length,
        color: Colors.getSnakeColor()[oldList.length],
        alive: snake.positions.length <= 0,
        points: snake.points,
        positions: snake.positions,
      });
    });
    return oldList;
  },

  updateSnakes(playerList, frame) {
    if (frame) {
      frame.snakeInfos.forEach((snake) => {
        const player = playerList.find(p => p.id === snake.id);
        if (!player) {
          console.log('unable to find player for snake:', snake);
          return;
        }

        player.points = snake.points;
        player.length = snake.positions.length;
        player.alive = snake.positions.length > 0;
      });
    }
    return frame;
  },

  addGames(games) {
    const tmpGames = [];
    games.forEach((game) => {
      const players = [];
      game.players.forEach((player, index) => {
        players.push({
          index,
          name: player.name,
          id: player.id,
          color: Colors.getSnakeColor()[index],
        });
      });

      tmpGames.push({
        id: game.gameId,
        gameFeatures: game.gameFeatures,
        color: Colors.getBoardColor()[games.length],
        players,
        currentFrame: 0,
        mapEvents: [],
        updateFrequency: 200,
      });
    });
    return tmpGames;
  },

  addOldGame(game) {
    const newGame = {};
    const gameMap = game[0];
    const players = [];
    gameMap.snakeInfos.forEach((player, index) => {
      players.push({
        index,
        name: player.name,
        id: player.id,
        color: Colors.getSnakeColor()[index],
      });
    });

    newGame.id = gameMap.gameId;
    newGame.players = players;
    newGame.currentFrame = 0;
    newGame.mapEvents = game;
    newGame.updateFrequency = 200;
    return newGame;
  },

  changeFrame(activeGame) {
    const nextFrame = activeGame.currentFrame + 1;
    const isValidIndex = nextFrame >= 0 && nextFrame < activeGame.mapEvents.length;
    if (!isValidIndex) {
      return;
    }

    this.setCurrentFrame(activeGame, nextFrame);
  },

  setCurrentFrame(activeGame, frame) {
    activeGame.currentFrame = frame;
    let currentFrame = activeGame.mapEvents[activeGame.currentFrame];
    currentFrame = this.updateSnakes(activeGame.players, currentFrame);
    this.parseSnakes(activeGame.players, currentFrame.snakeInfos);
  },
};
