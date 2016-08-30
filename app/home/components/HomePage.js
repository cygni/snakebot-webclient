import React from "react";
import {Link} from 'react-router'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jumbotron">
                <h1>Welcome</h1>
                <p>To Cygni Snake</p>
                <p><Link to="/training" className="btn btn-primary btn-lg">Start training</Link></p>
                <p><Link to="/tournament" className="btn btn-primary btn-lg">Start a tournament</Link></p>
            </div>
        )
    }
}
export default HomePage;

