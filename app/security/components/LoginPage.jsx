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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.auth = new AuthService();
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.auth.login(
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
        alert('There was an error logging in');
      });
  }

  logout() {
    this.auth.logout();
    this.state = { user: '', password: '' };
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
        <Col xs={18} md={12}>
          <h1>Sign in</h1>
        </Col>
        <Col xs={10} md={6}>
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
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = propTypes;

const RoutedLoginPage = withRouter(LoginPage);

export default RoutedLoginPage;
