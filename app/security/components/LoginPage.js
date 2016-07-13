import React from "react";
import {Row, Col, Input, ButtonInput} from "react-bootstrap";
import AuthService from '../services/AuthService';
import Store from '../../baseStore/BaseStore'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService();
        this.state = { user: '', password: '' };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    login(e) {
        e.preventDefault();
        this.auth.login(this.state.user, this.state.password)
            .catch(function (err) {
                alert("There was an error logging in");
                console.log("Error logging in", err);
            });
    }

    logout(e) {
        this.auth.logout();
    }

    handleUserChange(e) {
        this.setState({
            user: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        if (Store.isLoggedIn()) {
            return (
                <Row>
                    <Col xs={10} md={6}>
                        <form role="form" onSubmit={this.logout}>
                            <ButtonInput type="submit" value="Sign out"/>
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
                        <Input value={this.state.user} onChange={this.handleUserChange} type="text"
                            label="Username" placeholder="username"/>
                        <Input onChange={this.handlePasswordChange} type="text"
                            label="Password" type="password" placeholder="password"/>
                        <ButtonInput type="submit" value="Sign in"/>
                    </form>
                </Col>
            </Row>
        );
    }
}

export default LoginPage;