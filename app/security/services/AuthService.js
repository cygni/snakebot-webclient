import request from 'reqwest';
import when from 'when';
import Action from '../../tournament/action/tournament-actions';

class AuthService {

    login(username, password) {
        //TODO configure url
        return when(request({
            url: 'http://localhost:8080/login?login=$username&password=$password'
                .replace("$username", username)
                .replace("$password", password),
            method: 'GET',
            type: 'text/html',
            crossOrigin: true
        })).then(function (token) {
            Action.loginUser(token.response, username);
        });
    }

    logout() {
        Action.logoutUser();
    }
}

export default new AuthService()
