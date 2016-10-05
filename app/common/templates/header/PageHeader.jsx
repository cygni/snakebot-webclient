import React from 'react';
import {
  Link,
} from 'react-router';
import AuthService from '../../../security/services/AuthService';
import Store from '../../../baseStore/BaseStore';
import snakelogo from '../../../design/images/logos/snakelogo.png';

function isLoggedIn() {
  return Store.isLoggedIn();
}

function tryLogout() {
  if (isLoggedIn()) {
    AuthService.logout();
  }
}

const PageHeader = () => {
  const loggedIn = isLoggedIn();

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
          {loggedIn ?
            <li><Link to="tournament" activeClassName="active">TOURNAMENT</Link></li>
            : null
          }
          {loggedIn ?
            <li> <button className="btn-link" onClick={tryLogout}>LOG OUT</button> </li> :
            <li><Link to="auth" activeClassName="active">LOG IN</Link></li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default PageHeader;
