import React from 'react';
// import {
//   Link,
// } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

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
          <li><NavLink to="" activeClassName="selected">Start</NavLink></li>
          <li><NavLink to="about" activeClassName="selected">About</NavLink></li>
          <li><NavLink to="gettingstarted" activeClassName="selected">Getting started</NavLink></li>
          {/*
            <li><NavLink to="arena" activeClassName="selected">Arena</NavLink></li>
          */}
          <li><NavLink to="viewgame" activeClassName="selected">Games</NavLink></li>
          {loggedIn ?
            <li><NavLink to="tournament" activeClassName="selected">Tournament</NavLink></li>
            : null
          }
          {loggedIn ?
            <li><a href="" onClick={tryLogout}>Log out</a></li> :
            <li><NavLink to="auth" activeClassName="selected">Log in</NavLink></li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default PageHeader;
