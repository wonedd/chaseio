import { ErrorHandler } from '../error/ErrorHandler.js';

export class SearchController {
  constructor(_searchService) {
    this.searchService = _searchService;
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

  async fetchData(req, res) {
    try {
      const { query } = req.body;

      const resultsCnaeFiscal = await this.searchService.searchByCnaeFiscal(query);

      res.status(200).json({
        resultsCnaeFiscal,
      });
    } catch (error) {
      // Tratar o erro usando o ErrorHandler
      const errorHandler = ErrorHandler.internalServerError('Erro ao buscar resultados por CNAE Fiscal');
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }
}
