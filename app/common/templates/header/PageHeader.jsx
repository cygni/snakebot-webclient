import React from 'react';
import {
  Link,
} from 'react-router';
import Config from 'Config'; // eslint-disable-line
import AuthService from '../../../security/services/AuthService';
import Store from '../../../baseStore/BaseStore';
import snakelogo from '../../../design/images/logos/snakelogo.png';

class PageHeader extends React.Component {
  static isLoggedIn() {
    return Store.isLoggedIn();
  }

  constructor(props) {
    super(props);
    this.tryLogout = this.tryLogout.bind(this);
  }

  tryLogout() {
    if (this.isLoggedIn()) {
      const auth = new AuthService();
      auth.logout();
    }
  }

  render() {
    return (
      <header>
        <Link to="/">
          <img src={snakelogo} alt="Snakebot-logo" />
        </Link>
        <nav>
          <ul>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/gettingstarted">GETTING STARTED</Link></li>
            <li><Link to="/viewgame">GAMES</Link></li>
            <li><Link to="/tournament">TOURNAMENT</Link></li>
            <li><Link to="/status">STATUS</Link></li>
          </ul>
        </nav>
        <div>
          { Store.isLoggedIn() ?
            <p> <span className="glyphicon glyphicon-user" aria-hidden="true" /> User: {Store.getUser()} </p> : ''
          }
        </div>
        <div>
          { Store.isLoggedIn() ?
            <p>Cygni snakebot-webclient <b>v{Config.version}</b> from {Config.buildDate}</p> : ''
          }
        </div>
      </header>
    );
  }
}

export default PageHeader;
