import React from "react";
import {Row, Col, Input, ButtonInput} from "react-bootstrap";
import Auth from '../services/AuthService';
import Store from '../../baseStore/BaseStore'

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
    }

    login(e) {
        e.preventDefault();
        Auth.login(this.state.user, this.state.password)
            .catch(function (err) {
                alert("There's an error logging in");
                console.log("Error logging in", err);
            });
    }

    handleUserChange(e) {
        this.setState({
                user: e.target.value
            }
        );
    }

    handlePasswordChange(e) {
        this.setState({
                password: e.target.value
            }
        );
    }

    render() {

        if (Store.isLoggedIn()) {
            return (
                <Row>
                    <Col xs={10} md={6}>
                        <form role="form" onSubmit={Auth.logout}>
                            <ButtonInput type="submit" value="Sign out"/>
                        </form>
                    </Col>
                </Row>
            );
        }

        return (
            <Row>
                <Col xs={18} md={12}>
                    <h1> Sign in</h1>
                </Col>
                <Col xs={10} md={6}>
                    <form role="form" onSubmit={this.login.bind(this)}>
                        <Input value={this.state.tempGameName} onChange={this.handleUserChange.bind(this)} type="text"
                               label="Username" placeholder="username"/>
                        <Input value={this.state.tempGameName} onChange={this.handlePasswordChange.bind(this)} type="text"
                               label="Password" type="password" placeholder="password"/>
                        <ButtonInput type="submit" value="Sign in"/>
                    </form>
                </Col>
            </Row>
        );
    }
}

export default LoginPage;