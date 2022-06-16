import React from 'react';
import { withRouter } from 'react-router';
import AuthService from '../services/AuthService';

import PropTypes from 'prop-types';

const propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

function cleanState() {
  return {
    user: '',
    password: '',
  };
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = cleanState();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  login(e) {
    e.preventDefault();
    AuthService.login(
      this.state.user,
      this.state.password,
      () => {
        const location = this.props.location.state;
        if (location && location.nextPathname) {
          this.props.history.push(location.nextPathname);
        } else {
          this.props.history.push('/');
        }
      },
      () => {
        console.log(this);
        this.setState({
          error: 'There was an error logging in, did you type your username and password correctly?',
        });
      });
  }

  logout() {
    AuthService.logout();
    this.state = cleanState();
  }

  handleUserChange(e) {
    this.setState({
      user: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <section className="page clear-fix">
        <article>
          <h1>Log in</h1>
          <div className="text-content">
            <div className="box">
              <form onSubmit={this.login}>
                <label htmlFor="username">Username</label>
                <input
                  value={this.state.user} onChange={this.handleUserChange} type="text"
                  id="username" placeholder="your.name@cygni.se"
                />
                <label htmlFor="password">Password</label>
                <input
                  onChange={this.handlePasswordChange}
                  id="password" type="password" placeholder="password"
                />
                <input type="submit" value="Log in" />
              </form>
              <span style={{ color: 'red' }}>
                {this.state.error ? this.state.error : ''}
              </span>
            </div>
          </div>
        </article>
      </section>
    );
  }
}

LoginPage.propTypes = propTypes;

const RoutedLoginPage = withRouter(LoginPage);

export default RoutedLoginPage;
