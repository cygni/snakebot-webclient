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
            <li><Link to="about" activeClassName="active">ABOUT</Link></li>
            <li><Link to="gettingstarted" activeClassName="active">GETTING STARTED</Link></li>
            <li><Link to="viewgame" activeClassName="active">GAMES</Link></li>
            <li><Link to="tournament" activeClassName="active">TOURNAMENT</Link></li>
            <li><Link to="status" activeClassName="active">STATUS</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default PageHeader;
