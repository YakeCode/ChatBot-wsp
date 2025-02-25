import whatsappService from './whatsappService.js';
import { sendWellcomeMenu } from './buttons/sendWellcomeMenu.js'
import interactiveHandlers from './interactiveHandlers/index.js';


class MessageHandler {
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {
      const incomingMessage = message.text.body.toLowerCase().trim()

      if ( this.isGreeting(incomingMessage) ){
        await this.sendWelcomeMessage( message.from, message.id, senderInfo )
        await sendWellcomeMenu(message.from)
      }else{
        const response = `Echo: ${message.text.body}`;
      await whatsappService.sendMessage(message.from, response, message.id);
      }
      await whatsappService.markAsRead(message.id);
    } else if ( message?.type === 'interactive') {
      const option = message?.interactive?.button_reply?.id;
      await this.handleInteractiveMessage(message.from, option);
      await whatsappService.markAsRead(message.id)
    }
  }

  isGreeting(message){
    const greetings = ['hola', 'buenas', 'hello', 'hi', 'buenos días', 'buenas tardes', 'buenas noches']
    return greetings.includes(message);
  }
  getSenderName(senderInfo) {
    const name = senderInfo.profile?.name;
    if (name) {
      const validNameRegex = /^[\p{L}\s'-]+$/u;
      if (validNameRegex.test(name)) {
        return name.split(/\s+/)[0];
      }
      return "";
    }
    return senderInfo.wa_id || "";
  }
  async sendWelcomeMessage (to, messageId, senderInfo ){
    const name = this.getSenderName(senderInfo)
    const wellcomemessage =`Bienvenido${name ? ` ${name}` : ''}, te estas comunicando con mis servicios online de desarrollo.`;
    await whatsappService.sendMessage(to, wellcomemessage, messageId)
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
