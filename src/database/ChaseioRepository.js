import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChaseioRepository {
  async searchByCnaeFiscal(query) {
    if (query.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          cnae_fiscal: { contains: query },
        },
      });

      return results;
    } else {
      return [];
    }
  }

  async searchByUF(query) {
    if (query.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          uf: { contains: query },
        },
      });

      return results;
    } else {
      return [];
    }
  }

  async searchByMunicipio(query) {
    if (query.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          municipio: { contains: query },
        },
      });

      return results;
    } else {
      return [];
    }
  }

  async searchByBairro(query) {
    if (query.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          bairro: { contains: query },
        },
      });

      return results;
    } else {
      return [];
    }
  }

  async searchByCEP(query) {
    if (query.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          cep: { contains: query },
        },
      });

      return results;
    } else {
      return [];
    }
  }
}
