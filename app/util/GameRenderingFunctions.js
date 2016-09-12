import React from "react";
import Colors from "./Colors";
import TileUtils from "./TileUtils";

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
                "points": snake.points,
                "positions": snake.positions
            });
        });
        return oldList
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
        return frame
    },

    setCurrentFrame(activeGame, frame) {
        if(activeGame.currentFrame < frame) {
            activeGame.currentFrame = frame;
            let currentFrame = activeGame.mapEvents[activeGame.currentFrame];
            if(!currentFrame.rendered) {
                currentFrame = this.updateGame(currentFrame);
                currentFrame = this.updateSnakes(activeGame.players, currentFrame);
                this.parseSnakes(activeGame.players, currentFrame.snakeInfos);
            }
        }
        else {
            activeGame.currentFrame = frame;
        }
    },

    addGames (games) {
        let tmpGames = [];
        games.map((game) => {
            let players = [];
            game.players.forEach((player, index) => {
                players.push({
                    "index": index,
                    "name": player.name,
                    id: player.id,
                    'color': Colors.getSnakeColor()[index]
                });
            });

            tmpGames.push({
                "id": game.gameId,
                "gameFeatures": game.gameFeatures,
                "color": Colors.getBoardColor()[games.length],
                "players": players,
                "currentFrame": 0,
                "mapEvents": [],
                "updateFrequency": 500
            });
        });
        return tmpGames;
    },

    updateGame (map) {
        if (map) {
            map.rendered = true;
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
        return map
    },

    changeFrame (activeGame) {
        console.log(activeGame);
        if (activeGame.mapEvents.length > 0) {

            activeGame.currentFrame = Math.max(0, Math.min(activeGame.currentFrame + 1, activeGame.mapEvents.length - 1));
            let currentFrame = activeGame.mapEvents[activeGame.currentFrame];
            if(!currentFrame.rendered) {
                this.updateGame(activeGame.mapEvents[activeGame.currentFrame]);
                this.updateSnakes(activeGame.players, activeGame.mapEvents[activeGame.currentFrame]);
                this.parseSnakes(activeGame.players, activeGame.mapEvents[activeGame.currentFrame].snakeInfos);
            }
        }
    }
}