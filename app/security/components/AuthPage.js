import React from "react";
import {Link} from 'react-router'

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jumbotron">
                <h1>Oops!</h1>
                <p>You don't have permission to access this page</p>
                <p><Link to="/login" className="btn btn-primary btn-lg">Sign in</Link></p>
            </div>
        )
    }
}
export default AuthPage;