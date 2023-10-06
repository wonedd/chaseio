import { ErrorHandler } from '../error/ErrorHandler.js';

export class SearchController {
  constructor(searchService) {
    this.searchService = searchService;
  }

  async fetchAll(req, res) {
    try {
      const result = await this.searchService.findAll();

      res.status(200).json({
        result
      });
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError('Erro ao buscar resultados');
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }

  async fetchDataByCnae(req, res) {
    try {
      const { cnae } = req.body;

      const resultsCnaeFiscal = await this.searchService.searchByCnaeFiscal(cnae);

      res.status(200).json({
        resultsCnaeFiscal,
      });
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError('Erro ao buscar resultados por CNAE Fiscal');
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }

  async searchBy(req, res) {
    try {
      const { query } = req.body;

      const result = await this.searchService.searchBy(query);

      res.status(200).json({
        result
      });
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError('Erro ao buscar resultados');
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }
}
