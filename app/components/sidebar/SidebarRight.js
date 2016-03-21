//import React from 'react'
//import {ListGroup, ListGroupItem} from 'react-bootstrap'
//import StoreWatch from '../watch/StoreWatch'
//import GameStore from '../../stores/active-games'
//
//function getSnakesInActiveGame() {
//    let snakes = GameStore.getSnakes();
//    return {snakes}
//}
//
//const SidebarRight = (props) => {
//    return (
//            <div>
//                <h3>Players</h3>
//                <ListGroup>
//                    {props.snakes.map(snake => {
//                        return (
//                            <ListGroupItem style={{background: snake.color, color: "white"}} key={snake.id}>Name: {snake.name} Length: {snake.length}</ListGroupItem>
//                        )
//                    })}
//                </ListGroup>
//            </div>
//    )
//};
//
//export default StoreWatch(SidebarRight, getSnakesInActiveGame)