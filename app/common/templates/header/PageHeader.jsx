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
          <li><Link to="" activeClassName="selected">Start</Link></li>
          <li><Link to="about" activeClassName="selected">About</Link></li>
          <li><Link to="gettingstarted" activeClassName="selected">Getting started</Link></li>
          <li><Link to="arena/official-ranked" activeClassName="selected">Arena</Link></li>
          <li><Link to="viewgame" activeClassName="selected">Games</Link></li>
          {loggedIn ?
            <li><Link to="tournament" activeClassName="selected">Tournament</Link></li>
            : null
          }
          {loggedIn ?
            <li><a href="" onClick={tryLogout}>Log out</a></li> :
            <li><Link to="auth" activeClassName="selected">Log in</Link></li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default PageHeader;
