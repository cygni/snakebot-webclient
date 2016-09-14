import React from "react";
import Tile from "../../common/gamecomponents/Tile";
import {Grid, Row, Col} from "react-bootstrap";
import Immutable from "immutable";
import Store from "../../baseStore/BaseStore";
import StoreWatch from "./watch/StoreWatch";
import TileUtils from "../../util/TileUtils";
import BoardUtils from "../../util/BoardUtils";
import TrainingAction from "../../training/action/training-actions"

function getListOfGames() {
    return []
}

class GameSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.mapEvents != undefined && this.state.mapEvents.length > 0 && this.state.currentFrame < this.state.mapEvents.length;
    // }

    componentDidMount() {

    }

    render() {
        return (
           <div></div>
        )
    }
}

export default StoreWatch(GameSearch, getListOfGames);