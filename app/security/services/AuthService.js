import rest from 'rest';
import errorCode from 'rest/interceptor/errorCode';
import Config from 'Config'; // eslint-disable-line
import Action from '../../tournament/action/tournament-actions';

class AuthService {
  login(username, password, success, error) {
    const client = rest.wrap(errorCode);
    client({ path: `${Config.server}/login?login=${username}&password=${password}` })
      .then(
        (token) => {
          Action.loginUser(token.entity, username);
          success(token);
        },
        (response) => {
          console.error('Unable to authenticate user, got response', response);
          if (error) {
            error(response);
          }
        });
  }

  logout() {
    Action.logoutUser();
  }
}

export default AuthService;
