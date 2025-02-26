import whatsappService from './whatsappService.js';
import { isGreeting, sendWelcomeMessage} from './sendMessage/wellcomeMessage/sendWelcomeMessage.js'
import { sendWellcomeMenu } from './buttons/sendWellcomeMenu.js'
import { sendMedia } from './sendMessage/sendMedia/sendMedia.js'
import interactiveHandlers from './interactiveHandlers/index.js';


class MessageHandler {
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {
      const incomingMessage = message.text.body.toLowerCase().trim()

      if ( isGreeting(incomingMessage) ){
        await sendWelcomeMessage( message.from, message.id, senderInfo )
        await sendWellcomeMenu(message.from)
      } else if ( incomingMessage === 'media' ) {
        await sendMedia(message.from)
      } else {
        const response = `Echo: ${message.text.body}`;
      await whatsappService.sendMessage(message.from, response, message.id);
      }
      await whatsappService.markAsRead(message.id);
      //uso de botones
    } else if ( message?.type === 'interactive') {
      const option = message?.interactive?.button_reply?.id;
      await this.handleInteractiveMessage(message.from, option);
      await whatsappService.markAsRead(message.id)
    }
  }


  async handleInteractiveMessage(to, option) {
    const handler = interactiveHandlers[option];
    if (handler) {
      await handler(to);
    } else {
      await whatsappService.sendMessage(
        to,
        'Lo siento, no entendí tu selección. Por favor elige una de las opciones del menú.'
      );
    }
  }

}

export default new MessageHandler();
