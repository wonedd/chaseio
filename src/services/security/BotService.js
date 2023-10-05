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

          await this.messageRepository.updateSentMessageCount(receivedMessage.id, 'envio');

          await this.messageRepository.updateReceivedMessageCount(receivedMessage.id, 'resposta');

          const result = await this.messageRepository.createMessage({
            message_id: receivedMessage.id,
            msg_corpo: receivedMessage.body,
            user_id: currentUser.id,
          });
          console.log(result);

          response.push({
            phoneNumber,
            sentMessage: message,
            receivedMessage: receivedMessage.body,
          });
        });

        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      await client.close();

      return response;
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
