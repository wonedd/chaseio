import prisma from './prisma.js';

export class MainRepository {
  constructor() {
    this.prisma = prisma;
  }

  async getPrisma() {
    return this.prisma;
  }

  async findAll(table) {
    try {
      const result = await this.prisma[table].findMany();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
