import React from "react";
import AppAction from "../action/training-actions";
import GameStore from "../../baseStore/BaseStore";
import StoreWatch from "../components/watch/StoreWatch";
import {Link} from 'react-router';


function getOldGames() {
    let games = GameStore.getOldGames();
    let results = GameStore.hasResults();

    return {games: games, results: results}
}

class GameSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        AppAction.searchForOldGames(this.state.searchName)
    }

    handleChange(e) {
        this.setState({
            searchName: e.target.value
        })
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.mapEvents != undefined && this.state.mapEvents.length > 0 && this.state.currentFrame < this.state.mapEvents.length;
    // }

    // componentDidMount() {
    //
    // }

    render() {
        return (
            <div>
                <form className="commentForm" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.props.text} placeholder="Your name" onChange={this.handleChange}/>
                    <input type="submit" value="Post"/>
                    <label className={this.props.results ? 'show' : 'hidden'} style={{color: "red"}}>No result found</label>
                </form>
                <div><h2>Old games</h2></div>
                <ul>
                    {this.props.games.map((id, index) => {
                        return (
                            <li key={index}>
                                <Link to={{ pathname: '/viewgame/' + id}}>{index}: {id} </Link>
                            </li>
                        )
                    })}

                </ul>
            </div>


        )
    }
}

export default StoreWatch(GameSearch, getOldGames);