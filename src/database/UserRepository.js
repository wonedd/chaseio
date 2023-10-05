import { MainRepository } from './MainRepository.js';

export class UserRepository extends MainRepository {
  constructor() {
    super();

  }
  async login(credentials) {

    try {

      const prisma = await this.getPrisma();

      const result = await prisma.users.findFirst({
        where: {
          login: credentials.login,
        }
      })

      return result;
    } catch (error) {
      return error;
    }
  }

}
