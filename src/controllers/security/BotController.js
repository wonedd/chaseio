import { ErrorHandler } from '../../error/ErrorHandler.js';

export class BotController {
  constructor(botService) {
    this.botService = botService;
  }

  sendWpp = async (req, res) => {
    try {
      const { companies } = req.body;

      if (!companies || companies.length === 0) {
        return res.status(400).json({ error: 'Nenhuma empresa encontrada.' });
      }

      const result = await this.botService.sendMessage(companies);

      res.status(200).json({ result });
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError(error.message);
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }
}
