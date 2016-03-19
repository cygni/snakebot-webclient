import React from 'react';
import Template from '../components/Template'
import Gameboard from '../components/GameBoard'
import { Router, Route, IndexRoute } from 'react-router';

export default () => {
    return (
        <Router>
            <Route path="/" component={Template}>
                <IndexRoute component={Gameboard}/>
            </Route>
        </Router>
    );
}