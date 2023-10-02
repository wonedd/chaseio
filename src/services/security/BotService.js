import venom from 'venom-bot';
import { ErrorHandler } from '../../error/ErrorHandler.js';
import { EventEmitter } from 'events'

export class BotService {
  constructor(chaseioRepository) {
    this.chaseioRepository = chaseioRepository;
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

        // const receivedMessage = await new Promise((resolve, reject) => {
        client.onMessage(async (message) => {
          console.log(message)
          //     if (message) {
          //       try {
          //         const response = {
          //           mensagem_id: message.id,
          //           corpo: message.body,
          //           alvo: message.notifyName,
          //           celular: message.from,
          //         };

          const result = await this.chaseioRepository.createMessage(message.body);
          console.log(result)
        });
        //         resolve(response);
        //       } catch (error) {
        //         reject(error);
        //       }
        //     } else {
        //       reject(ErrorHandler.internalServerError());
        //     }
        //   });
        // });

        // const result = await this.chaseioRepository.setWasContacted(company.celular);

        // responses.push({
        //   phoneNumber,
        //   sentMessage: message,
        //   receivedMessage,
        //   wasContacted: result,
        // });
        response.push({
          companies
        })

      }

      // await client.close();

      return response;
    } catch (error) {
      throw ErrorHandler.internalServerError(error.message);
    }
  };
  listMessages = async () => {
    try {
      const messages = await this.chaseioRepository.findAllMessages();
      return messages;
    } catch (error) {
      throw ErrorHandler.internalServerError(error.message);
    }
  };

}
