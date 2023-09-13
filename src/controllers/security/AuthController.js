import { ErrorHandler } from '../../error/ErrorHandler.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService
  }

  async login(req, res) {
    try {
      const { credentials } = req.body;

      const token = await this.authService.login(credentials);

      console.log(token)

      if (token) {
        res.json({ token });
      } else {
        const errorHandler = ErrorHandler.unauthorized('Credenciais inválidas');
        res.status(errorHandler.statusCode).json({ error: errorHandler.message });
      }
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError(error.message);
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });

    }
  }

  async logout(req, res) {
    res.json({ message: 'Logout realizado com sucesso' });
  }
}


