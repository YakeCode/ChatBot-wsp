import whatsappService from '../../whatsappService.js';

export default async function horariosHandler (to) {
  await whatsappService.sendMessage(to, 'Actualmente no tengo un horario fijo, por ende te estaré contactando lo mas pronto posible');
}
