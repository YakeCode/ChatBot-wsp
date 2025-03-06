import messageHandler from '../../messageHandler.js';
import whatsappService from '../../whatsappService.js';

export default async function reservaHandler(to) {
  messageHandler.initAppointmentState(to);
  await whatsappService.sendMessage(to, 'Indicame tu nombre por favor');
}
