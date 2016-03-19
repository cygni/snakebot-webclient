//import React from 'react'
//import SockJS from 'sockjs-client'
//import AppAction from '../action/app-actions'
//import GameStore from '../stores/active-games'
//import StoreWatch from '../components/watch/StoreWatch'
//
//function getSocketEvents () {
//    let socketEvent = GameStore.getSocketEvents();
//    return {socketEvent}
//}
//
//class SocketUtils extends React.Component {
//
//    componentWillReceiveProps(nextProps) {
//        console.log(nextProps);
//    }
//
//    startGame(id) {
//       //this.state.socket.send('{"includedGameIds": [" ' + id + '"],"type":"se.cygni.snake.websocket.event.api.SetGameFilter"}');
//       // this.state.socket.send('{"gameId":" ' + id + '","type":"se.cygni.snake.websocket.event.api.StartGame"}');
//    }
//
//}
//
