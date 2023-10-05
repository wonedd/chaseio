import { MainRepository } from './MainRepository.js';

export class ChaseioRepository extends MainRepository {
  constructor() {
    super();
  }
  async searchByCnaeFiscal(cnae) {
    const prisma = await this.getPrisma();
    if (cnae.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          cnae_fiscal: { contains: cnae },
        },
        take: 10,
      });

      return results;
    } else {
      return [];
    }
  }

  async searchByUF(query) {
    if (query.length > 0) {
      const prisma = await this.getPrisma();
      const results = await prisma.chaseio.findMany({
        where: {
          uf: { contains: query },
          take: 10,
        },
      });

      return results;
    } else {
      return [];
    }
  }

  async searchByMunicipio(query) {
    const prisma = await this.getPrisma();

    if (query.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          municipio: { contains: query },
          take: 10,
        },
      });

      return results;
    } else {
      return [];
    }
  }

  async searchByBairro(query) {
    const prisma = await this.getPrisma();
    if (query.length > 0) {

      const results = await prisma.chaseio.findMany({
        where: {
          bairro: { contains: query },
          take: 10,
        },
      });

      return results;
    } else {
      return [];
    }
  }

  async searchByCEP(query) {
    const prisma = await this.getPrisma();

    if (query.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          cep: { contains: query },
          take: 10,
        },
      });

      return results;
    } else {
      return [];
    }
  }

  async findAll() {
    const prisma = await this.getPrisma();

    try {
      const result = await prisma.chaseio.findMany({
        take: 5000,
      });

      return (result);
    } catch (error) {
      return error;
    }
  }


  async setWasContacted(companieId) {
    const prisma = await this.getPrisma();

    try {
      const result = await prisma.chaseio.findUnique({
        where: {
          id: companieId
        }
      });

      result.contato_realizado = true;
      await result.save();

      return result;
    } catch (error) {
      throw error;
    }
  }





}
