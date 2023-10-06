import { MainRepository } from './MainRepository.js';

export class UserRepository extends MainRepository {
  constructor() {
    super();

  }
  async login(credentials) {
    console.log("🚀 ~ file: UserRepository.js:9 ~ UserRepository ~ login ~ credentials:", credentials)

    try {

      const prisma = await this.getPrisma();

      const result = await prisma.users.findUnique({
        where: {
          login: credentials.login,
        }
      })
      console.log("🚀 ~ file: UserRepository.js:19 ~ UserRepository ~ login ~ result:", result)

      return result;
    } catch (error) {
      return error;
    }
  }

}
