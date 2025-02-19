import whatsappService from './whatsappService.js';

class MessageHandler {
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {
      const incomingMessage = message.text.body.toLowerCase().trim()

      if ( this.isGreeting(incomingMessage) ){
        await this.sendWelcomeMessage( message.from, message.id, senderInfo )
        await this.sendWelcomeMenu (message.from)
      }else{
        const response = `Echo: ${message.text.body}`;
      await whatsappService.sendMessage(message.from, response, message.id);
      }
      await whatsappService.markAsRead(message.id);
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

  async sendWelcomeMenu (to) {
    const menuMessage = '¿En que puedo ayudarte hoy?'
    const buttons = [
      {
        type: 'reply', reply:{id: 'option_1', title: 'Conoce sobre mi'}
      },
      {
        type: 'reply', reply:{id: 'option_2', title: 'Conoce mis servicios'}
      },
      {
        type: 'reply', reply:{id: 'option_3', title: 'Agendar Una Cita'}
      },
    ];

    await whatsappService.sendInteractiveButtons(to, menuMessage, buttons)
  }

}

export default new MessageHandler();
