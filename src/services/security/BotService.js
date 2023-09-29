import venom from 'venom-bot';
import { ErrorHandler } from '../../error/ErrorHandler.js';

export class BotService {
  constructor(chaseioRepository) {
    this.chaseioRepository = chaseioRepository;
  }
  sendMessage = async (companies) => {
    try {
      const client = await venom.create({ session: 'session-name' });

      client.onStateChange((state) => {
        console.log('onStateChange', state);
      });

      const responses = [];

      for (const company of companies) {
        const phoneNumber = '55' + company.celular + '@c.us';
        const message = `Olá ${company.nome_fantasia}`;

        await client.sendText(phoneNumber, message);
        console.log('Mensagem enviada para:', phoneNumber);

        const result = await this.chaseioRepository.setWasContacted(company.celular);

        const response = {
          content: await this._getMessage(client),
          result,
        };

        responses.push(response);
      }

      await client.close();

      return responses;
    } catch (error) {
      throw ErrorHandler.internalServerError(error.message);
    }
  }


  _getMessage = (client) => {
    return new Promise((resolve, reject) => {
      client.onMessage((message) => {
        if (message) {
          const response = {
            id: message?.id.slice('@')[1],
            body: message?.body,
            target: message?.notifyName,
            num: message?.from.slice('@')[0],
          };
          resolve(response);
        } else {
          reject(ErrorHandler.internalServerError('Erro ao obter mensagem.'));
        }
      });
    });
  }


}
