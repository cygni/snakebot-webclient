import request from 'reqwest';
import when from 'when';
import Action from '../../tournament/action/tournament-actions';
import Config from "Config";

class AuthService {

    login(username, password) {
        return when(request({
            url: (Config.server + '/login?login=$username&password=$password')
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
