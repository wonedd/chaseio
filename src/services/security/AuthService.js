import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../../error/ErrorHandler.js';
import currentUser from '../../security/CurrentUser.js';

export class AuthService {
  constructor(secretKey, userRepository) {
    this.secretKey = secretKey;
    this.userRepository = userRepository;
  }

  login = async (credentials) => {
    try {
      const user = await this.userRepository.login(credentials);
      if (user) {
        const token = jwt.sign({ id: user.id, username: user.login }, this.secretKey, { expiresIn: '1h' });

        currentUser.setToken(token);
        currentUser.setUsername(user.login);
        currentUser.setId(user.id);

        return { user, token };

      } else {
        throw ErrorHandler.unauthorized('Credenciais inválidas');
      }

    } catch (error) {
      throw ErrorHandler.internalServerError(error.message);
    }
  }

  logout = async () => {
    currentUser.clear();
  }

  verifyToken = async (token) => {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      throw ErrorHandler.unauthorized('Token inválido');
    }
  }
}
