import { ErrorHandler } from '../../error/ErrorHandler.js';

export class AuthToken {
  authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!req.session.username || !req.session.token || token) {
      const errorHandler = ErrorHandler.unauthorized('Acesso não autorizado');
      return res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
    req.user = {
      username: req.session.username,
      token: req.session.token,
    };

    next();
  }
}
