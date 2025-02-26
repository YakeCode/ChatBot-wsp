import whatsappService from './whatsappService.js';
import { isGreeting, sendWelcomeMessage} from './sendMessage/wellcomeMessage/sendWelcomeMessage.js'
import { sendWellcomeMenu } from './buttons/sendWellcomeMenu.js'
import { sendMedia } from './sendMessage/sendMedia/sendMedia.js'
import interactiveHandlers from './interactiveHandlers/index.js';


class MessageHandler {

  constructor (){
    this.appointmentState = {}
  }
  initAppointmentState(userId) {
    this.appointmentState[userId] = { step: 'userName' };
  }

  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {
      const incomingMessage = message.text.body.toLowerCase().trim()

      if (this.appointmentState[message.from] && this.appointmentState[message.from].step) {
        await this.handleAppointmentFlow( message.from, message.text.body);
      } else if ( isGreeting(incomingMessage) ){
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

  async handleAppointmentFlow(to, message) {
    const state = this.appointmentState[to];
    let response;

    switch (state.step) {
      case 'userName':
        state.userName = message;
        state.step = 'contactNumber';
        response = 'Indícame por favor un número de contacto';
        break;
      case 'contactNumber':
        state.contactNumber = message;
        state.step = 'reason';
        response = 'Déjame un mensaje por favor sobre el motivo de tu consulta';
        break;
      case 'reason':
        state.reason = message;
        // Limpiamos el estado al finalizar
        delete this.appointmentState[to];
        response = `Gracias por agendar tu cita. Hemos registrado la siguiente información:
        - Tu nombre: ${state.userName}
        - Contacto: ${state.contactNumber}
        - Motivo: ${state.reason}

        Un agente se pondrá en contacto contigo pronto.`;
        break;
    }

    await whatsappService.sendMessage(to, response);
  }
}

export default new MessageHandler();
