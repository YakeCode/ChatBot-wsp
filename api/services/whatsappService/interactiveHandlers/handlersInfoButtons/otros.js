import whatsappService from '../../whatsappService.js';

export default async function otrosHandler(to) {
  await whatsappService.sendMessage(to, 'Veo que necesitas ayuda personalizada. ¿Podrías indicarme brevemente cuál es tu consulta?');
}
