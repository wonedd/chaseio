import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChaseioRepository {
  async searchByCnaeFiscal(query) {
    if (query.length > 0) {
      const results = await prisma.chaseio.findMany({
        where: {
          cnae_fiscal: { contains: query },
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
    try {
      const result = await prisma.chaseio.findMany({
        take: 5000,
      });

      return (result);
    } catch (error) {
      return error;
    }
  }

  async setWasContacted(companieCel) {
    try {
      const result = await companie.chaseio.findFirst({
        where: {
          celular: companieCel
        }
      });

      result.contato_realizado = true;
      await result.save();

      return result;
    } catch (error) {
      throw error;
    }
  }



  async login(credentials) {
    try {
      const result = await prisma.users.findFirst({
        where: {
          login: credentials.login,
          password: credentials.password
        }
      })

      return result;
    } catch (error) {
      return error;
    }
  }

}
