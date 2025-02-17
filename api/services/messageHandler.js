import whatsappService from './whatsappService.js';

class MessageHandler {
  async handleIncomingMessage(message) {
    if (message?.type === 'text') {
      const incomingMessage = message.text.body.toLowerCase().trim()

      if ( this.isGreeting(incomingMessage) ){
        await this.sendWelcomeMessage( message.from, message.id )
      }else{
        const response = `Echo: ${message.text.body}`;
      await whatsappService.sendMessage(message.from, response, message.id);
      }
      await whatsappService.markAsRead(message.id);
    }
  }

  isGreeting(message){
    const greetings = ['hola', 'buenas', 'hello', 'hi', 'buenos dias', 'buenas tardes', 'buenas noches']
    return greetings.includes(message);
  }

  async sendWelcomeMessage (to, messageId,){
    const wellcomeMesage = `Hola, Bienvenido, te estas comunicando con mis servicios online de desarrollo.

    ¿En que puedo ayudarte hoy?`

    await whatsappService.sendMessage(to, wellcomeMesage, messageId)
  }


}

export default new MessageHandler();
