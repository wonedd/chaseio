
export class SearchService {
  constructor(chaseioRepository) {
    this.chaseioRepository = chaseioRepository;
  }

  searchByCnaeFiscal = async (query) => {
    const results = await this.chaseioRepository.searchByCnaeFiscal(query);
    return results;
  }

  searchByUF = async (query) => {
    const results = await this.chaseioRepository.searchByUF(query);
    return results;
  }

  searchByMunicipio = async (query) => {
    const results = await this.chaseioRepository.searchByMunicipio(query);
    return results;
  }

  searchByBairro = async (query) => {
    const results = await this.chaseioRepository.searchByBairro(query);
    return results;
  }

  searchByCEP = async (query) => {
    const results = await this.chaseioRepository.searchByCEP(query);
    return results;
  }

  findAll = async () => {
    const results = await this.chaseioRepository.findAll();
    return results;
  }
}
