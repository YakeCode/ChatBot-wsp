import whatsappService from '../../whatsappService.js';

export default async function soporteHandler(to) {
  await whatsappService.sendMessage(to, 'Describe brevemente cuál es tu problema');
}
