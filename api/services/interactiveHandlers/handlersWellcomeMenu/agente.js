import whatsappService from '../../whatsappService.js';

export default async function agenteHandler(to) {
  await whatsappService.sendMessage(to, 'Veo que necesitas ayuda personalizada. ¿Podrías indicarme brevemente cuál es tu consulta?');
}
