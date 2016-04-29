import React from 'react';
import Colors from './Colors'
import TileUtils from './TileUtils'

export default {
    parseSnakes(oldList, snakeList) {
        snakeList.forEach(snake => {
            if (oldList.find(existingSnake => snake.id === existingSnake.id)) {
                return;
            }
            oldList.push({
                "id": snake.id,
                "name": snake.name,
                "length": snake.positions.length,
                "color": Colors.getSnakeColor()[oldList.length],
                "alive": snake.positions.length <= 0,
                "points": snake.points
            });
        })
    },

    updateSnakes (playerList, frame) {
        if (frame) {
            frame.snakeInfos.forEach(snake => {
                var player = playerList.find(p => p.id === snake.id);
                if (!player) {
                    console.log("unable to find player");
                    return;
                }

                player.points = snake.points;
                player.length = snake.positions.length;
                player.alive = snake.positions.length > 0;
            });
        }
    },

    setCurrentFrame(activeGame,frame) {
        activeGame.currentFrame = frame;
        this.updateSnakes(activeGame.players, activeGame.mapEvents[activeGame.currentFrame]);
    },

    addGames (games, _games) {
        games.map((game) => {
            if (_games.find(g => game.gameId === g.id)) {
                return;
            }

            let players = [];
            game.players.forEach((player, index) => {
                players.push({"index": index, "name": player.name, id: player.id, 'color': Colors.getSnakeColor()[index]});
            });

            _games.push({
                "id": game.gameId,
                "gameFeatures": game.gameFeatures,
                "color": Colors.getBoardColor()[_games.length],
                "players": players,
                "currentFrame": 0,
                "mapEvents": [],
                "updateFrequency": 500
            });
        });

        return _games;
    },

    updateGame (map) {
       if(map) {
           map.foodPositions = map.foodPositions.map(function (pos) {
               return TileUtils.getTileCoordinate(pos, map.width);
           });
           map.obstaclePositions = map.obstaclePositions.map(function (pos) {
               return TileUtils.getTileCoordinate(pos, map.width);
           });
           map.snakeInfos.forEach(snake => {
               snake.positions = snake.positions.map(function (pos) {
                   return TileUtils.getTileCoordinate(pos, map.width);
               });
           });
       }
    },

    changeFrame (activeGame) {
        if(activeGame.mapEvents.length > 0) {
            activeGame.currentFrame = Math.max(0, Math.min(activeGame.currentFrame + 1, activeGame.mapEvents.length - 1));
            this.updateGame(activeGame.mapEvents[activeGame.currentFrame]);
            this.updateSnakes(activeGame.players, activeGame.mapEvents[activeGame.currentFrame]);
            this.parseSnakes(activeGame.players, activeGame.mapEvents[activeGame.currentFrame].snakeInfos);
        }
    }
}