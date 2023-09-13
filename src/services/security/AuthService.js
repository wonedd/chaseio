import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../../error/ErrorHandler.js';


export class AuthService {
  constructor(secretKey, chaseioRepository) {
    this.secretKey = secretKey;
    this.chaseioRepository = chaseioRepository;

  }

  login = async (credentials) => {
    try {
      const user = await this.chaseioRepository.login(credentials);

      if (user) {
        const token = jwt.sign({ id: user.id, username: user.login }, this.secretKey, { expiresIn: '1h' });
        console.log("Generated Token:", token);
        return token;

      } else {
        throw ErrorHandler.unauthorized('Credenciais inválidas');
      }
    } catch (error) {
      throw ErrorHandler.internalServerError(error.message);
    }
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      throw ErrorHandler.unauthorized('Token inválido'); // Use ErrorHandler para gerar um erro personalizado
    }
  }
}

