import rest from 'rest';
import errorCode from 'rest/interceptor/errorCode';
import * as TournamentActions from '../../tournament/action/tournament-actions';
import { SERVER_URL } from '../../constants/Constants';

class AuthService {
  static async login(username, password) {
    const client = rest.wrap(errorCode);
    try {
      const token = await client({ path: `${SERVER_URL}/login?login=${username}&password=${password}` });
      TournamentActions.loginUser(token.entity, username);
      return token;
    } catch (error) {
      console.error('Unable to authenticate user, got response', error);
      throw error;
    }
  }

  static logout() {
    TournamentActions.logoutUser();
  }
}

export default AuthService;
