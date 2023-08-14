
export class SearchController {
  constructor(searchService) {
    this.searchService = searchService;
  }

  fetchData = async (req, res) => {
    try {
      const { query } = req.body;

      const resultsCnaeFiscal = await this.searchService.searchByCnaeFiscal(query);
      const resultsUF = await this.searchService.searchByUF(query);
      const resultsMunicipio = await this.searchService.searchByMunicipio(query);
      const resultsBairro = await this.searchService.searchByBairro(query);
      const resultsCEP = await this.searchService.searchByCEP(query);

      res.status(200).json({
        resultsCnaeFiscal,
        resultsUF,
        resultsMunicipio,
        resultsBairro,
        resultsCEP,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  }
}
