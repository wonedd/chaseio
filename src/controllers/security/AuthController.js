import { ErrorHandler } from '../../error/ErrorHandler.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = async (req, res) => {
    try {
      const { credentials } = req.body;

      const data = await this.authService.login(credentials);

      if (data) {
        res.status(200).json({ session: req.session, data: data });
      } else {
        const errorHandler = ErrorHandler.unauthorized('Credenciais inválidas');
        res.status(errorHandler.statusCode).json({ error: errorHandler.message });
      }
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError(error.message);
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }

  logout = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          const errorHandler = ErrorHandler.internalServerError('Erro ao realizar logout');
          res.status(errorHandler.statusCode).json({ error: errorHandler.message });
        } else {
          res.json({ message: 'Logout realizado com sucesso' });
        }
      });
      await this.authService.logout();
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError(error.message);
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }
}
