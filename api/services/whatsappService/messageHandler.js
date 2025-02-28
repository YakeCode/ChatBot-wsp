import whatsappService from './whatsappService.js';
import { isGreeting, sendWelcomeMessage} from './sendMessage/wellcomeMessage/sendWelcomeMessage.js'
import { sendWellcomeMenu } from './buttons/sendWellcomeMenu.js'
import { sendMedia } from './sendMessage/sendMedia/sendMedia.js'
import interactiveHandlers from './interactiveHandlers/index.js';
//google
import appendToSheet from '../googleServices/googleSheets/googleSheets.js';


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

  completeAppointment(to) {
    const appointment = this.appointmentState[to];
    delete this.appointmentState[to];
    const now = new Date();

    // Formatear fecha (DD/MM/YYYY)
    const formattedDate = [
        String(now.getDate()).padStart(2, '0'),         // Día
        String(now.getMonth() + 1).padStart(2, '0'),    // Mes (+1 porque los meses van de 0-11)
        now.getFullYear()                               // Año
    ].join('/');

    // Formatear hora (HH:MM en 24 horas)
    const formattedTime = [
        String(now.getHours()).padStart(2, '0'),       // Horas
        String(now.getMinutes()).padStart(2, '0')       // Minutos
    ].join(':');

    const userData = [
      to,
      appointment.userName,
      appointment.contactNumber,
      appointment.reason,
      formattedDate,
      formattedTime,

    ];

    console.log(userData);
    appendToSheet(userData);

    return `Gracias por agendar tu cita. Hemos registrado la siguiente información:
          - Tu nombre: ${appointment.userName}
          - Contacto: ${appointment.contactNumber}
          - Motivo: ${appointment.reason}
          Un agente se pondrá en contacto contigo pronto.`;
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
        response = this.completeAppointment(to)
        break;
    }

    await whatsappService.sendMessage(to, response);
  }
}

export default new MessageHandler();
