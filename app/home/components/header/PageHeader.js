import React from "react";
import {Row, Col, Button} from "react-bootstrap";
import AuthService from '../../../security/services/AuthService';
import Store from '../../../baseStore/BaseStore';
import {Link} from 'react-router';

class PageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.tryLogout = this.tryLogout.bind(this);
    }

    isLoggedIn() {
        return Store.isLoggedIn();
    }

    tryLogout() {
        if (this.isLoggedIn()) {
            var auth = new AuthService();
            auth.logout();
        }
    }

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#navbar"
                            aria-expanded="false"
                            aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand">Cygni Snake</Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/training">Training</Link></li>
                            <li><Link to="/tournament">Tournament</Link></li>
                            <li>
                                <Link onClick={this.tryLogout} to="/login">{this.isLoggedIn() ? "Sign out" : "Sign in"}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default PageHeader;