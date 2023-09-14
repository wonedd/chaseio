import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../../error/ErrorHandler.js';

export class AuthToken {
  authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
      const errorHandler = ErrorHandler.unauthorized('Acesso não autorizado');
      return res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        const errorHandler = ErrorHandler.forbidden('Token inválido');
        return res.status(errorHandler.statusCode).json({ error: errorHandler.message });
      }

      req.user = user;
      next();
    });
  }
}
