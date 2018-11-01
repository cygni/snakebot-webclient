import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import AuthService from '../services/AuthService';

class LoginPage extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    isLoading: false,
    user: '',
    password: '',
  };

  login = async e => {
    e.preventDefault();
    try {
      this.setState({ isLoading: true });
      await AuthService.login(this.state.user, this.state.password);

      const location = this.props.location.state;
      if (location && location.nextPathname) {
        this.props.router.push(location.nextPathname);
      } else {
        this.props.router.push('/');
      }
    } catch (error) {
      this.setState({
        error: 'There was an error logging in, did you type your username and password correctly?',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleUserChange = e => {
    this.setState({
      user: e.target.value,
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
    });
  };

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
                  value={this.state.user}
                  type="text"
                  id="username"
                  placeholder="your.name@cygni.se"
                  autoComplete="username"
                  onChange={this.handleUserChange}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  autoComplete="current-password"
                  onChange={this.handlePasswordChange}
                />
                <input disabled={this.state.isLoading} type="submit" value="Log in" />
              </form>
              <span style={{ color: 'red' }}>{this.state.error ? this.state.error : ''}</span>
            </div>
          </div>
        </article>
      </section>
    );
  }
}

export default withRouter(LoginPage);
