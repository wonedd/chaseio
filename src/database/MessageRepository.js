import { MainRepository } from './MainRepository.js';

export class MessagesRepository extends MainRepository {
  constructor() {
    super();
  }


  async findAllMessages() {
    try {
      return await this.findAll('messages');
    } catch (error) {
      throw error;
    }
  }

  async createMessage(message) {
    console.log("🚀 ~ file: MessageRepository.js:18 ~ MessagesRepository ~ createMessage ~ message:", message)
    try {
      const prisma = await this.getPrisma();

      const result = await prisma.messages.create({
        target_contact: message.target_contact,
        message: message.body,
        user_id: message.user_id
      });

      return result;
    } catch (error) {
      return error;
    }
  }




}
