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
    try {
      const result = await prisma.messages.create({
        data: message
      })

      return result;
    } catch (error) {
      return error;
    }
  }


  async updateSentMessageCount(messageId, action) {
    try {
      const sentMessage = await this.prisma.messages.findUnique({
        where: { id: messageId },
        select: { msg_enviadas: true },
      });

      if (!sentMessage) {
        throw new Error(`Mensagem enviada com ID ${messageId} não encontrada.`);
      }

      const updatedCount = action === 'envio' ? sentMessage.msg_enviadas.qtde_envios + 1 : sentMessage.msg_enviadas.qtde_envios;

      await this.prisma.messages.update({
        where: { id: messageId },
        data: {
          msg_enviadas: {
            update: {
              qtde_envios: updatedCount,
            },
          },
        },
      });

      return updatedCount;
    } catch (error) {
      throw error;
    }
  }

  async updateReceivedMessageCount(messageId, action) {
    try {
      const receivedMessage = await this.prisma.messages.findUnique({
        where: { id: messageId },
        select: { msg_recebidas: true },
      });

      if (!receivedMessage) {
        throw new Error(`Mensagem recebida com ID ${messageId} não encontrada.`);
      }

      const updatedCount = action === 'resposta' ? receivedMessage.msg_recebidas.qtde_respostas + 1 : receivedMessage.msg_recebidas.qtde_respostas;

      await this.prisma.messages.update({
        where: { id: messageId },
        data: {
          msg_recebidas: {
            update: {
              qtde_respostas: updatedCount,
            },
          },
        },
      });

      return updatedCount;
    } catch (error) {
      throw error;
    }
  }

}
