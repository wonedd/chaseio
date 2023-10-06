import venom from 'venom-bot';
import { ErrorHandler } from '../../error/ErrorHandler.js';
import currentUser from '../../security/CurrentUser.js';

export class BotService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  sendMessage = async (companies) => {
    try {
      const client = await venom.create({ session: 'session-name' });
      const response = [];

      for (const company of companies) {
        const phoneNumber = '55' + company.celular + '@c.us';
        const message = `Olá ${company.razao_social}`;

        await client.sendText(phoneNumber, message);
        console.log('Mensagem enviada para:', phoneNumber);

        client.onMessage(async (receivedMessage) => {

          const message = {
            target_contact: company.celular,
            body: receivedMessage.body,
            user_id: "1232"
          };

          const result = await this.messageRepository.createMessage(message);

          console.log("🚀 ~ file: BotService.js:31 ~ BotService ~ client.onMessage ~ result:", result);


          response.push({
            result
          });
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      return result;


    } catch (error) {
      throw ErrorHandler.internalServerError(error.message);
    }
  };

  listMessages = async () => {
    try {
      const messages = await this.messageRepository.findAllMessages();
      return messages;
    } catch (error) {
      throw ErrorHandler.internalServerError(error.message);
    }
  };
}
