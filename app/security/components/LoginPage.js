import React from "react";
import {Row, Col} from "react-bootstrap";
import AuthService from "../services/AuthService";
import Store from "../../baseStore/BaseStore";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService();
        this.state = {user: '', password: ''};

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    login(e) {
        e.preventDefault();
        console.log(this.state);
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
                        <input value={this.state.user} onChange={this.handleUserChange} type="text"
                            label="Username" placeholder="username"/>
                        <input onChange={this.handlePasswordChange}
                            label="Password" type="password" placeholder="password"/>
                        <button type="submit">Sign in</button>
                    </form>
                </Col>
            </Row>
        );
    }
}

export default LoginPage;