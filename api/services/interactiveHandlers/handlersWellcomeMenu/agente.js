import messageHandler from '../../messageHandler.js';
import whatsappService from '../../whatsappService.js';

export default async function agenteHandler(to) {
  messageHandler.initAppointmentState(to);
  await whatsappService.sendMessage(to, 'Veo que necesitas ayuda personalizada. Por favor ingresa tu Nombre:');
}
