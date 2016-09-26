import request from 'reqwest';
import when from 'when';
import Config from 'Config'; // eslint-disable-line
import Action from '../../tournament/action/tournament-actions';

class AuthService {
  login(username, password) {
    return when(request({
      url: `${Config.server}/login?login=${username}&password=${password}`,
      method: 'GET',
      type: 'text/html',
      crossOrigin: true,
    })).then((token) => {
      Action.loginUser(token.response, username);
    });
  }

  logout() {
    Action.logoutUser();
  }
}

export default AuthService;
