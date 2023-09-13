export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  static unauthorized(message = 'Acesso não autorizado') {
    return new ErrorHandler(401, message);
  }

  static forbidden(message = 'Acesso proibido') {
    return new ErrorHandler(403, message);
  }

  static notFound(message = 'Recurso não encontrado') {
    return new ErrorHandler(404, message);
  }

  static internalServerError(message = 'Erro interno do servidor') {
    return new ErrorHandler(500, message);
  }
}

