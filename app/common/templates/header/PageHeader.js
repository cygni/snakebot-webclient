import React from "react";
import AuthService from "../../../security/services/AuthService";
import Store from "../../../baseStore/BaseStore";
import {Link} from "react-router";
import Config from "Config";

require("../../../design/styles/stylesheet.scss");


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
            <header>
                <Link to="/">
                    <img src={require("../../../design/images/snakelogo.png")} alt="Snakebot-logo"/>
                </Link>
                <nav>
                    <ul>
                        <li><Link to="/about">ABOUT</Link></li>
                        <li><Link to="/gettingstarted">GETTING STARTED</Link></li>
                        <li><Link to="/training">GAMES</Link></li>
                        <li><Link to="/tournament">TOURNAMENT</Link></li>
                        <li><Link to="/status">STATUS</Link></li>
                    </ul>
                </nav>
                <div> {Store.isLoggedIn() ?
                    <p><span className="glyphicon glyphicon-user" aria-hidden="true"></span> User: {Store.getUser()}
                    </p> : ""}</div>
                <div>{Store.isLoggedIn() ?
                    <p>Cygni snakebot-webclient <b>v{Config.version}</b> from {Config.buildDate}</p> : ""}</div>
            </header>
        )
    }
}

export default PageHeader;