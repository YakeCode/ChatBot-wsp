import whatsappService from '../../whatsappService.js';

export default async function mensajeHandler(to) {
  await whatsappService.sendMessage(to, 'Déjame tu mensaje, pronto me estaré comunicando contigo');
}
