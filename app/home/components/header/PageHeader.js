import React from "react";
import {Row, Col, Button} from "react-bootstrap";
import Auth from '../../../security/services/AuthService';
import Store from '../../../baseStore/BaseStore';
import {Link} from 'react-router';

export default () => {
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
                    <li><Link to="/login">{Store.isLoggedIn() ? "Sign out" : "Sign in"}</Link></li>
                </ul>
            </div>
        </div>
    </nav>
    )
}