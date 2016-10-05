import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { withRouter } from 'react-router';
import AuthService from '../services/AuthService';
import Store from '../../baseStore/BaseStore';

const propTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
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
          this.props.router.push(location.nextPathname);
        } else {
          this.props.router.push('/');
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
    if (Store.isLoggedIn()) {
      return (
        <Row>
          <Col xs={10} md={6}>
            <form role="form" onSubmit={this.logout}>
              <button type="submit">Sign out</button>
            </form>
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        <Col xs={18} md={6} mdOffset={3}>
          <h1>Sign in</h1>
        </Col>
        <Col xs={10} md={6} mdOffset={3}>
          <form role="form" onSubmit={this.login}>
            <input
              value={this.state.user} onChange={this.handleUserChange} type="text"
              label="Username" placeholder="username"
            />
            <input
              onChange={this.handlePasswordChange}
              label="Password" type="password" placeholder="password"
            />
            <button type="submit">Sign in</button>
          </form>
          <span style={{ color: 'red' }}>
            {this.state.error ? this.state.error : ''}
          </span>
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = propTypes;

const RoutedLoginPage = withRouter(LoginPage);

export default RoutedLoginPage;
